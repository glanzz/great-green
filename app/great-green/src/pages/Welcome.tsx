// Import necessary modules and components
import { Box, Paper, Typography, Button, useMediaQuery } from "@mui/material";
import theme from "../theme";
import { useNavigate } from "react-router-dom";
import backgroundImg from "/nature.jpg";
import { Fade } from '@mui/material';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getActiveJourney } from "../store/journey-slice";
import {useTranslation} from '../../node_modules/react-i18next';
import { fetchJourneys, getUserInfo } from "../utils/api";
import { getUser, loadUserInfo } from "../store/user-slice";

// Define the Welcome component
function Welcome() {
  // Internationalization using react-i18next
  const {t} = useTranslation('common');

  // Use the useNavigate hook to navigate between pages
  const navigate = useNavigate();

  // Use the useMediaQuery hook to apply different styles based on screen size
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  // Use the useSelector hook to access the Redux store state
  const journey = useSelector(getActiveJourney());
  const user = useSelector(getUser());

  // Use the useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // Define a function to fetch journeys from the API
  const getJourneys = () => dispatch(fetchJourneys(t));

  // Use the useEffect hook to fetch journeys when the component mounts
  useEffect(() => {
    if(!journey) {
      getJourneys();
    }
  }, []);

  // Determine the active journey and set the welcome text and action text accordingly
  const activeJourney =!!journey?._id;
  const welcomeText =!activeJourney? 
    t('welcome.title.subtext'): 
    t('welcome.title.subtex2');
  const actionText = activeJourney? t('welcome.button.title1'): t('welcome.button.title2')

  // Define a function to handle the start journey button click
  const handleStartJourney = () => {
    navigate(!activeJourney? "/select-experience": `/home/journeys/${journey._id}`); // Redirect the user to the next page
  };

  // Use the useEffect hook to fetch user info when the component mounts
  useEffect(() => {
    getUserInfo().then(({data}) => {
      dispatch(loadUserInfo(data));
    }).catch(() => {})
  }, [])

  // Return the JSX for the Welcome component
  return (
    <>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth="80vw"
        padding={"15px"}
        sx={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Keep the background fixed during scroll
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: matches? 6 : 3, // Responsive padding
            borderRadius: theme.shape.borderRadius,
            backgroundColor: "rgba(255, 255, 255, 0.85)", // Increased opacity for better readability
            backdropFilter: "blur(10px)", // Stronger blur effect for an elegant look
            maxWidth: "600px", // Max width for the paper on larger screens
          }}
        >
          <Fade timeout={3000} appear in>
            <Typography
              variant="h3" // Larger variant for smaller screens
              color={theme.palette.primary.dark}
              textAlign="center"
              gutterBottom
            >
              {t('welcome.title')} {user.name}
            </Typography>
          </Fade>
          <Fade timeout={5000} appear in>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color={theme.palette.text.secondary}
              sx={{ mb: 4 }}
            >
              {welcomeText}
            </Typography>
          </Fade>
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleStartJourney}
              sx={{
                px: 5,
                py: 2,
                boxShadow: theme.shadows[10], // Prominent shadow for a 3D effect
                color: "white",
                ":hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {actionText}
            </Button>
          </Box>
        </Paper>
        <Paper
        elevation={5}
        sx={{
          mt: 4,
          textAlign: "center",
          borderRadius: theme.shape.borderRadius,
          backgroundColor: "rgba(255, 255, 255, 0.55)", // Increased opacity for better readability
          backdropFilter: "blur(10px)", // Stronger blur effect for an elegant look
          maxWidth: "450px", // Max width for the paper on larger screens
          visibility: !user.badges.length ? "hidden": "visible"
        }}
        >
          <Box mt={4} px={8} py={3}>
              <Typography
                variant="h5" // Larger variant for smaller screens
                sx={{mb: 4}}
                color={theme.palette.secondary.dark}
                textAlign="center"
                gutterBottom
              >
               {t('welcome.badges.title')}
              </Typography>
              {user.badges.map((badge, index) => {
                return(
                  <Fade key={badge._id} timeout={(index + 1) * 1000} appear in>
                    <img src={badge.logo} width="70px" />
                  </Fade>
                )
              })}
          </Box>
        </Paper>
      </Box>
      </>
  );
}


export default Welcome;
