import { Button, Grid, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { LoginFormInput } from "../models/login";

import { t } from "i18next";

//const {t} = useTranslation('common');

const LoginForm = (props: FormikProps<LoginFormInput>) => (
  <Grid container spacing={2} alignItems={"center"} justifyContent={"center"} padding={5}>
    <Grid item xs={8} textAlign={"center"}>
      <TextField
        name="username"
        onChange={props.handleChange}
        error={!!(props.touched.username && props.errors.username)}
        type="email"
        fullWidth
        placeholder={t("loginform.email.info")}
        sx={{ marginTop: "30px" }}
        color="secondary"
        label={t("loginform.email")}
        margin="dense"
        variant="standard"
        value={props.values.username}
        helperText={props.errors.username}
      />
    </Grid>
    <Grid item xs={8} textAlign={"center"}>
      <TextField
        name="password"
        onChange={props.handleChange}
        error={!!(props.touched.password && props.errors.password)}
        type="password"
        fullWidth
        placeholder={t("loginform.password.info")}
        sx={{ marginTop: "30px" }}
        color="secondary"
        label={t("loginform.password")}
        margin="dense"
        variant="standard"
        value={props.values.password}
        helperText={props.errors.password}
      />
    </Grid>
    <Grid
      item
      marginX={"auto"}
      marginTop={"44px"}
      marginBottom={"44px"}
      xs={5}
      textAlign={"center"}
    >
      <Button
        onClick={props.handleSubmit}
        type="submit"
        fullWidth
        sx={{ color: "white" }}
        variant="contained"
        color="primary"
      >
        {t("loginform.button")}
      </Button>
    </Grid>
  </Grid>
);

export default LoginForm;
