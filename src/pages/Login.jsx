import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Avatar, TextField, Button,  Alert  } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { MdLogin as LoginIcon } from 'react-icons/md';
import {DialogSincronizeAsk} from "../components";
import { useAuthStore, useSincronizeAsk } from "../hooks";
import Logo from '../assets/logo-app.jpg'

const nameApp = import.meta.env.VITE_APP_NAME;

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/registros";
    const { isLoggedIn, isLoginLoading, errorLogin, logIn } = useAuthStore();
    const { isOpenDialog, isLoadingSincroAsk, registrosTotales, registrosActuales, sincronizeAsk } = useSincronizeAsk();

    useEffect(() => {
      if (isLoggedIn) {
         navigate(from,  {replace: true});
      }
    }, [isLoggedIn])

    const handleSubmit = (e) => {
      e.preventDefault();
      logIn({
        username, 
        password
      });
    };

    const sincronizar = (e) => {
      e.preventDefault();
      sincronizeAsk();
    };

    return (  
       <Container maxWidth="xs">
          <Button variant="text" size = "small" color="secondary" sx={{position: "absolute", top: '12px', right:'12px', fontWeight: "bold"}} onClick={sincronizar}>SINCRONIZAR</Button>
          <Box
            sx={{
              marginTop: 3,
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          > 
            <Typography component="h1" variant="h5">
              <strong> { nameApp }</strong>
            </Typography>
            
            <img style={{ marginTop: '32px', width: '100%'}} src={Logo} alt="Logo" />

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                value = {username}
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                size="small"
                onChange = {(e)=>{
                  setUsername(e.currentTarget.value);
                }}
              />
              <TextField
                margin="normal"
                value = {password}
                required
                fullWidth
                name="password"
                label="Clave"
                type="password"
                id="password"
                autoComplete="current-password"
                size="small"
                onChange = {(e)=>{
                  setPassword(e.currentTarget.value);
                }}
              />
              {
                (errorLogin !== "")
                  ? <Alert variant="filled" severity="error">{errorLogin}</Alert>
                  : <LoadingButton
                    loading = {isLoginLoading}
                    text = "INICIANDO..."
                    fullWidth
                    type="submit"
                    loadingPosition="start"
                    startIcon={<LoginIcon />}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    INGRESAR
                  </LoadingButton>
              }
            </Box>
          </Box>
          <DialogSincronizeAsk isOpen={isOpenDialog} isLoadingServer={isLoadingSincroAsk} progress={ registrosActuales / registrosTotales * 100 }/>
       </Container> 
    );
}