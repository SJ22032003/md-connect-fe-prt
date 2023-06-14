import { useState } from "react";
import classes from "./styles.module.scss";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { formatDate } from "../../../utils/date";

function PatientAcceptAppointmentModal({
  open,
  handleClose,
  patientAppointmentData,
  handleMessageSentToSocket,
  acceptAppointmentBookingFromDoctor
}: any) {
  const [loading, setLoading] = useState(false);

  const { appointmentTitle, appointmentOn } = patientAppointmentData || {};

  const handleAppointmentAcceptance = () => {
    acceptAppointmentBookingFromDoctor(patientAppointmentData)
    handleClose()
  };

  const closeModal = () => {
    const messageForDoctor = "PATIENT HAS DECLINED APPOINTMENT REQUEST";
    handleMessageSentToSocket(messageForDoctor)
    handleClose();
  };


  return (
    <div>
      <Dialog
        open={open}
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
          Accept Appointment ?
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className={classes.dailogTextContainer}>
                <Typography variant="h3">
                  Doctor has setup an appointment with you.
                </Typography>
                <Typography component="p">
                  Its about <span>{appointmentTitle}</span> on{" "}
                  <span>{formatDate(appointmentOn)}</span>
                  <br />
                  Please accept the appointment to continue.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.dailogBtnContainer}>
          <Button disabled={loading}
            onClick={() => handleAppointmentAcceptance()}
          >Accept</Button>
          <Button onClick={closeModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PatientAcceptAppointmentModal;
