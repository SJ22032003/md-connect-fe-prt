import { useEffect, useState } from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_DOCTOR_DATA, UPDATE_DOCTOR_DATA } from "../../../store/actions";
import classes from "./styles/doctor.module.scss";
import Loader from "../../../components/common/Loader";
import * as yup from "yup";

function DoctorOnboarding() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const doctorData =
    useSelector((state: any) => state.userData.doctorInfo) || {};
  useEffect(() => {
    dispatch({
      type: GET_DOCTOR_DATA,
      setLoading,
    });
    // cleanup
    return () => {};
  }, []);

  useEffect(() => {
    if (doctorData.onBoarded) {
      navigate("/doctor/dashboard/home");
    }
  }, [doctorData]);

  const initialValues = {
    name: "",
    email: doctorData.email || "",
    age: "",
    city: "",
    state: "",
    phone: "",
    address: "",
    speciality: "",
    experience: "",
    qualification: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setLoading(true);
      dispatch({
        type: UPDATE_DOCTOR_DATA,
        payload: {
          ...values,
          step: 2,
          onBoarded: true,
        },
        setLoading,
        navigate: (path: string = "/doctor/dashboard/home") => navigate(path),
      });
    },
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <section className={classes.marginLeftRight}>
        <div className={classes.container}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} className={classes.pateintHeadingContainer}>
              <Typography variant="h1">
                What's up <span>D</span>oc,
              </Typography>
              <Typography variant="h4">
                We're excited to have you on board and work with us.
                <br /> Let's get you started with a few questions.
              </Typography>
              <small>
                <span>*</span> Required
              </small>
            </Grid>
            <Grid item xs={12} className={classes.pateintFormContainer}>
              <form onSubmit={formik.handleSubmit}>
                <Box component="div">
                  <TextField
                    id="name"
                    name="name"
                    variant="outlined"
                    placeholder="Name*"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.name && Boolean(formik.errors.name)}
                  />
                  <TextField
                    id="age"
                    name="age"
                    variant="outlined"
                    placeholder="Age*"
                    type="number"
                    fullWidth
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    error={formik.touched.age && Boolean(formik.errors.age)}
                  />
                </Box>
                <Box>
                  <TextField
                    id="phone"
                    name="phone"
                    variant="outlined"
                    placeholder="Phone*"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                  />
                  <TextField
                    id="address"
                    name="address"
                    variant="outlined"
                    placeholder="Address*"
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                  />
                </Box>
                <Box>
                  <TextField
                    id="speciality"
                    name="speciality"
                    variant="outlined"
                    placeholder="Speciality*"
                    fullWidth
                    value={formik.values.speciality}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.speciality &&
                      Boolean(formik.errors.speciality)
                    }
                  />
                  <TextField
                    id="qualification"
                    name="qualification"
                    variant="outlined"
                    placeholder="Qualification*"
                    fullWidth
                    value={formik.values.qualification}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.qualification &&
                      Boolean(formik.errors.qualification)
                    }
                  />
                </Box>
                <Box>
                  <TextField
                    id="experience"
                    name="experience"
                    variant="outlined"
                    placeholder="Experience*"
                    fullWidth
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.experience &&
                      Boolean(formik.errors.experience)
                    }
                  />
                </Box>
                <Box>
                  <TextField
                    id="email"
                    name="email"
                    variant="outlined"
                    placeholder="Email*"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    disabled
                  />
                </Box>
                <Box>
                  <TextField
                    id="city"
                    name="city"
                    variant="outlined"
                    placeholder="City*"
                    fullWidth
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                  />
                  <TextField
                    id="state"
                    name="state"
                    variant="outlined"
                    placeholder="State*"
                    fullWidth
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                  />
                </Box>
                <Button type="submit">Submit</Button>
              </form>
            </Grid>
          </Grid>
        </div>
      </section>
    </Box>
  );
}

export default DoctorOnboarding;

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  age: yup
    .number()
    .required("Age is required")
    .min(0, "Minimum age must be 0 years")
    .max(99, "Maximum age must be 99"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),
  address: yup.string().required("Address is required"),
  speciality: yup.string().required("Speciality is required"),
  experience: yup
    .number()
    .required("Experience is required")
    .min(0, "Minimum experince must be 0 years")
    .max(99, "Maximum experince must be 99"),
  qualification: yup.string().required("Qualification is required"),
});
