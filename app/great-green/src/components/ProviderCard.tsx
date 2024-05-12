import { Card, CardContent, CardHeader, Paper, Skeleton, Typography } from "@mui/material";
import { Provider } from "../models/journey";
import { ReactNode } from "react";

type Props = {
  provider: Provider,
  header: string,
  subheader: string,
  hide: boolean,
}


type HideProps = {
  hide?: boolean,
  children: ReactNode
}

const Hideable = (props: HideProps) => {
  return props.hide ? <Skeleton animation="wave" />: props.children
}

const ProviderCard = (props: Props) => {
  return(
    <Card sx={{ width: "fit-content",  padding: "10px", margin: "10px" }}>
      <CardHeader title={props.header} subheader={props.subheader} />
      <CardContent>
        <Typography sx={{ mb: 1.5 }}>
          <Hideable hide={props.hide} >
            <b>Name:</b> {props.provider.name}
          </Hideable>
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          <Hideable hide={props.hide} >
          <b>Type:</b> {props.provider.type == "UN"? "UN Center": props.provider.type}
          </Hideable>
        </Typography>
        <Typography sx={{ mb: 1.5 }} >
          <Hideable hide={props.hide} >
            <b>Address:</b>
            <Paper sx={{padding: "20px", backgroundColor: "#f1f1f1"}} variant="outlined">
              {props.provider.address}
              </Paper>
          </Hideable>
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          <Hideable hide={props.hide} >
            <b>Preferred Timings:</b> 8:00AM - 5:00PM
          </Hideable>
        </Typography>
        </CardContent>
    </Card>
  );
}

export default ProviderCard;
