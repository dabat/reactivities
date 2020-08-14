import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable editMode = false;
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | null = null;
  @observable submitting = false;

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action activitiesLoad = async () => {
    try {
      this.loadingInitial = true;
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        this.activityRegistry.set(activity.id, activity);
      });
    } catch (error) {
      console.log(error); //TODO log errors somewhere
    } finally {
      this.loadingInitial = false;
    }
  };

  @action activityCreate = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.activitySelect(activity.id);
      this.editMode = false;
    } catch (error) {
      console.log(error); //TODO log errors somewhere
    } finally {
      this.submitting = false;
    }
  };

  @action activitySelect = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id) || null;
    this.editMode = false;
  };

  @action activityUpdate = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.activitySelect(activity.id);
    } catch (error) {
      console.log(error); //TODO log error somewhere
    } finally {
      this.submitting = false;
    }
  };

  @action createFormOpen = () => {
    this.activitySelect("");
    this.editMode = true;
  };

  @action editFormOpen = (activity: IActivity | null) => {
    this.activitySelect(activity?.id || "");
    this.editMode = true;
  };

  @action editFormClose = () => {
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
