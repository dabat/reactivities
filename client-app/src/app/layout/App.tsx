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
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    event: SyntheticEvent<HTMLButtonElement>,
    activity: IActivity
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(activity.id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== activity.id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    activityStore.activitiesLoad();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return (
      <LoadingComponent inverted={true} content="Fetching activities ..." />
    );
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activityDelete={handleActivityDelete}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);
