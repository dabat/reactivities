import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityStore from "../../../app/stores/activityStore";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.activitiesLoad();
  }, [activityStore]);

  if (activityStore.activitiesLoading) {
    return <LoadingComponent inverted={true} content="Just a sec ..." />;
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <h2>Activities</h2>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={3}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
