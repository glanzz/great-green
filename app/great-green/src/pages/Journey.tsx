import { AppDispatch } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJourneys, updateJourneyStatus } from "../utils/api";
import { useEffect, useState } from "react";
import { getJourneyById } from "../store/journey-slice";
import KitPlant from "../components/KitPlant";
import { Box, IconButton, Typography, Grid } from "@mui/material";
import JourneyCard from "../components/JourneyCard";
import ProviderCard from "../components/ProviderCard";
import InstructionSection from "../components/InstructionSection";
import { ArrowBackIos, SearchOff } from "@mui/icons-material";
import InfoBox from "../components/InfoBox";
import { toast } from "react-toastify";
import Milestones from "../components/Milestones";
import { getNextStatus } from "../utils/helpers";
import ContributionModel from "../components/ContributionModel";
import { useTranslation } from "react-i18next";

// Define the Journey component
const Journey = () => {
  // Initialize internationalization
  const { t } = useTranslation("common");

  // Get the journey ID from the URL parameters
  const { id } = useParams();

  // Get the journey data from the Redux store
  const journey = useSelector(getJourneyById(id));

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Get the dispatch function from react-redux
  const dispatch = useDispatch<AppDispatch>();

  // Define a function to fetch journeys from the API
  const getJourneys = () => dispatch(fetchJourneys(t));

  // Initialize state for the contribution model
  const [contributionModel, setContributionModel] = useState<boolean>(false);

  // Fetch journeys when the component mounts, if the journey data is not already available
  useEffect(() => {
    if (!journey) {
      getJourneys();
    }
  }, []);

  // Define variables for the provider header, subheader, and info based on the journey status
  let providerHeader = "";
  let providerSubHeader = "";
  let hideProvider = false;
  let showAddMileStone = false;
  let info = "";
  let actionName = "";
  let actionHandler = () => {};

  // Set the provider header, subheader, and info based on the journey status
  switch (journey?.status) {
    case "PENDING":
      providerHeader = t("journey.providerHeader");
      hideProvider = true;
      info = t("journey.providerHeader.info.pending");
      break;
    case "WAITING":
      providerHeader = t("journey.providerHeader");
      info = t("journey.providerHeader.info.waiting");
      break;
    case "PICKUP_READY":
      providerHeader = t("journey.providerHeader");
      providerSubHeader = t("journey.providerSubHeader.pickup");
      info = t("journey.providerHeader.info.pickedup");
      actionName = t("journey.providerHeader.actionitem.pickup");
      actionHandler = async () => {
        const callBack = () => {
          toast(t("journey.providerHeader.pickedup.action"));
          getJourneys();
        };
        await updateJourneyStatus(journey._id, getNextStatus(journey.status), callBack, t);
      };
      break;
    case "IN_PROGRESS":
      providerHeader = t("journey.provideHeader.title");
      showAddMileStone = true;
      info = t("journey.inprogress.info");
      actionName = t("journey.inprogress.actionItem");
      actionHandler = async () => {
        setContributionModel(true);
      };
      break;
    case "COMPLETED":
      providerHeader = t("journey.provideHeader.title");
      info = t("journey.completed.info");
      break;
    default:
      providerHeader = t("journey.provideHeader.title");
      info = "...";
      break;
  }

  // Render the component
  if (!journey) {
    return (
      <Box sx={{ padding: "40px", margin: "40px" }}>
        <SearchOff sx={{ mr: "10px" }} /> {t("journey.notPresent")}
      </Box>
    );
  }
  // Show journey details with kit proivder and instructions
  return (
    <Box sx={{ padding: "20px", margin: "20px" }}>
      <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"}>
        <IconButton onClick={() => navigate("/home/journeys")}>
          <ArrowBackIos />
        </IconButton>
        <Typography variant="h3" mx="12px" my={"20px"} color={"primary"}>
          {t("journey.info.title")}
        </Typography>
      </Box>
      <Grid container justifyContent={"flex-start"} sx={{ mt: "50px" }}>
        <KitPlant kit={journey?.kit} />
        <JourneyCard journey={journey} />
        <InfoBox info={info} actionHandler={actionHandler} actionName={actionName} />
        <ProviderCard
          hide={hideProvider}
          header={providerHeader}
          subheader={providerSubHeader}
          provider={journey.provider}
        />
        <InstructionSection
          title={t("journey.inst.title")}
          instructions={journey.kit.journey_instructions}
        />
        <Milestones
          journeyId={journey._id}
          milestones={journey.milestones}
          button={showAddMileStone}
        />
        <ContributionModel
          journey={journey}
          open={contributionModel}
          setOpen={setContributionModel}
        />
      </Grid>
    </Box>
  );
};

//{journey  ? <ContributionCard journey={{...journey, kit: {plant: {name: "GRASS", unit: "POUNDS"}}, contribution: {value: 40, status: "COMPLETED", createdAt: "2024-04-14T03:12:04.916Z"}}} />: null}

export default Journey;
