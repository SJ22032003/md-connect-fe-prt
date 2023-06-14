import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { UPDATE_PATIENT_DATA, GET_PATIENT_DATA } from "../../../../store/actions";
import { firebaseInstance } from "../../../../config/firebase.config";
import * as yup from "yup";
import classes from "../styles/profile.module.scss";
import Dropzone from "../../../../components/common/DropzoneModal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import uuid from "short-uuid";
import toastMessages from "../../../../utils/toastMessages";
import CircularProgress from "@mui/material/CircularProgress";

function PatientProfile() {
  const dispatch = useDispatch();

  const patientData = useSelector((state: any) => state.userData.patientInfo);
  useEffect(() => {
    dispatch({
      type: GET_PATIENT_DATA,
    });
  }, []);

  const [open, setOpen] = useState(false);

  const handleDialog = () => {
    setOpen((p) => !p);
  };

  const initialValues = {
    name: patientData.name || "",
    email: patientData.email || "",
    phone: patientData.phone || "",
    address: patientData.address || "",
    city: patientData.city || "",
    state: patientData.state || "",
    age: patientData.age || "",
  };

  const changePasswordValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch({
        type: UPDATE_PATIENT_DATA,
        payload: {
          ...values,
        },
      });
    },
  });

  const changePasswordFormik = useFormik({
    initialValues: changePasswordValues,
    validationSchema: changePasswordValidationSchema,
    onSubmit: (values) => {
      if (values.newPassword !== values.confirmPassword) {
        return;
      } else {
        dispatch({
          type: UPDATE_PATIENT_DATA,
          payload: {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          },
        });
      }
    },
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <section className={classes.container}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Box component="div" className={classes.mainHeroContainer}>
                      <Typography variant="h1" gutterBottom>
                        Need Something to <span>U</span>padate?
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={classes.avatarContainer}>
                    <Avatar
                      onClick={handleDialog}
                      alt="Remy Sharp"
                      src={patientData.profileImage}
                      sx={{
                        width: 200,
                        height: 200,
                        cursor: "pointer",
                        "&:hover": {
                          opacity: 0.8,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item md={12} lg={8}>
              <Paper elevation={3}>
                <Box>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid
                      container
                      spacing={2}
                      className={classes.profileInput}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="name"
                          name="name"
                          placeholder="Name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="age"
                          name="age"
                          placeholder="Age"
                          value={formik.values.age}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.age && Boolean(formik.errors.age)
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={formik.values.email}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="phone"
                          name="phone"
                          placeholder="Phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.phone && Boolean(formik.errors.phone)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="address"
                          name="address"
                          placeholder="Address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.address &&
                            Boolean(formik.errors.address)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="city"
                          name="city"
                          placeholder="City"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.city && Boolean(formik.errors.city)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="state"
                          name="state"
                          placeholder="State"
                          value={formik.values.state}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.state && Boolean(formik.errors.state)
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" type="submit">
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Paper>
            </Grid>
            <Grid item md={12} lg={4}>
              <Paper elevation={3}>
                <Box className={classes.profilePassword}>
                  <Typography variant="h4" gutterBottom>
                    Change Password
                  </Typography>
                </Box>
                <Box>
                  <form onSubmit={changePasswordFormik.handleSubmit}>
                    <Grid
                      container
                      spacing={2}
                      className={classes.profileInput}
                    >
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="oldPassword"
                          name="oldPassword"
                          placeholder="Old Password"
                          value={changePasswordFormik.values.oldPassword}
                          onChange={changePasswordFormik.handleChange}
                          error={
                            changePasswordFormik.touched.oldPassword &&
                            Boolean(changePasswordFormik.errors.oldPassword)
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="newPassword"
                          name="newPassword"
                          placeholder="New Password"
                          type="password"
                          value={changePasswordFormik.values.newPassword}
                          onChange={changePasswordFormik.handleChange}
                          error={
                            changePasswordFormik.touched.newPassword &&
                            Boolean(changePasswordFormik.errors.newPassword)
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          value={changePasswordFormik.values.confirmPassword}
                          onChange={changePasswordFormik.handleChange}
                          error={
                            changePasswordFormik.touched.confirmPassword &&
                            Boolean(changePasswordFormik.errors.confirmPassword)
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" type="submit">
                          Set Password
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </section>
      </Box>
      <DailogForUploadingProfileImage open={open} handleClose={handleDialog} />
    </>
  );
}

export default PatientProfile;

type DailogForUploadingProfileImageProps = {
  open: boolean;
  handleClose: () => void;
};

const DailogForUploadingProfileImage = ({
  open,
  handleClose,
}: DailogForUploadingProfileImageProps) => {
  const dispatch = useDispatch();

  const { storageRef, uploadBytes, uploadUrl } = firebaseInstance;
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setFile(null);
    handleClose();
  };

  const dropzoneConfig = {
    accept: {
      "image/png": [".png", ".jpeg", ".jpg"],
    },
  };

  const uploadFileToFirebase = async () => {
    if (!file) return;
    const fileRef = storageRef(
      `profileImages/${file.name}-${Date.now()}-${uuid.generate()}`
    );
    setLoading(true);
    uploadBytes(fileRef, file)
      .then(async (snapshot) => {
        dispatch({
          type: UPDATE_PATIENT_DATA,
          payload: {
            profileImage: await uploadUrl(snapshot.ref),
          },
          setLoading,
        });
      })
      .catch((err) => {
        toastMessages({
          type: "error",
          message: "Error in uploading profile image",
        });
        console.log(err);
      })
      .finally(() => {
        setFile(null);
        setLoading(false);
        handleClose();
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "500px",
            borderRadius: "10px",
            height: "100%",
            maxHeight: "300px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" className={classes.dailogTitle}>
          Upload Profile Image
        </DialogTitle>
        <DialogContent>
          <Dropzone config={dropzoneConfig} setFile={setFile} />
        </DialogContent>
        <DialogActions className={classes.dailogBtnContainer}>
          <Button
            onClick={uploadFileToFirebase}
            endIcon={<CloudUploadIcon />}
            disabled={(!file && true) || loading}
          >
            {loading ? (
              <CircularProgress
                size={20}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Upload"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

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
});

const changePasswordValidationSchema = yup.object({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
});
