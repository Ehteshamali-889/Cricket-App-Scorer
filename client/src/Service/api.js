import axios from "axios";

const allusersUrl = "http://localhost:3010/doctor/alldoctor";
const allusers="http://localhost:8080/api/users/alldoctor";
const removeuser="http://localhost:8080/api/users/removedoctor";
const singleuserUrl = "http://localhost:3010/doctor/alldoctor/:id?";
const usersremove = "http://localhost:3010/doctor/removedoctor";
const usersedit = "http://localhost:3010/doctor/editdoctor";

export const getUsers = async (id) => {
  id = id || "";
  // debugger;
  try {
    return await axios.get(`${allusers}/${id}`);
  } catch (error) {
    console.log("Error while calling getUsers api ", error);
  }
};

export const addUser = async (user) => {
  return await axios.post("http://localhost:3010/doctor/addDoctor", user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${removeuser}/${id}`);
};

export const editUser = async (id, user) => {
  return await axios.put(`${singleuserUrl}/${id}`, user);
};
