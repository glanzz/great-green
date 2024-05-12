import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Avatar, Typography, Grid, TextField, Button, Fade } from "@mui/material";
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {object, string} from 'yup';


type Props = {
  setToken: (s: string) => void,
  token: string,
  registerUser: () => void
}

  



const TwoFAForm = (props: Props) => {
  const [tokenError, setTokenError] = useState<string>("");
  //Internationalization
  const {t} = useTranslation('common');

  const createTokenSchema = object({
    token: string().matches(/^\d{6}$/, t('twofa.token')).required(),
  });
  const handleTokenChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    props.setToken(value);
    console.log(value)
    try {
      createTokenSchema.validateSync({token: value});
      setTokenError("");
    } catch (e) {
      console.log(e);
      setTokenError(e.errors[0]);
    }
  }

  const handleSubmit = () => {
    if(tokenError) {
      toast(t('twofa.handle.submit.info'))
    } else {
      props.registerUser();
    }
  }
  return(
    <Fade timeout={1000} appear in>
    <Box justifyContent="center"
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
        {t('twofa.otp.info')}
        </Typography>
        <Typography component="small">
        {t('twofa.email.info')} 
        </Typography>

        <Box component="form" justifyContent="center"   sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
              required
              id="token"
              label={"OTP"}
              variant="standard"
              value={props.token}
              onChange={handleTokenChange}
              error={!!tokenError}
              helperText={tokenError}
            />
            </Grid>
            <Button
              
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
              onClick={handleSubmit}
            >
              {t('twofa.signup.button.title')}
            </Button>
          </Grid>
        </Box>
    </Box>
    </Fade>
  )
};


export default TwoFAForm;
