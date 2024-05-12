import { Card, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import { Journey } from "../models/journey";
import moment from 'moment';
import { Pending, HourglassBottom, WhereToVote, TrendingUp, Verified, Forest, Park, Grass} from "@mui/icons-material"
import {useTranslation} from '../../node_modules/react-i18next';
type Props = {
  journey: Journey
}

const JOURNEY_STATUS_DATA = {
  PENDING: {
    icon: Pending,
  },
  WAITING: {
    icon: HourglassBottom,
    color: "info",
  },
  PICKUP_READY: {
   icon:  WhereToVote,
   color: "warning"
  },
  IN_PROGRESS: {
    icon: TrendingUp,
    color: "secondary"
  },
  COMPLETED: {
    icon: Verified,
    color: "success"
  }
};

const LEVEL_ICONS = {
  EASY: Grass,
  MEDIUM: Park,
  HARD: Forest
};


const JourneyCard = (props: Props) => {
   //Internationalization
   const {t} = useTranslation('common');
  const journeyTheme = JOURNEY_STATUS_DATA[props.journey.status];
  const LevelIcon = LEVEL_ICONS[props.journey.level];
  return (
    <Card sx={{ width: "fit-content",  padding: "10px", margin: "10px" }}>
      <CardHeader title={t('journey.card.title')} subheader={t('journey.card.title1')}  />
      <CardContent>
        <Typography sx={{ mb: 1.5 }}>
          <b>{t('journey.card.id.title')}:</b> #{props.journey._id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} >
        <b>{t('journey.summary.label2')}:</b> {moment(props.journey.createdDate).format("MM/DD/YYYY")}
        </Typography>
        <Typography sx={{ mb: 1.5 }} >
        <b>{t('journey.summary.label3')}:</b> <Chip label={props.journey.status} color={journeyTheme.color} size="small" icon={<journeyTheme.icon />} />
        </Typography>
        <Typography sx={{ mb: 1.5 }} >
        <b>{t('journey.card.level.title')}:</b> <Chip label={props.journey.level} color="secondary" size="small" icon={<LevelIcon color="primary" />} /> 
        </Typography>
        <Typography sx={{ mb: 1.5 }} >
        <b>{t('journey.card.kit.title')}:</b> {props.journey.kit.name}
        </Typography>
      </CardContent>
    </Card>
  )
}


export default JourneyCard;
