import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@mui/material"
import { Instruction } from "../models/journey"
import InstructionView from "./InstructionView"
import { ExpandMore} from "@mui/icons-material"
type Props = {
  title: string,
  instructions: Array<Instruction>
}

const InstructionSection = (props: Props) => {
  return  (
      <Accordion defaultExpanded sx={{ margin: "15px", width: "100%"}}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls={props.title}
          id={props.title}
        >
          <Typography variant="h5"  color="primary">{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {
      props.instructions.length ? 
        props.instructions.map(instruction => <InstructionView instruction={instruction}/>)
      : 
      <Paper elevation={1} sx={{padding: "30px", marginY: "20px"}}>
      <Typography variant="h5" sx={{mt: "20px", width: "100%"}} color="text.secondary">No Instructions Provided</Typography>
      </Paper>
      }
        </AccordionDetails>
      </Accordion>
  )
}

export default InstructionSection;
