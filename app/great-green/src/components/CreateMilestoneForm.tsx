import { Box, Button, Dialog, DialogActions, DialogContent,  DialogTitle, TextField, Typography, useMediaQuery } from "@mui/material";
import theme from "../theme";
import { Add, AddAPhotoOutlined, ArrowBackIos, CancelOutlined } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { createMilestone, fetchJourneys } from "../utils/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {useTranslation} from '../../node_modules/react-i18next';


type Props  = {
  open: boolean,
  setOpen: (v: boolean) => void
  journeyId: string,
}

export type NewMileStone = {
  comment?: string,
  file: File | null,
}

const CreateMilestoneForm = (props: Props) => {
   //Internationalization
 const {t} = useTranslation('common');
  const [milestone, setMilestone] = useState<NewMileStone>({file: null});
  const dispatch = useDispatch<AppDispatch>();
  const getJourneys = () => dispatch(fetchJourneys(t));

  const ImageWidth = {sm: "80%", md: "250px", xs: "100%"};
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [preview, setPreview] = useState<string>("")
  const updateValue = (key: string, value: string | File | null) => {
    setMilestone({...milestone, [key]: value});
  }
  const handleClose = () => {
    resetValues();
    props.setOpen(false)
  };
  const commentChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    updateValue("comment", value)
  }
  const fileChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    updateValue("file", target.files && target.files[0]);
    if(target.files && target.files[0]) {
      const objectUrl = URL.createObjectURL(target.files[0]);
      setPreview(objectUrl);
    }
  }
  const resetValues = () => {
    setMilestone({file: null});
    setPreview("");
  }
  const handleSubmit = async () => {
    await createMilestone(props.journeyId, milestone, handleClose,t)
    getJourneys();
  }

  return(
    <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle color="primary" variant="h5" id="responsive-dialog-title">
        {t('milestone.form.title.head')}
        </DialogTitle>
        <DialogContent>
          <div>
            <Typography color="text.secondary">
              {preview ? t('milestone.form.title'): t('milestone.form.title1')}
            </Typography>
          </div>
          {preview ? (
            <Box sx={{mt: "30px"}} display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <Box sx={{width: ImageWidth, maxWidth: "80vw", maxHeight: "60vh", padding: "10px", textAlign: "center"}}>
                <img src={preview} width="80%" />
              </Box>
              <TextField fullWidth sx={{maxWidth: "80%", mt: "80px"}} name="comment" label={t('milestone.form.addnew.comments')} multiline onChange={commentChange} />
            </Box>
          ): (
            <div>
              <input
                accept="image/*"
                name="file"
                id="contained-button-file"
                onChange={fileChange}
                type="file"
              />
              <label className="file-label" htmlFor="contained-button-file">
                <Button sx={{mt: "20px"}} size="large"  variant="contained" color="secondary" component="span">
                  <AddAPhotoOutlined sx={{mr: "20px"}}/>{t('milestone.form.upload')} 
                </Button>
              </label>

          </div>
          )}
        </DialogContent>
        <DialogActions sx={{padding: "15px"}}>
          <Button color="secondary" variant="contained" autoFocus onClick={preview ? resetValues : handleClose}>
            {preview ? <><ArrowBackIos /> {t('milestone.form.button.back')}</> : <><CancelOutlined /> {t('milestone.form.button.cancel')}</>}
          </Button>
          {
            !!preview &&  (
              <Button variant="contained" sx={{color: "white"}} autoFocus onClick={handleSubmit}>
                <Add /> {t('milestone.button')}
              </Button>
            )
          }
        </DialogActions>
      </Dialog>
  )
}

export default CreateMilestoneForm;
