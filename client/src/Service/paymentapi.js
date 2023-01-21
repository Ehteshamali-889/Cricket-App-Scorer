import axios from "axios";

const allpatientsUrl = "http://localhost:3010/payment/allpayment";
const singlepatientUrl = "http://localhost:3010/payment/allpayment/:id?";
const patientsremove = "http://localhost:3010/payment/removepayment";

export const getPayments = async (id) => {
  id = id || "";
  // debugger;
  try {
    return await axios.get(`${allpatientsUrl}/${id}`);
  } catch (error) {
    console.log("Error while calling getUsers api ", error);
  }
};

export const addPayments = async (user) => {
  return await axios.post("http://localhost:3010/payment/addPayment", user);
};

export const deletePayments = async (id) => {
  return await axios.delete(`${patientsremove}/${id}`);
};

export const editPayments = async (id, user) => {
  return await axios.put(`${singlepatientUrl}/${id}`, user);
};
