import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    editFormOpen,
    detailsFormClose,
  } = activityStore;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity?.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity?.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity?.date}</span>
          {activity?.city && !activity?.venue ? (
            <div>{activity?.city}</div>
          ) : null}
          {!activity?.city && activity?.venue ? (
            <div>@ {activity?.venue}</div>
          ) : null}
          {activity?.city && activity?.venue ? (
            <div>
              {activity?.city} @ {activity?.venue}
            </div>
          ) : null}
        </Card.Meta>
        <Card.Description>{activity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => editFormOpen(activity)}
          />
          <Button
            basic
            color="grey"
            content="Close"
            onClick={() => detailsFormClose()}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
