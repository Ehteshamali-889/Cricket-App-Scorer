import React,{useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function FirstTeamScore(props) {
    const [hide,setHide]=useState('true');
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bold'}}>Player Name</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Score</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Balls</TableCell>
            <TableCell style={{fontWeight:'bold',textAlign:'center'}} colSpan={6}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                0
              </TableCell>
              <TableCell component="th" scope="row">
                0
              </TableCell>

              <TableCell component="th" scope="row">
                {
                    hide=="true" ? 
                    <>
                    <div style={{display:'flex',flexDirection:'row'}}>
                <Button>Dot</Button>
                <Button color="success">1</Button>
                <Button color="success">2</Button>
                </div>

                <div style={{display:'flex',flexDirection:'row'}}>
                <Button color="success">3</Button>
                <Button color="success">4</Button>
                <Button color="success">6</Button>
                </div>

                <div style={{display:'flex',flexDirection:'row'}}>
                <Button color="warning" onClick={()=>setHide('false')}>Out</Button>
                </div>
                    </>
                     :
                     <>
                        <h3>Player is Out</h3>
                     </>
                }
                

                
                
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}