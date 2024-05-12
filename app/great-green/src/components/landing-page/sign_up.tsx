import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';

import React, { useState } from "react";
import Maps from './map';
import { generateOTP, registerUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from "../../../node_modules/react-i18next";
import TwoFAForm from './2FAForm';
 

//copyright element
function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit">
          Great Green
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

function SignUp(){
   //internayionalization
  const {t} = useTranslation('common');
  
  const [latitude, setLatitude] = useState<number|null>(null);
  const [longitude, setLongitude] = useState<number|null>(null);
  //signup page validation statements
  const [gender, setGender] = React.useState('');

  const [show2FA, setShow2FA] = useState<boolean>(false);

  const [token, setToken] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const handleNameChange = (e: { target: { value: React.SetStateAction<string>; validity: { valid: any; }; }; }) => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; validity: { valid: any; }; }; }) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; validity: { valid: any; }; }; }) => {
    setPassword(e.target.value);
    if (e.target.validity.valid) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };
  
  const [repassword, setRePassword] = useState("");
  const [repasswordError, setRePasswordError] = useState(false);
  const handleRePasswordChange = (e: { target: { value: React.SetStateAction<string>; validity: { valid: any; }; }; }) => {
    setRePassword(e.target.value);
    if (e.target.validity.valid) {
      setRePasswordError(false);
    } else {
      setRePasswordError(true);
    }
  };


      //handles signup form
    const navigate = useNavigate();  
    const handle2FASubmit = () => {
      // Call auth endpoitnt
      const callback = () => setShow2FA(true);
      generateOTP(email, callback);
      
    }
    const handleSignupSubmit = async () => {
     
      console.log("Location values before submission:", latitude, longitude)
      const SignupFormInput = {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: password,
        gender: gender,
        locationX: longitude,
        locationY: latitude,
        token,
      };
      // alert(JSON.stringify(SignupFormInput, null, 2)); // Display form data
      const successRedirect = () => { navigate("/login") }; // Define success redirect function
      await registerUser(SignupFormInput, successRedirect,t); // Call registerUser function with form data and success redirect function
    };
  return(
     //sign up box component
    <Box component="section" className='signUp'   >    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card sx={{ minWidth: 80,
        alignItems: 'center',
        boxShadow: 5 ,
       
      }}>
        <div className='su'>
        {!show2FA ? (<Box justifyContent="center"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {t('signup.head')}
          </Typography>
          <Box component="form" justifyContent="center"   sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Name"
                label={t('signup.content.name')}
                variant="standard"
                value={name}
                onChange={handleNameChange}
                error={nameError}
                helperText={
                    nameError ? t('signup.content.name.validation')  : ""
                  }
                inputProps={{
                pattern: "[A-Za-z ]{3,}",
                }}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">{t('signup.content.gender')}</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={gender}
                onChange={handleChange}
                label={t('signup.content.gender')}
                variant="standard"
              >
                <MenuItem value={'MALE'}>{t('signup.content.label1')}</MenuItem>
                <MenuItem value={'FEMALE'}>{t('signup.content.label2')}</MenuItem>
                <MenuItem value={'OTHERS'}>{t('signup.content.label3')}</MenuItem>
              </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={t('signup.content.email')}
                variant="standard"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={
                    emailError ? t('signup.content.email.validation') : ""
                  }
                inputProps={{
                pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+",
                }}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={t('signup.content.password')}
                  type="password"
                  id="password"
                  variant="standard"
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  helperText={
                    passwordError ? t('signup.content.password.validation') :
                    t('signup.content.password.info')
                  }
                inputProps={{
                pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$"
                }}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={t('signup.content.repassword')}
                  type="password"
                  id="repassword"
                  variant="standard"
                  value={repassword}
                onChange={handleRePasswordChange}
                error={repasswordError}
                helperText={
                    repasswordError ? t('signup.content.repassword.validation') : ""
                  }
                inputProps={{
                pattern: `(?=${password}).*`,
                }}
                />
              </Grid>
              <Grid item xs={12}>
              <Maps latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} ></Maps>
              </Grid>
             
            </Grid>
            <Button
              
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
              onClick={handle2FASubmit}
            >
              {t('signup.button.label')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  {t('signup.link.label')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>): (
          <TwoFAForm token={token} setToken={setToken} registerUser={handleSignupSubmit}  />
        )}
       
        </div>
        </Card>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      
        </Box>
    );
        
}

export default SignUp;