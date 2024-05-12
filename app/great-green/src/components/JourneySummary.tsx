import { Card, CardHeader, CardContent, Typography, Button, Chip, CardActions } from "@mui/material";
import { Journey } from "../models/journey";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {useTranslation} from 'react-i18next';

type Props = {
  journey: Journey
}


const JourneySummary = (props: Props) => {
  //Internationalization
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  return(
    <Card sx={{ width: "fit-content",  padding: "10px", margin: "10px" }}>
      <CardHeader subheader={`JID:${props.journey._id}`} />
      <CardContent>
        <Typography sx={{ mb: 1.5 }}>
          <b>{t('journey.summary.label1')}:</b> {props.journey.kit.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          <b>{t('journey.summary.label2')}:</b> {moment(props.journey.createdDate).format("MM/DD/YYYY")}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          <b>{t('journey.summary.label3')}:</b> <Chip
                  size="small"
                  label={props.journey.active ? t('journey.summary.status.item1'): t('journey.summary.status.item2')} 
                  color={props.journey.active ? "secondary": "default"}
                />
        </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`/home/journeys/${props.journey._id}`)}>{t('journey.summary.button')}</Button>
        </CardActions>
      </Card>
  );
};

export default JourneySummary;
