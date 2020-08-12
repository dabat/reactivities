import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
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
    agent.activities
      .list()
      .then((response) => {
        const activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <LoadingComponent inverted={true} content="Fetching activities ..." />
    );
  return (
    <Fragment>
      <NavBar openCreateForm={handleCreateFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
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

export default App;
