import React, { SyntheticEvent } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  activityDelete: (
    event: SyntheticEvent<HTMLButtonElement>,
    activity: IActivity
  ) => void;
  submitting: boolean;
  target: string;
}

const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  activityDelete,
  submitting,
  target,
}) => {
  if (!activities.length) {
    return <p>Oh no! ...there are no activities to show. Please create one!</p>;
  } else {
    return (
      <Segment clearing>
        <Item.Group divided>
          {activities?.map((activity) => (
            <Item key={activity.id}>
              <Item.Image
                size="tiny"
                src="https://react.semantic-ui.com/images/wireframe/image.png"
              />
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated="right"
                    content="View"
                    color="blue"
                    onClick={() => selectActivity(activity.id)}
                  />
                  <Button
                    name={activity.id}
                    floated="right"
                    content="Delete"
                    color="red"
                    onClick={(event) => activityDelete(event, activity)}
                    loading={target === activity.id && submitting}
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    );
  }
};

export default ActivityList;
