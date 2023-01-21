import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from "axios";
import styles from "../Singup/styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



export default function NewMatch() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState({
		firstteam: "",
		secondteam:"",
		assignuser:""
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const toInputUppercase = e => {
		e.target.value = ("" + e.target.value).toUpperCase();
	  };

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(data.name==""){
			toast.error("All Fields are required")
		}
		else{
			try {
				const url = "http://localhost:8080/api/users/match";
				const { data: res } = await axios.post(url, data);
				// navigate("/");
				
		  handleClose();
				console.log(res.message);
		  toast.success('Successfully Added User!');
		  setTimeout(
			() => window.location.reload(), 
			1000
		  );
		  
			} catch (error) {
				console.log(error.response.data.message);
				if(error.response.status == 400){
					toast.error("Use Strong Password Only.( Password Should contain one upper case, one lower case,one number and one special character) ")
				}
				if(error.response.status == 409){
					toast.error("Name Already Exists")
				}
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}
		}
		
	};

  return (
    <div>
      {/* <Button onClick={handleOpen}>Add User</Button> */}
	  {/* <Button className="link" startIcon={<AddIcon />} variant="outlined" onClick={handleOpen} >Add New</Button> */}
      <div><Toaster/></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{marginBottom:'30px',textAlign:'center'}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Match
            </Typography>
          </div>
          
          
          				<input
							type="text"
							placeholder="First Team"
							name="firstteam"
							onChange={handleChange}
							value={data.firstteam}
							required
							className={styles.input}
						/>

						<input
							type="text"
							placeholder="Second Team"
							name="secondteam"
							onChange={handleChange}
							value={data.secondteam}
							required
							className={styles.input}
						/>

						
						<input
							type="text"
							placeholder="Assign User"
							name="assignuser"
							onChange={handleChange}
							value={data.assignuser}
							required
							className={styles.input}
						/>
						
          <div style={{textAlign:'center',marginTop:'30px'}}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </div>
          
        </Box>
      </Modal>
    </div>
  );
}