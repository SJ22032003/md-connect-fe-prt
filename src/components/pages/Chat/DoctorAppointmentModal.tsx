import { useState } from "react";
import classes from "./styles.module.scss";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DuoIcon from "@mui/icons-material/Duo";
import { useFormik } from "formik";
import * as yup from "yup";

function DoctorAppointmentModal({
  open,
  handleClose,
  handleMessageSentToSocket
}: any) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleMessageSentToSocket("DOCTOR HAS SENT YOU AN APPOINTMENT 👨‍⚕️", values);
      closeModal();
    },
  });

  const closeModal = () => {
    handleClose();
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
            maxHeight: "380px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" className={classes.dailogTitle}>
          Create Appointment
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2} className={classes.profileInput}>
              <Grid item xs={12} sm={12}>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Appointment Title"
                  className={classes.TextField}
                  name="appointmentTitle"
                  onChange={formik.handleChange}
                  value={formik.values.appointmentTitle}
                  error={
                    formik.touched.appointmentTitle &&
                    Boolean(formik.errors.appointmentTitle)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Appointment Link"
                  className={classes.TextField}
                  name="appointmentLink"
                  onChange={formik.handleChange}
                  value={formik.values.appointmentLink}
                  error={
                    formik.touched.appointmentLink &&
                    Boolean(formik.errors.appointmentLink)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  type="date"
                  fullWidth
                  placeholder="Appointment Date"
                  className={classes.TextField}
                  name="appointmentOn"
                  onChange={formik.handleChange}
                  value={formik.values.appointmentOn}
                  error={
                    formik.touched.appointmentOn &&
                    Boolean(formik.errors.appointmentOn)
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.dailogBtnContainer}>
            <Button type="submit" endIcon={<DuoIcon />} disabled={loading}>
              {loading ? (
                <CircularProgress
                  size={20}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Book"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default DoctorAppointmentModal;

const initialValues = {
  appointmentTitle: "",
  appointmentOn: "",
  appointmentLink: "",
};

const validationSchema = yup.object({
  appointmentTitle: yup.string().required(),
  appointmentOn: yup.date().required(),
  appointmentLink: yup.string().required(),
});
