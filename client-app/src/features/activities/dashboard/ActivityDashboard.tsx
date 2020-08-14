import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";

interface iProps {
  activityDelete: (
    event: SyntheticEvent<HTMLButtonElement>,
    activity: IActivity
  ) => void;
  target: string;
}

const ActivityDashboard: React.FC<iProps> = ({ activityDelete, target }) => {
  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activityDelete={activityDelete} target={target} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
