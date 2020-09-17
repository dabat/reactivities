import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailSidebar from "./ActivityDetailSidebar";

interface iDetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<iDetailParams>> = ({
  match,
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, activitySelect, activitiesLoading } = activityStore;

  useEffect(() => {
    activitySelect(match.params.id);
  }, [activitySelect, match.params.id]);

  if (activitiesLoading)
    return (
      <LoadingComponent
        inverted={true}
        content="Hang on, fetching activity..."
      />
    );

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
