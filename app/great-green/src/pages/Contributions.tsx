// Import necessary modules and components
import { Box, Typography, Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getContributionJourneys } from "../store/journey-slice";
import { fetchJourneys } from "../utils/api";
import ContributionCard from "../components/ContributionCard";
import { useTranslation } from "react-i18next";

// Define the MyContributions functional component
const MyContributions = () => {
  // Use the useTranslation hook to enable internationalization
  const { t } = useTranslation("common");

  // Use the useSelector hook to get the contribution journeys from the Redux store
  const journeys = useSelector(getContributionJourneys());

  // Use the useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // Use the useEffect hook to fetch journeys when the component mounts
  useEffect(() => {
    if (!journeys.length) {
      dispatch(fetchJourneys(t));
    }
  }, []);

  // Render the component
  return (
    <Box sx={{ padding: "30px", margin: "20px" }}>
      <Typography variant="h3" my={"20px"} color={"primary"}>
        {journeys.length ? t("navbar.item.label2") : t("contribution.title.empty")}
      </Typography>
      <Box display={"flex"}>
        {journeys.map((journey) => {
          return <ContributionCard journey={journey} />;
        })}
      </Box>
    </Box>
  );
};

// Export the MyContributions component
export default MyContributions;
