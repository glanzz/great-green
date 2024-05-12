import {
  ThemeProvider,
  Box,
  Typography,
  Button,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import theme from "../theme";
import { useLocation, useNavigate } from "react-router-dom";
import Authenticate from "../components/Authenticate";
import { useTranslation } from "../../node_modules/react-i18next";
import { useEffect } from "react";
import { languageSelect } from "../utils/helpers";

// Define the AssignKit functional component
function AssignKit() {
  // Initialize internationalization with useTranslation hook
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();

  // Apply language selection on component mount
  useEffect(() => {
    languageSelect(i18n);
  }, []);

  // Check if the screen size matches the 'sm' breakpoint and above
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  // Redirect to home page if no ID is found in the location state
  if (!location.state.id) {
    navigate("/home");
  }

  // Define a function to handle the 'Continue' button click event
  const handleContinue = () => {
    navigate(`/home/journeys/${location.state.id}`); // Redirect to journey details page
  };

  // Return the JSX content to be rendered
  return (
    <Authenticate>
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          padding={5}
          sx={{ bgcolor: theme.palette.primary.light }}
        >
          {/* Circular progress indicator and potted plant image */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: matches ? 300 : 200,
              width: matches ? 300 : 200,
            }}
          >
            <CircularProgress
              size={matches ? 300 : 200}
              thickness={4}
              sx={{
                color: theme.palette.secondary.main,
                animationDuration: "550ms",
                position: "absolute",
                left: 0,
                "@keyframes rotate": {
                  "0%": {
                    transform: "rotate(0deg)",
                  },
                  "100%": {
                    transform: "rotate(360deg)",
                  },
                },
                animation: "rotate 2s linear infinite",
              }}
            />
            <Box
              component="img"
              src="/pottedplant.png"
              sx={{
                height: matches ? 150 : 100,
                width: matches ? 150 : 100,
                animation: "rotate 2s linear infinite",
              }}
            />
          </Box>

          {/* Title and description */}
          <Typography color="success" variant="h4" sx={{ mt: 4 }}>
            {t("assign.kit.title")}
          </Typography>
          <Typography
            textAlign={"center"}
            variant="subtitle1"
            sx={{ mt: 2, color: theme.palette.secondary.contrastText }}
          >
            {t("assign.kit.info")}
          </Typography>

          {/* Continue button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinue}
            sx={{
              mt: 4,
              px: 5,
              py: matches ? 2 : 1,
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
      </ThemeProvider>
    </Authenticate>
  );
}

// Export the AssignKit component
export default AssignKit;
