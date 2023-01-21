import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
// import { myuserColumns, myuserRows } from "../../mydatatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
// import AllDoctors from "../../pages/doctor/AllDoctors";
import AllUser from "./AllUser";


const MyDatatable = () => {
//   const [data, setData] = useState(userRows);
  const [mydata,setMyData]=useState([])
  const [doctorid,setDoctorId]=useState();
  
  return (
    <div className="datatable">
      
      <AllUser />
    </div>
  );
};

export default MyDatatable;
