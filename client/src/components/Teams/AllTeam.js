import './allusers.scss'
import { useState, useEffect } from 'react';

import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import { getAppointments, deleteAppointments } from '../../Service/appointmentapi';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import UserList from './UserList';
import TeamList from './TeamList';
import Pagination from './Pagination';
import AddIcon from '@mui/icons-material/Add';
// import NewUser from './NewUser';
import NewTeam from './NewTeam';



const AllTeam = () => {
    const [users, setUsers] = useState([]);
    const [searchApi, setSearchApi] = useState([]);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    useEffect(()=>{
        const fetchData=()=>{
            fetch('http://localhost:8080/api/users/allteam')
            .then(response=>response.json())
            .then(json=>{
                console.log(json);
                setUsers(json);
                setSearchApi(json);
            })
        }
        fetchData()
    },[])
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = users.slice(firstPostIndex, lastPostIndex);
    const handleFilter=(e)=>{
        if(e.target.value==''){
            setUsers(searchApi)
        }
        else{
            const filterData=searchApi.filter(item=>item.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setUsers(filterData);
        }
        setQuery(e.target.value)
    }
    
    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUserData = async (id) => {
        await deleteAppointments(id);
        getAllUsers();
    }

    const getAllUsers = async () => {
        let response = await getAppointments();
        console.log(response.data)
        setUsers(response.data);
    }

    return (
        <>
            <div className="datatableTitle">
                <NewTeam />
                
                <div className="search">
                    <input type="text" placeholder="Search..."
                    value={query}
                     onInput={(e) => handleFilter(e)} />
                    <SearchOutlinedIcon/>
                </div>
            </div>
            <TeamList users={currentPosts} updateUsers={setUsers} />
            <Pagination
                totalPosts={users.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            
        </>
        
    )
}

export default AllTeam;