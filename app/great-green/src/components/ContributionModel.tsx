
import { Button, Dialog, DialogActions, DialogContent,  DialogTitle, TextField, Typography } from "@mui/material";
import { CancelOutlined, CheckCircle } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { createContribution, fetchJourneys } from "../utils/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { Journey} from "../models/journey";
import {useTranslation} from 'react-i18next';


type Props = {
  open: boolean,
  setOpen: (v: boolean) => void,
  journey: Journey
}

const ContributionModel = (props: Props) => {
  //Internationalization
 const {t} = useTranslation('common');
  const [yieldValue, setYieldValue] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const getJourneys = () => dispatch(fetchJourneys(t));
  const handleClose = () => {
    props.setOpen(false);
    setYieldValue(0);
  }
  const yieldValueChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setYieldValue(value);
  }

  const handleSubmit = async() => {
    if (!yieldValue || yieldValue < 1) {
      toast(t('contribution.title'));
      return;
    } else {
      const callBack = () => {
        toast(t('contribution.title.succeess'));
        handleClose();
        getJourneys();
      }
      // Ask for yield first and then complete journey
      // Add model populate with the field and ask for user input
      await createContribution(
        props.journey._id,
        yieldValue,
        callBack,
        t
      )
    }
  }
  return(
      <Dialog
          open={props.open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle color="primary" variant="h5" id="responsive-dialog-title">
          {t('contribution.clac1')} ({props.journey.kit.plant.unit}) {t('contribution.clac2')} {props.journey.kit.plant.name}
          </DialogTitle>
          <DialogContent>
            <div>
              <Typography color="text.secondary">
              {t('contribution.info')}
              </Typography>
            </div>
            <TextField type="number" required fullWidth sx={{maxWidth: "80%", mt: "20px"}} name="yield" label={t('contribution.yield.value')} onChange={yieldValueChange} />
          </DialogContent>
          <DialogActions sx={{padding: "15px"}}>
            <Button color="secondary" autoFocus onClick={handleClose}>
              <><CancelOutlined sx={{mr: "8px"}} />{t('milestone.form.button.cancel')}</>
            </Button>
            <Button variant="contained" sx={{color: "white"}} autoFocus onClick={handleSubmit}>
              <CheckCircle sx={{mr: "8px"}} /> {t('journey.inprogress.actionItem')}
            </Button>
          </DialogActions>
        </Dialog>
    )
};

export default ContributionModel;
