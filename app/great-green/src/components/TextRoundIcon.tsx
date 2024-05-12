import { Avatar, Grid, Typography } from "@mui/material";

type Props = {
  name: string,
  img: string,
  small?: boolean
}

const TextRoundIcon = (props: Props) => {
  const size = props.small ? 40: 80;
  const fontSize = props.small ? 12: 16;
  return (
    <Grid  width={"fit-content"} textAlign={"center"} container flexDirection={"column"} justifyItems={"center"} alignItems={"center"} >
        <Grid item>
          <Avatar  src={props.img} sx={{ width: size, height: size, boxShadow: "1px 2px 5px #b9b9b9" }}></Avatar>
        </Grid>
        <Grid item width={"80%"} overflow={"hidden"} sx={{wordBreak: "break-word"}} mt={1}>
        <Typography fontSize={fontSize} color="secondary.dark">{props.name}</Typography>
        </Grid>
      </Grid>
  )
}

export default TextRoundIcon;
