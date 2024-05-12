import { Stepper, Step, StepLabel, Typography, StepContent, Button, Paper } from "@mui/material";
import { Milestone } from "../models/journey";
import {  Room } from "@mui/icons-material";
import CreateMilestoneForm from "./CreateMilestoneForm";
import { useState } from "react";
import moment from "moment";
import {useTranslation} from '../../node_modules/react-i18next';

type Props = {
  milestones: Array<Milestone>,
  button: boolean,
  journeyId: string
}

const Milestones = (props: Props) => {
  //Internationalization
  const {t} = useTranslation('common');
  const [open, setOpen] = useState(false);
  return(
    <Paper elevation={2} variant="outlined" sx={{padding: "20px", margin: "15px"}}>
      <Typography color="primary" variant="h6" mt="10px" mb="8px">{t('milestone.title')}</Typography>
      {!props.milestones.length && <Typography color="text.secondary" fontSize={"12px"} mt="8px" mb="20px"> {t('milestone.empty')}</Typography>}
      <Stepper orientation="vertical">
          {props.milestones.map((step) => (
            <Step active={true} key={step._id}>
              <StepLabel
                icon={<Room color="action" />}
                optional={<Typography color="primary" fontSize={"10px"}>{step.comment}</Typography>}
              >
                <Typography color="primary" fontSize={"12px"}>{moment(step.createdAt).format("MM/DD/YYYY HH:mm:ss") }</Typography>
              </StepLabel>
              <StepContent>
                <img className="milestone-image" src={step.url} alt={`Milestone ${step._id}`} width={"200px"} />
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {props.button && <Button sx={{mt: "50px"}} variant="contained" color='secondary' onClick={() => setOpen(true)}>{t('milestone.button')}</Button>}
        <CreateMilestoneForm journeyId={props.journeyId} open={open} setOpen={setOpen}  />
    </Paper>
  )
};


export default Milestones;
