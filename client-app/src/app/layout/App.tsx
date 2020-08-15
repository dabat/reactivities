import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import Home from "../../features/home/Home";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.activitiesLoad();
  }, [activityStore]);

  if (activityStore.activitiesLoading)
    return (
      <LoadingComponent inverted={true} content="Fetching activities ..." />
    );
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={Home} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route path="/activities/:id" component={ActivityDetails} />
        <Route path="/createActivity" component={ActivityForm} />
      </Container>
    </Fragment>
  );
};

export default observer(App);
