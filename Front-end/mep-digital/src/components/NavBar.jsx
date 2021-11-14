import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logOutAction } from '../redux/userReducer';

export default function NavBar() {
  const userType = useSelector(state => state.userInfo.type)
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate("/")
    dispatch(logOutAction())
    handleMenuClose()
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{navigate("/password")}}>Cambiar contraseña</MenuItem>
      <MenuItem onClick={handleLogout}>Salir</MenuItem>
    </Menu>
  );
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MEPdigital
          </Typography>
          {userType === "admin" &&
            <div>
              <Button color="inherit" onClick={()=>{navigate("/teachers")}}>Profesores</Button>
              <Button color="inherit" onClick={()=>{navigate("/students")}}>Estudiantes</Button>
              <Button color="inherit" onClick={()=>{navigate("/courses")}}>Cursos</Button>
            </div>
          }
          {userType === "teacher" &&
          <div>
          <Button color="inherit" onClick={()=>{navigate("/teacher")}}>Cursos</Button>
          <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          }
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}