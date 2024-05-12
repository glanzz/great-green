import { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJourneys } from '../utils/api';
import { useEffect } from 'react';
import { getJourneys } from '../store/journey-slice';
import { Box, Grid, Typography } from '@mui/material';
import JourneySummary from '../components/JourneySummary';
import {useTranslation} from '../../node_modules/react-i18next';


const MyJourneys = () => {
   //Internationalization
   const {t} = useTranslation('common');
  const journeys = useSelector(getJourneys());
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if(!journeys.length) {
      dispatch(fetchJourneys(t))
    }
  }, []);
  /**
   * 
   * Show all the jounreys ID, Kitname, createdDate, Active or not, View button
   */
  return (
    <Box sx={{padding: "30px", margin: "20px"}}>
      <Typography variant='h3' my={"20px"} color={"primary"}>{journeys.length ? t('navbar.item.label1') : t('myjourney.heading.validation')}</Typography>
      <Grid container>
        {journeys.map(journey => {
          return(
            <Grid key={journey._id} item>
              <JourneySummary journey={journey} />
            </Grid>
          )
        })}
      </Grid>
    </Box>

  );
}

export default MyJourneys;
