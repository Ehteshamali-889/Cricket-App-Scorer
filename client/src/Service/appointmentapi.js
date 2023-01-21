import axios from "axios";

const allpatientsUrl = "http://localhost:3010/appointment/allappointment";
const allteam="http://localhost:8080/api/users/allteam";
const removeteam="http://localhost:8080/api/users/removeteam";
// const singleteamUrl = "http://localhost:3010/doctor/allteam/:id?";
const singlepatientUrl = "http://localhost:3010/appointment/allappointment/:id?";
const patientsremove = "http://localhost:3010/appointment/removeappointment";
const usersedit = "http://localhost:3010/doctor/editdoctor";

export const getAppointments = async (id) => {
  id = id || "";
  // debugger;
  try {
    return await axios.get(`${allteam}/${id}`);
  } catch (error) {
    console.log("Error while calling getUsers api ", error);
  }
};

export const addAppointments = async (user) => {
  return await axios.post("http://localhost:3010/appointment/addAppointment", user);
};

export const deleteAppointments = async (id) => {
  return await axios.delete(`${removeteam}/${id}`);
};

export const editAppointments = async (id, user) => {
  return await axios.put(`${singlepatientUrl}/${id}`, user);
};
