import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

import AllMatch from "./AllMatch";


const MyDatatable = () => {
//   const [data, setData] = useState(userRows);
  const [mydata,setMyData]=useState([])
  const [doctorid,setDoctorId]=useState();
  
  return (
    <div className="datatable">
      
      <AllMatch />
    </div>
  );
};

export default MyDatatable;
