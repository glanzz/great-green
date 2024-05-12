import { Paper, Typography } from "@mui/material";
import { Instruction } from "../models/journey";

type Props = {
  instruction: Instruction
}

const InstructionView = (props: Props) => {
  return(
    <Paper elevation={1} sx={{padding: "30px", marginY: "20px"}}>
      <Typography variant="h6" color="text.primary">{props.instruction.title}</Typography>
      <Typography sx={{marginY: "20px"}} color="text.secondary">{props.instruction.description}</Typography>
      {props.instruction.resources?.map(resource => {
        return(
          <iframe className="resource-player" width="100%" height="auto" src={resource} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        )
      })}
    </Paper>
  );
};

export default InstructionView;

