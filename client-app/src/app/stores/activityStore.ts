import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activitiesLoading = false;
  @observable activity: IActivity | null = null;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action activitiesLoad = async () => {
    try {
      this.activitiesLoading = true;
      const activities = await agent.Activities.list();
      runInAction("activitiesLoad-try", () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
      });
    } catch (error) {
      console.log(error); //TODO log errors somewhere
    } finally {
      runInAction("activitiesLoad-finally", () => {
        this.activitiesLoading = false;
      });
    }
  };

  @action activityCreate = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activities.create(activity);
      runInAction("activityCreate-try", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activitySelect(activity.id);
      });
    } catch (error) {
      console.log(error); //TODO log errors somewhere
    } finally {
      runInAction("activityCreate-finally", () => {
        this.submitting = false;
      });
    }
  };

  @action activitySelect = async (id: string) => {
    this.activity = this.activityRegistry.get(id) || null;
    if (!this.activity) {
      try {
        this.activitiesLoading = true;
        this.activity = await agent.Activities.details(id);
        if (!this.activity) {
          throw new Error(`An activity with id ${id} was not found`);
        }
      } catch (error) {
        // console.log(error);  //for some reason this statement was throwing mobx state change errors
      } finally {
        runInAction(() => {
          this.activitiesLoading = false;
        });
      }
    }
  };

  @action activityClear = async () => {
    await this.activitySelect("");
  };

  @action activityUpdate = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activities.update(activity);
      runInAction("activityUpdate-try", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activitySelect(activity.id);
      });
    } catch (error) {
      console.log(error); //TODO log error somewhere
    } finally {
      runInAction("activityUpdate-finally", () => {
        this.submitting = false;
      });
    }
  };

  @action activityDelete = async (
    id: string,
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    try {
      this.target = event.currentTarget.name;
      this.submitting = true;
      await agent.Activities.delete(id);
      runInAction("activityDelete-try", () => {
        this.activityRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction("activityDelete-finally", () => {
        this.target = "";
        this.submitting = false;
      });
    }
  };
}

export default createContext(new ActivityStore());
