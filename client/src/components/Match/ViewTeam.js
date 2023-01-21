import React from 'react'
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewPlayer from './ViewPlayer'
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';

import Box from '@mui/material/Box';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ViewTeam = (props) => {
    localStorage.setItem("firstteam",props.firstteam)
    localStorage.setItem("secondteam",props.secondteam)
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
        {/* <Link to="/player" style={{color:'green',textDecoration:'none'}} > */}
        <Button startIcon={<VisibilityIcon />} color="success" style={{marginRight:10}} variant="outlined"
        onClick={handleOpen}
        >
            View Player   
        </Button>
        {/* </Link>    */}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        
          <Box sx={style}>
            <ViewPlayer firstteam={props.firstteam} secondteam={props.secondteam} />
          </Box>
        </Modal>
    </div>
  )
}

export default ViewTeam