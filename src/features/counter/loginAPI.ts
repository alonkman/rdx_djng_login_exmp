import axios from "axios";

const MY_SERVER = `http://127.0.0.1:8000/`;

export function getUsers(username: string, password: string) {
  return axios.post(MY_SERVER + "login/", { username, password });
}

export function checkRefresh(refresh: any) {
  return axios.post(MY_SERVER + "refresh", refresh);
}
