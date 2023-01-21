import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SecondTeamScore from './SecondTeamScore';
import FirstTeamScore from './FirstTeamScore';

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

const AddScore = (props) => {
  const [value, setValue] = React.useState(0);
  // const location = useLocation()
  // const { first,second } = location.state
  // console.log('firstname',first);
  // console.log('firstname',second);
  // const firstteam=localStorage.getItem("firstteam");
  // console.log("firstname",firstteam)
  // const secondteam=localStorage.getItem("secondteam");
  const [users, setUsers] = useState([]);
  const [secusers, setSecUsers] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    const fetchData=()=>{
      fetch('http://localhost:8080/api/users/allplayer/'+props.firstteam)
      .then(response=>response.json())
      .then(json=>{
          console.log(json);
          setUsers(json);
      })
    }
    fetchData()
    const fetchData2=()=>{
      fetch('http://localhost:8080/api/users/allplayer/'+props.secondteam)
      .then(response=>response.json())
      .then(json=>{
          console.log(json);
          setSecUsers(json);
      })
    }
    fetchData2()
  },[])
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Team 1" {...a11yProps(0)} />
          <Tab label="Team 2" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FirstTeamScore users={users} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SecondTeamScore secusers={secusers} />
      </TabPanel>
      
    </Box>
  )
}

export default AddScore