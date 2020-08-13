import React, {
  useState,
  useEffect,
  Fragment,
  SyntheticEvent,
  useContext,
} from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleActivitySelect = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleCreateFormOpen = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleActivityCreate = (activity: IActivity) => {
    setSubmitting(true);
    agent.activities
      .create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleActivityEdit = (activity: IActivity) => {
    setSubmitting(true);
    agent.activities
      .update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleActivityDelete = (
    event: SyntheticEvent<HTMLButtonElement>,
    activity: IActivity
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.activities
      .delete(activity.id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== activity.id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return (
      <LoadingComponent inverted={true} content="Fetching activities ..." />
    );
  return (
    <Fragment>
      <NavBar openCreateForm={handleCreateFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          selectActivity={handleActivitySelect}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          activityCreate={handleActivityCreate}
          activityEdit={handleActivityEdit}
          activityDelete={handleActivityDelete}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);
