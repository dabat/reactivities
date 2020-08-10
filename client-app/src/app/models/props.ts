import { IActivity } from "./activity";

export interface IProps {
  activities?: IActivity[];
  selectActivity?: (id: string) => void;
  selectedActivity?: IActivity | null;
}
