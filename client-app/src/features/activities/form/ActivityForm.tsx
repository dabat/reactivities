import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

interface iProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  activityCreate: (activity: IActivity) => void;
  activityEdit: (activity: IActivity) => void;
  submitting: boolean;
}

const ActivityForm: React.FC<iProps> = ({
  setEditMode,
  activity: initialActivity,
  activityCreate,
  activityEdit,
  submitting,
}) => {
  const initializeForm = () => {
    if (initialActivity) {
      return initialActivity;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        date: "",
        category: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleFormSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      activityCreate(newActivity);
    } else {
      activityEdit(activity);
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
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
