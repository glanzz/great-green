import {
  ThemeProvider,
  Box,
  Typography,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Fade,
} from "@mui/material";
import theme from "../theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import backgroundImg from "/vegitationdark.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getActiveJourney } from "../store/journey-slice";
import { createJourney, fetchJourneys } from "../utils/api";
import { Forest, Grass, Park } from "@mui/icons-material";
import Authenticate from "../components/Authenticate";
import { useTranslation } from "../../node_modules/react-i18next";
import { languageSelect } from "../utils/helpers";

// Define the SelectExperience component
function SelectExperience() {
  // Initialize internationalization with useTranslation hook
  const { t, i18n } = useTranslation("common");

  // Get the navigate function from useNavigate hook
  const navigate = useNavigate();

  // Set up state for difficulty level
  const [difficulty, setDifficulty] = useState("EASY");

  // Get the active journey from the Redux store
  const activeJourney = useSelector(getActiveJourney());

  // Get the dispatch function from useDispatch hook
  const dispatch = useDispatch<AppDispatch>();

  // Define a function to fetch journeys from the API
  const getJourneys = () => dispatch(fetchJourneys(t));

  // Set up a useEffect hook to run languageSelect function on component mount
  useEffect(() => {
    languageSelect(i18n);
  }, []);

  // Set up a useEffect hook to fetch journeys if there is no active journey
  useEffect(() => {
    if (!activeJourney) {
      getJourneys();
    }
  }, []);

  // Define a function to handle changes to the difficulty level
  const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty((event.target as HTMLInputElement).value);
  };

  // Define a function to handle the Continue button click
  const handleContinue = async () => {
    // Create a new journey with the selected difficulty level
    await createJourney(difficulty, (id: string) => navigate("/assign-kit", { state: { id } }), t);
  };

  // Redirect to the home page if there is an active journey
  if (activeJourney && activeJourney._id) {
    navigate("/home");
  }

  // Render the component
  return (
    <Authenticate>
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          padding={"12px"}
          sx={{
            bgcolor: "theme.palette.primary.main ",
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            maxWidth: "100vw",
            overflow: "hidden",
          }}
        >
          <Fade in timeout={2000}>
            <Paper
              elevation={5}
              sx={{
                p: 4,
                borderRadius: theme.shape.borderRadius,
                width: { md: "100%" },
                maxWidth: "400px",
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h3" textAlign="center" gutterBottom>
                {t("experience.title")}
              </Typography>
              <Typography
                color="text.secondary"
                variant="subtitle1"
                textAlign="center"
                gutterBottom
                sx={{ mb: 4 }}
              >
                {t("experience.title.info")}
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  aria-label="difficulty"
                  name="difficulty-level"
                  value={difficulty}
                  onChange={handleDifficultyChange}
                  sx={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value="EASY"
                    control={<Radio />}
                    label={
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Grass color="secondary" sx={{ fontSize: 40 }} />
                        {t("experience.level.llabel1")}
                      </Box>
                    }
                    sx={{ mb: 2 }}
                  />
                  <FormControlLabel
                    value="MEDIUM"
                    control={<Radio />}
                    label={
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Park color="success" sx={{ fontSize: 40 }} />
                        {t("experience.level.llabel2")}
                      </Box>
                    }
                    sx={{ my: 2 }}
                  />
                  <FormControlLabel
                    value="HARD"
                    control={<Radio />}
                    label={
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Forest color="primary" sx={{ fontSize: 40 }} />
                        {t("experience.level.llabel3")}
                      </Box>
                    }
                    sx={{ mt: 2 }}
                  />
                </RadioGroup>
              </FormControl>
              <Box textAlign="center" marginTop={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleContinue}
                  sx={{
                    px: 5,
                    py: 2,
                    boxShadow: theme.shadows[10],
                    color: "white",
                    ":hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  {t("experience.level.button")}
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Box>
      </ThemeProvider>
    </Authenticate>
  );
}

export default SelectExperience;
