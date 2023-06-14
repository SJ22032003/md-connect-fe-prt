import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import commonClasses from "./styles/common.module.scss";
import classes from "./styles/signin.module.scss";
import doctorImg from "../../assets/doctor.svg";
import personImg from "../../assets/person.svg";
import { user_type, userSignInMethod } from "../../constant/user";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  LOGIN_AS_PATIENT,
  LOGIN_AS_DOCTOR,
  REGISTER_AS_PATIENT,
  REGISTER_AS_DOCTOR,
} from "../../store/actions";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { PATIENT, DOCTOR } = user_type;
  const { LOGIN, REGISTER } = userSignInMethod;

  const [signInUser, setSignInUser] = useState(PATIENT);
  const [signInMethod, setSignInMethod] = useState(LOGIN);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (signInMethod === LOGIN) {
        switch (signInUser) {
          case PATIENT:
            dispatch({
              type: LOGIN_AS_PATIENT,
              payload: {
                email: values.email,
                password: values.password,
              },
              navigate: (path: string = "/patient/dashboard/home") => navigate(path),
            });
            break;
          case DOCTOR:
            dispatch({
              type: LOGIN_AS_DOCTOR,
              payload: {
                email: values.email,
                password: values.password,
              },
              navigate: (path: string = "/doctor/dashboard/home") => navigate(path),
            });
        }
      } else {
        switch (signInUser) {
          case PATIENT:
            dispatch({
              type: REGISTER_AS_PATIENT,
              payload: {
                email: values.email,
                password: values.password,
              },
              navigate,
            });
            break;
          case DOCTOR:
            dispatch({
              type: REGISTER_AS_DOCTOR,
              payload: {
                email: values.email,
                password: values.password,
              },
              navigate: (path: string = "/onboarding/doctor") => navigate(path),
            });
        }
      }
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <section className={commonClasses.marginLeftRight}>
        <div className={classes.container}>
          <Paper
            elevation={3}
            sx={{
              maxWidth: 500,
              minWidth: 300,
              padding: "3%",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Box className={classes.chooseSignInUser}>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{
                      textDecoration:
                        signInUser === PATIENT ? "underline" : "none",
                    }}
                    onClick={() => setSignInUser(PATIENT)}
                  >
                    Patient
                  </Typography>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{
                      textDecoration:
                        signInUser === DOCTOR ? "underline" : "none",
                    }}
                    onClick={() => setSignInUser(DOCTOR)}
                  >
                    Doctor
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} className={classes.signInUserImgContainer}>
                <Box
                  component="img"
                  src={signInUser === PATIENT ? personImg : doctorImg}
                  alt="doctor"
                />
              </Grid>
              <Grid item xs={12} className={classes.signInFormContainer}>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    id="email"
                    variant="outlined"
                    placeholder="Email"
                    type="email"
                    fullWidth
                    onChange={formik.handleChange}
                    error={!!(formik.touched.email && formik.errors.email)}
                  />
                  <TextField
                    id="password"
                    variant="outlined"
                    placeholder="Password"
                    type="password"
                    fullWidth
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.password && formik.errors.password)
                    }
                  />
                  <Button
                    type="submit"
                    onSubmit={() => formik.handleSubmit()}
                    endIcon={<LockIcon sx={{ color: "#fff" }} />}
                  >
                    {signInMethod === LOGIN ? "Login" : "Register"}
                  </Button>
                </form>
              </Grid>
            </Grid>
            <Divider
              sx={{
                margin: "2% 0",
              }}
            />
            <Box className={classes.userSignInMethodContainer}>
              <Typography component="p" align="center">
                {signInMethod === LOGIN ? "Don't" : "Already"} have an account?{" "}
                <span
                  onClick={() =>
                    setSignInMethod(signInMethod === LOGIN ? REGISTER : LOGIN)
                  }
                >
                  {signInMethod === LOGIN ? "Register" : "Login"}
                </span>
              </Typography>
            </Box>
          </Paper>
        </div>
      </section>
    </Box>
  );
}

export default SignIn;

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
