import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface iDetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<iDetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, activitySelect, activitiesLoading } = activityStore;

  useEffect(() => {
    activitySelect(match.params.id);
  }, [activitySelect, match.params.id]);

  if (activitiesLoading)
    return <LoadingComponent content="Hang on, fetching activity..." />;

  return (
    <Card centered={true} raised={true}>
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
            as={Link}
            to={`/manage/${activity?.id}`}
          />
          <Button
            basic
            color="grey"
            content="Close"
            onClick={() => history.push("/activities")}
            // as={Link} to="/activities" // this also works
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
