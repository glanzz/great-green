import { Card, CardHeader, CardContent, Typography, Paper, CardActions, Button } from "@mui/material";
import {useTranslation} from 'react-i18next';
type Props = {
  actionName: string,
  actionHandler: () => void,
  info: string
}
const InfoBox = (props: Props) => {
   //Internationalization
   const {t} = useTranslation('common');
  return (
    <Card sx={{ width: "fit-content", maxWidth: "300px",  padding: "10px", margin: "10px" }}>
      <CardHeader title={t('infobox.title')} />
      <CardContent>
        <Typography sx={{ mb: 1.5 }} >
          <Paper sx={{padding: "20px", backgroundColor: "#f1f1f1"}} variant="outlined">
            {props.info}
          </Paper>
          </Typography>
        </CardContent>
        {props.actionName && (<CardActions>
          <Button onClick={props.actionHandler}>{props.actionName}</Button>
        </CardActions>)}
    </Card>
  )
};

export default InfoBox;
