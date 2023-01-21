import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import styles from "../Singup/styles.module.css";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = useState(0);
  const [player1,setPlayer1]=useState(true)
  const [player2,setPlayer2]=useState(true)
  const [count,setCount]=useState(0);
  const [seccount,setSecCount]=useState(0);
  const [data, setData] = useState({
    name: "",
    teamname:props.firstteam
  });
  const [secdata, setSecData] = useState({
    name: "",
    teamname:props.secondteam
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlemyChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handlemysecChange = ({ currentTarget: input }) => {
    setSecData({ ...secdata, [input.name]: input.value });
  };


  const addPlayer=async()=>{
    
    // if(player==1){
    //     setPlayer1(false)
    // }
    // if(player==2){
    //     setPlayer2(false)
    // }
    
    try {
        const url = "http://localhost:8080/api/users/player";
        const { data: res } = await axios.post(url, data);
    } catch (error) {
        console.log(error.response.data.message);
    }
    setCount(count+1)
    setData({name:'',teamname:props.firstteam})
  }

  const addSecPlayer=async()=>{
    
    
    try {
        const url = "http://localhost:8080/api/users/player";
        const { data: res } = await axios.post(url, secdata);
    } catch (error) {
        console.log(error.response.data.message);
    }
    setSecCount(seccount+1)
    setSecData({name:'',teamname:props.secondteam})
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Team 1" {...a11yProps(0)} />
          <Tab label="Team 2" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {
            count<11?
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}> 
            <h3>Player {count+1}</h3>
                <div style={{textAlign:'center'}}>
                    <input
                                type="text"
                                placeholder="Enter Player Name"
                                name="name"
                                onChange={handlemyChange}
                                value={data.name}
                                required
                                className={styles.input}
                            />
                    <Button style={{marginTop:'30px'}} variant="contained" onClick={()=>addPlayer()} >Add Player</Button>
                </div>
            
        </div>
        :''
        }
        {
            count==11?
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <h3>Player {count+1}</h3> 
                <div style={{textAlign:'center'}}>
                    <input
                                type="text"
                                placeholder="Enter Substitute Player Name"
                                name="name"
                                onChange={handlemyChange}
                                value={data.name}
                                required
                                className={styles.input}
                            />
                    <Button style={{marginTop:'30px'}} variant="contained" onClick={()=>addPlayer()} >Add Player</Button>
                </div>
            
        </div>
        :
        ""
        }
        {
            count==12 ?<div style={{textAlign:'center'}}>
            <h3>12 Players are added</h3> 
        </div>
        :""
        }

        
        
        
      </TabPanel>
      <TabPanel value={value} index={1}>
      {
            seccount<11?
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}> 
            <h3>Player {seccount+1}</h3>
                <div style={{textAlign:'center'}}>
                    <input
                                type="text"
                                placeholder="Enter Player Name"
                                name="name"
                                onChange={handlemysecChange}
                                value={secdata.name}
                                required
                                className={styles.input}
                            />
                    <Button style={{marginTop:'30px'}} variant="contained" onClick={()=>addSecPlayer()} >Add Player</Button>
                </div>
            
        </div>
        :''
        }
        {
            seccount==11?
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <h3>Player {seccount+1}</h3> 
                <div style={{textAlign:'center'}}>
                    <input
                                type="text"
                                placeholder="Enter Substitute Player Name"
                                name="name"
                                onChange={handlemysecChange}
                                value={secdata.name}
                                required
                                className={styles.input}
                            />
                    <Button style={{marginTop:'30px'}} variant="contained" onClick={()=>addSecPlayer()} >Add Player</Button>
                </div>
            
        </div>
        :
        ""
        }
        {
            seccount==12 ?<div style={{textAlign:'center'}}>
            <h3>12 Players are added</h3> 
        </div>
        :""
        }
      </TabPanel>
    </Box>
  );
}