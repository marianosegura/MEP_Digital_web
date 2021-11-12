import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function NavBar() {
  const userType = useSelector(state => state.userInfo.type)
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MEPdigital
          </Typography>
          {userType === "admin" &&
            <div>
              <Button color="inherit" onClick={()=>{navigate("/teachers")}}>Teachers</Button>
              <Button color="inherit" onClick={()=>{navigate("/students")}}>Students</Button>
              <Button color="inherit" onClick={()=>{navigate("/courses")}}>Courses</Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}