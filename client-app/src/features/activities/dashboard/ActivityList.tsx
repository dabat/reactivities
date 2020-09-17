import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import ActivityListItem from "./ActivityListItem";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;
  if (!activitiesByDate.length) {
    return (
      <p>
        Oh no! ...there are no activities to show.{" "}
        <span role="img" aria-label="crying emoji">
          😢
        </span>
      </p>
    );
  } else {
    return (
      <Fragment>
        {activitiesByDate.map(([dateKey, activities]) => (
          <Fragment key={dateKey}>
            <Label size="large" color="blue">
              {dateKey}
            </Label>
            <Item.Group divided>
              {activities?.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Fragment>
        ))}
      </Fragment>
    );
  }
};

export default observer(ActivityList);
