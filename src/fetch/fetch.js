import axios from "axios";

const BASE_URL = "https://66657e20d122c2868e40d528.mockapi.io/";
const END_POINTS = "contacts/";
const url = `${BASE_URL}${END_POINTS}`;

async function getTasks() {
  const response = await axios.get(url);
  return response.data;
}

async function addTask(data) {
  const response = await axios.post(url, data);
  return response.data;
}

async function deleteTask(id) {
  const deleteUrl = `${url}/${id}`;
  const response = await axios.delete(deleteUrl);
  return response.data.id;
}

export { getTasks, addTask, deleteTask };
