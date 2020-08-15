import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";

const ActivityDashboard: React.FC = () => {
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
