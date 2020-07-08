import axios from "axios";

const apiURL = process.env.API_URL || "http://localhost:3000/mc/v1/users";

export function GetUsers() {
  return axios.get(apiURL);
}

export function GetUserSocketID(username) {
  return axios.get(`${apiURL}/${username}`);
}

export async function CheckUser(username) {
  const checked = await axios.get(`${apiURL}/${username}`);
  if (
    checked.data === "" ||
    checked.data === null ||
    JSON.stringify(checked.data) === JSON.stringify({})
  ) {
    // if empty create the username
    const created = await CreateUser({ username });
    return created;
  } else {
    // if found update status to online
    const isOnline = { ...checked.data, isOnline: true };
    await UpdateUser(isOnline);
    return isOnline;
  }
}

export async function LogoutUser(_id) {
  return await UpdateUser({ _id, isOnline: false });
}

export function CreateUser(user) {
  return axios.post(apiURL, user);
}

export function UpdateUser(user) {
  return axios.put(apiURL, user);
}

export function RemoveUser(_id) {
  return axios.delete(`${apiURL}/${_id}`);
}
