import React from "react";
import { useState, useEffect } from 'react';

import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
// import { getUsers, deleteUser } from '../../Service/api';
import { getPatients, deletePatient } from '../../Service/patientapi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddPlayer from "./AddPlayer";
import ViewTeam from "./ViewTeam";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
    /*the alpha value controls the transparency*/
  background: rgba( 255, 255, 255, 0.3 );

/* This controls the blurring effect*/
backdrop-filter: blur( 7.5px );
  -webkit-backdrop-filter: blur( 7.5px );

/*Adding the shadow*/
box-shadow: 0 8px 32px 0 rgba( 0, 0, 0, 0.18 );

/* Adding our borders*/
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  z-index: 4;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #FFFFFF;
        color: #000000;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;

const MatchList = ({ users,updateUsers }) => {
    const [open, setOpen] = React.useState(false);
    const [show,setShow]=React.useState(false);

    const handleClickShow = () => {
        setShow(true);
      };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    // const [users, setUsers] = useState([]);
    const deleteUserData = async (id) => {
        await deletePatient(id);
        handleClose();
        getAllUsers();
    }

    const getAllUsers = async () => {
        let response = await getPatients();
        console.log(response.data)
        updateUsers(response.data);
    }
    return (
        <StyledTable className="table">
            <TableHead>
                <THead>
                    <TableCell style={{fontWeight:"bold"}}>First Team</TableCell>
                    <TableCell style={{fontWeight:"bold"}}>Second Team</TableCell>
                    <TableCell style={{fontWeight:"bold"}}>Assigned User</TableCell>
                    <TableCell style={{fontWeight:"bold"}}>Actions</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {users.sort().map((user) => (
                    <TRow key={user._id}>
                        <TableCell className="tableCell">{user.firstteam}</TableCell>
                        <TableCell className="tableCell">{user.secondteam}</TableCell>
                        <TableCell className="tableCell">{user.assignuser}</TableCell>
                        <TableCell>

                        {/* <Button startIcon={<AddIcon />} color="error" style={{marginRight:10}} variant="outlined" onClick={handleClickShow}>
                            Add Players
                        </Button> */}

                        <div style={{display:'flex',flexDirection:'row'}}>
                        <AddPlayer firstteam={user.firstteam} secondteam={user.secondteam} />
                        
                        {/* <ViewTeam firstteam={user.firstteam} secondteam={user.secondteam} />   */}
                        <Link to="/viewteam" state={{ first:user.firstteam,second:user.secondteam }} style={{color:'black',textDecoration:'none'}} >
                        <Button startIcon={<VisibilityIcon />} color="success" style={{marginRight:10}} variant="outlined"
                        >
                            View Player   
                        </Button>
                        </Link>
                        <Link to="/score" state={{ first:user.firstteam,second:user.secondteam }} style={{color:'black',textDecoration:'none'}} >
                        <Button startIcon={<ScoreboardIcon />} color="success" style={{marginRight:10}} variant="outlined"
                        >
                            Add Score   
                        </Button>

                        </Link>
                        </div>

                          
                            {/* <Button startIcon={<DeleteIcon />} color="error" style={{marginRight:10}} variant="outlined" onClick={handleClickOpen}>
                            Delete 
                            </Button> */}
                        {/* <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Delete User"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Do you confirm to delete Team record?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => deleteUserData(user._id)}>Confirm</Button>
                            </DialogActions>
                        </Dialog> */}
                            
                        </TableCell>
                    </TRow>
                ))}
            </TableBody>
        </StyledTable> 
        
    );
};

export default MatchList;