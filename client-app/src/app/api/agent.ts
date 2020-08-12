import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => {
      resolve(response);
    }, randomMilliseconds())
  );

const randomMilliseconds = () => {
  return getRandomIntInclusive(500, 3000);
};

// thank you mozilla
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const requests = {
  get: (url: string) => axios.get(url).then(sleep()).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep()).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep()).then(responseBody),
  delete: (url: string) => axios.delete(url).then(sleep()).then(responseBody),
};

const activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string): Promise<IActivity> =>
    requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
};

export default { activities };
