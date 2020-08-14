import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate: activities,
    activitySelect,
    submitting,
    target,
    activityDelete,
  } = activityStore;
  if (!activities.length) {
    return <p>Oh no! ...there are no activities to show. 😢</p>;
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
                <Item.Meta>
                  {activity.date}
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
                </Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated="right"
                    content="View"
                    color="blue"
                    onClick={() => activitySelect(activity.id)}
                  />
                  <Button
                    name={activity.id}
                    floated="right"
                    content="Delete"
                    color="red"
                    onClick={(event) => activityDelete(activity.id, event)}
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

export default observer(ActivityList);
