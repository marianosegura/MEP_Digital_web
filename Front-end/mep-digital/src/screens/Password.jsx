import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export default function Password() {
  const [actualPassword, setActualPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const email = useSelector(state => state.userInfo.email)
  const type = useSelector(state => state.userInfo.type)
  const navigate = useNavigate();

  const onSummit = (e) => {
    e.preventDefault();
    var data = {
      email: email,
      role: type,
      currentPassword: actualPassword,
      newPassword: newPassword
    };
    console.log(data)
    var direction = "https://desolate-everglades-59280.herokuapp.com/api/auth/passwords"
    var myInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    var myRequest = new Request(
        direction,
        myInit
    );
    fetch(myRequest)
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then(text => {throw new Error(text)})
    })
    .then((json) => {
      if(type === "admin"){
        navigate("/courses")
      }
      navigate("/"+type)
      alert(json.message)
      

    })
    .catch((error) => {
      alert(JSON.parse(error.message).message)
    })
  }

  return (
    <form onSubmit={onSummit} className="Center">
    <Box
      sx={{ maxWidth: 300}}
    >
      <TextField
        id="outlined-basic"
        inputProps={{ min: 0, style: { textAlign: "center" } }}
        label="Actual contraseña"
        type="password"
        variant="outlined"
        name="actualPassword"
        onChange={e => setActualPassword(e.target.value)}
        fullWidth={true}
      /><br/><br/>
      <TextField
        id="outlined-password-input"
        label="Nueva Contraseña"
        inputProps={{ min: 0, style: { textAlign: "center" } }}
        type="password"
        name="newPassword"
        autoComplete="current-password"
        onChange={e => setNewPassword(e.target.value)}
        fullWidth={true}
        /><br/><br/>
      <Button variant="contained" type="submit" fullWidth={true}>
        Cambiar
      </Button>
    </Box>
  </form>
  )
}
