import { Badge, Button, Card, CardActions, CardContent, CardHeader, Chip, Paper, Typography } from "@mui/material";
import { Journey } from "../models/journey";
import { Pending, Verified} from "@mui/icons-material"
import moment from "moment";
import { completeContribution, fetchJourneys } from "../utils/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {useTranslation} from 'react-i18next';

type Props = {
  journey: Journey
}

const CONTRIBUTION_STATUS_DATA = {
  PENDING: {
    icon: Pending,
    color: "warning"
  },
  COMPLETED: {
    icon: Verified,
    color: "secondary"
  }
};

// Value, unit , Plant name, action=COMPLETE if not complete
const ContributionCard = (props: Props) => {
  //Internationalization
 const {t} = useTranslation('common');
  const dispatch = useDispatch<AppDispatch>();
  const isPending = props.journey.contribution?.status == "PENDING";
  const statusTheme = CONTRIBUTION_STATUS_DATA[props.journey.contribution?.status];
  const handleComplete = async () => {
    const successCallback = () => dispatch(fetchJourneys(t))
    await completeContribution(props.journey._id, successCallback, t);
  }
  return(
    <Card sx={{ width: "fit-content", maxWidth: "400px",  padding: "10px", margin: "10px" }}>
      <CardHeader subheader={`JID: #${props.journey._id}`} />
      <CardContent>
        <Badge color="primary" badgeContent={<Typography fontSize={12} color="white">{props.journey.kit.plant.unit}</Typography>} >
          <Typography variant="h1" color="green">{props.journey.contribution?.value}</Typography>
        </Badge>
        <Typography mt={"8px"} variant="subtitle2" color="green">of {props.journey.kit.plant.name}</Typography><br/>
        <Typography sx={{ mb: 1.5 }} >
        <b>{t('journey.summary.label3')}:</b> <Chip label={props.journey.contribution?.status} color={statusTheme.color} size="small" icon={<statusTheme.icon />} />
        </Typography>
        <Typography sx={{ mb: 1.5 }} >
          <b>{t('contribution.date')}</b> {moment(props.journey.contribution?.createdOn).format("MM/DD/YYYY")}
        </Typography>
        {isPending && (
          <Paper sx={{padding: "20px", marginY: "15px", color: "text.secondary"}} variant="outlined">
            {t('contribution.note.label')} {props.journey.provider.address}
          </Paper>
        )}
      </CardContent>
      <CardActions>
        {isPending && (
          <Button onClick={handleComplete}>
            {t('contribution.button')}
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default ContributionCard;
