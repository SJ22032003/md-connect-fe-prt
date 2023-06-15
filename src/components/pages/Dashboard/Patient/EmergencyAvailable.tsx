import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  UPDATE_PATIENT_REPORTS,
  DELETE_PATIENT_REPORTS,
  GET_PATIENT_DATA,
} from "../../../../store/actions";
import { firebaseInstance } from "../../../../config/firebase.config";
import { formatDate } from "../../../../utils/date";
import * as yup from "yup";
import classes from "../styles/report.module.scss";
import Dropzone from "../../../../components/common/DropzoneModal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import uuid from "short-uuid";
import toastMessages from "../../../../utils/toastMessages";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import CancelIcon from "@mui/icons-material/Cancel";

function EmergencyAvailable() {
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

  function downloadFile(url: string, fileName: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function deleteReport(id: string) {
    dispatch({
      type: DELETE_PATIENT_REPORTS,
      payload: {
        id,
      },
    });
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <section className={classes.container}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Box>
                  <Box>
                    <Box component="div" className={classes.mainHeroContainer}>
                      <Typography variant="h1" gutterBottom>
                        Your <span>R</span>eports
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        Here you can add your prior medical history and reports
                      </Typography>
                    </Box>
                    <Box className={classes.reportBtnContainer}>
                      <Button
                        endIcon={<AddCircleOutlineIcon />}
                        onClick={handleDialog}
                      >
                        Add Medical History
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Box component="div" className={classes.reportContainer}>
                  <Typography variant="h3" gutterBottom>
                    You can also <span>download</span> your reports here
                  </Typography>
                  <Box>
                    {patientData.report.length > 0 ? (
                      patientData.report.map((item: any) => {
                        return (
                          <Box>
                            <Box component="aside">
                              <IconButton
                                onClick={() => deleteReport(item._id)}
                              >
                                <CancelIcon sx={{ fontSize: "30px" }} />
                              </IconButton>
                            </Box>
                            <Box key={item.id}>
                              <Typography variant="h4" gutterBottom>
                                {item.reportName}
                              </Typography>
                              <Typography variant="h5" gutterBottom>
                                {item.reportedBy}
                              </Typography>
                              <Typography variant="h6" gutterBottom>
                                <span>{formatDate(item.issuedAt)}</span>
                              </Typography>
                            </Box>
                            <Box>
                              <Button
                                onClick={() =>
                                  downloadFile(item.reportUrl, item.reportName)
                                }
                              >
                                <DownloadIcon sx={{ fontSize: "30px" }} />
                              </Button>
                            </Box>
                          </Box>
                        );
                      })
                    ) : (
                      <>
                        <Typography
                          variant="h2"
                          gutterBottom
                          className={classes.appointmentEmptyState}
                        >
                          No Reports Found
                        </Typography>
                      </>
                    )}
                  </Box>
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

export default EmergencyAvailable;

type DailogForUploadingProfileImageProps = {
  open: boolean;
  handleClose: () => void;
};

const DailogForUploadingProfileImage = ({
  open,
  handleClose,
}: DailogForUploadingProfileImageProps) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: reportsInitailValues,
    validationSchema: reportsValidationSchema,
    onSubmit: (values) => {},
  });

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
      "application/pdf": [".pdf", ".doc", ".docx"],
    },
  };

  const uploadFileToFirebase = async () => {
    if (!file) return;
    const fileRef = storageRef(
      `usersReports/${file.name}-${Date.now()}-${uuid.generate()}`
    );
    setLoading(true);
    uploadBytes(fileRef, file)
      .then(async (snapshot) => {
        dispatch({
          type: UPDATE_PATIENT_REPORTS,
          payload: {
            reportName: formik.values.reportName,
            reportUrl: await uploadUrl(snapshot.ref),
            reportedBy: formik.values.reportBy,
            issuedAt: formik.values.issuedAt,
          },
          setLoading,
        });
      })
      .catch((err) => {
        toastMessages({
          type: "error",
          message: "Error in uploading Report image",
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
            maxWidth: "700px",
            borderRadius: "10px",
            height: "100%",
            maxHeight: "540px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" className={classes.dailogTitle}>
          Upload Report
        </DialogTitle>
        <DialogContent>
          <Box>
            <form action="">
              <Box className={classes.inputContainer}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  placeholder="Report Name"
                  variant="outlined"
                  name="reportName"
                  value={formik.values.reportName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.reportName &&
                    Boolean(formik.errors.reportName)
                  }
                  helperText={
                    formik.touched.reportName && formik.errors.reportName
                  }
                  className={classes.input}
                />
              </Box>
              <Box className={classes.inputContainer}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  placeholder="Hospital or Doctor Name"
                  variant="outlined"
                  name="reportBy"
                  value={formik.values.reportBy}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.reportBy && Boolean(formik.errors.reportBy)
                  }
                  helperText={formik.touched.reportBy && formik.errors.reportBy}
                  className={classes.input}
                />
              </Box>
              <Box className={classes.inputContainer}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  placeholder="Issued At"
                  variant="outlined"
                  name="issuedAt"
                  type="date"
                  // disable all future dates
                  InputProps={{
                    inputProps: {
                      max: new Date().toISOString().split("T")[0],
                    },
                  }}
                  value={formik.values.issuedAt}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.issuedAt && Boolean(formik.errors.issuedAt)
                  }
                  helperText={formik.touched.issuedAt && formik.errors.issuedAt}
                  className={classes.input}
                />
              </Box>
            </form>
          </Box>
          <Box>
            <Dropzone config={dropzoneConfig} setFile={setFile} />
          </Box>
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

const reportsInitailValues = {
  reportName: "",
  reportBy: "",
  issuedAt: "",
  reportUrl: "",
};

const reportsValidationSchema = yup.object({
  reportName: yup.string().required("Report Name is required"),
  reportBy: yup.string().required("Report By is required"),
  issuedAt: yup.string().required("Issued At is required"),
  reportUrl: yup.string().required("Report Url is required"),
});
