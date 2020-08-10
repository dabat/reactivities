import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetails activity={selectedActivity} />
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
