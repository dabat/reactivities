import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface iFormParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<iFormParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity: initialActivity,
    activityClear,
    activityCreate,
    activityUpdate,
    activitySelect,
    submitting,
  } = activityStore;

  const emptyActivity = {
    id: "",
    title: "",
    description: "",
    date: new Date().toISOString(),
    category: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState<IActivity>(emptyActivity);

  useEffect(() => {
    // if (match.params.id) {
    //   activitySelect(match.params.id);

    //   initialActivity && setActivity(initialActivity);
    //   console.log(match.params.id);
    //   console.log(initialActivity);
    //   console.log(activity);

    if (match.params.id && activity.id.length === 0) {
      activitySelect(match.params.id)
        .then(() => {
          initialActivity && setActivity(initialActivity);
        })
        .then(() => {
          console.log("ActivityForm.useEffect");
          console.log(match.params.id);
          console.log(initialActivity);
          console.log(activity);
        });

      // if (match.params.id) {
      //   initialActivity && setActivity(initialActivity);
      //   activitySelect(match.params.id).then(() => {
      //     console.log(match.params.id);
      //     console.log(initialActivity);
      //     console.log(activity);
      //   });
    }
    return () => {
      activityClear();
    };
  }, [
    match.params.id,
    activity.id.length,
    activitySelect,
    initialActivity,
    setActivity,
    // activityClear,
  ]); // having initialActivity in the dependency list throws the component into an infinite loop

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
    console.log("activity updated", activity);
  };

  const handleFormSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      activityCreate(newActivity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    } else {
      activityUpdate(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
      // history.push(`/activities/${activity.id}`);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit}>
        <Form.Input
          name="title"
          placeholder="Title"
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          name="description"
          placeholder="Description"
          rows={2}
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          name="date"
          placeholder="Date"
          type="datetime-local"
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          name="category"
          placeholder="Category"
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          name="city"
          placeholder="City"
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          name="venue"
          placeholder="Venue"
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Save"
          loading={submitting}
        />
        <Button
          floated="right"
          type="submit"
          content="Cancel"
          onClick={() => history.push("/activities")}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
