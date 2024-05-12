import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Box, Paper, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Formik } from "formik";
import { loginValidationSchema } from "../constants";
import LoginForm from "../components/LoginForm";
import { LoginFormInput } from "../models/login";
import { login } from "../utils/api";
import Authenticate from "../components/Authenticate";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../node_modules/react-i18next";
import { useEffect } from "react";
import { languageSelect } from "../utils/helpers";

// Define the Login function component
function Login() {
  // Use the useTranslation hook to access translation functionality
  const { t, i18n } = useTranslation("common");
  // Use the useNavigate hook to navigate to different pages
  const navigate = useNavigate();
  // Define some sample data for the ImageList component
  const itemData = [
    {
      img: "desert.webp",
      title: "Phase 1",
    },
    {
      img: "leaves.jpeg",
      title: "Phase 2",
    },
    {
      img: "vegitation.jpeg",
      title: "Phase 3",
    },
  ];

  // Define the handleSubmit function to handle form submission
  const handleSubmit = async (values: LoginFormInput) => {
    // Define a function to redirect to the home page on successful login
    const successRedirect = () => {
      navigate("/home");
    };
    // Call the login function with the entered values and the successRedirect function
    await login(values, successRedirect, t);
  };

  // Use the useEffect hook to run the languageSelect function on component mount
  useEffect(() => {
    languageSelect(i18n);
  }, []);

  // Return the JSX for the component
  return (
    <ThemeProvider theme={theme}>
      {/* Use the Authenticate component to handle authentication */}
      <Authenticate loginPage>
        <Box
          sx={{ marginTop: "100px" }}
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          <div style={{ textAlign: "center" }}>
            <Typography fontWeight={"bold"} variant="h1">
              {t("login.title")}
            </Typography>
            <ImageList
              sx={{ width: { md: 500, xs: "100%", sm: "100%" }, height: 450 }}
              variant="woven"
              cols={3}
              gap={8}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=161&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
          <Paper
            variant="outlined"
            sx={{ margin: "44px", backgroundColor: "#f0f0f0" }}
            square={false}
          >
            {/* Use the Formik component to handle form state and validation */}
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={loginValidationSchema}
              children={LoginForm}
            ></Formik>
          </Paper>
        </Box>
      </Authenticate>
    </ThemeProvider>
  );
}

// Export the Login component
export default Login;
