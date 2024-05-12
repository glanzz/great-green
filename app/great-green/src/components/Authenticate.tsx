import { AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn, loadUserInfo } from '../store/user-slice';
import { getUserInfo } from '../utils/api';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';



type Props = {
  children: React.ReactNode,
  loginPage?: boolean
}

const Authenticate = (props: Props) => {
  const loggedIn = useSelector(isLoggedIn());
  const [isLoading, setIsLoading] = useState(false);
  const redirectURL = props.loginPage ? "/home": "/login";
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if(!loggedIn && !isLoading) {
      setIsLoading(true);
      getUserInfo().then(({data}) => {
        dispatch(loadUserInfo(data));
        if(props.loginPage) {
          navigate(redirectURL);
        }
      }).catch(() => {
        if(!props.loginPage) {
          navigate(redirectURL);
        }
      }).finally(() => setIsLoading(false));
    } 
  }, [loggedIn]);

  if(isLoading) {
    return(
    <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
              >
    <CircularProgress color="inherit" />
  </Backdrop>);
  }

  if (props.loginPage) {
    return (!loggedIn ?  props.children: null); 
  }

  return (
    loggedIn ? props.children : null
  );
}


export default Authenticate;
