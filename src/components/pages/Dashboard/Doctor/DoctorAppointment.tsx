import { useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/date";
import { GET_DOCTOR_DATA } from "../../../../store/actions";
import classes from "../styles/appointment.module.scss";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import homeHeroBanner from "../../../../assets/appointments.svg";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";

function DoctorAppointment() {
  const dispatch = useDispatch();

  const { appointment = [] } = useSelector(
    (state: any) => state.userData.doctorInfo
  );
  useEffect(() => {
    dispatch({
      type: GET_DOCTOR_DATA,
    });
  }, []);

  const joinMeeting = (url: string) => {
    window.open(url, "_blank");
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

  const PatientReports = ({ report }: any) => {
    if (!report.length) {
      return ;
    }
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{
              font: "600 1rem Manrope, sans-sirf"
            }}
          >
           Patients Reports
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {report.length > 0 ? (
            <>
              {report.map((item: any) => {
                const { reportName, reportUrl, reportedBy, issuedAt } = item;
                return (
                  <>
                    <Box className={classes.accordionContainer}>
                      <Box>
                        <Typography variant="h5">{reportName}</Typography>
                        <Typography variant="h6">
                          from <span>{reportedBy}</span>
                        </Typography>
                        <Typography component="p">
                          Issued on <span>{formatDate(issuedAt)}</span>
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          onClick={() => downloadFile(reportUrl, reportName)}
                        >
                          <DownloadIcon />
                        </Button>
                      </Box>
                    </Box>
                  </>
                );
              })}
            </>
          ) : (
            <>No reports found</>
          )}
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <section className={classes.container}>
        <Grid container spacing={2}>
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
                      Your <span>A</span>ppointments
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      <span>Set</span> your appointments through chat with your{" "}
                      <span>patients</span>
                    </Typography>
                  </Box>
                  <Box className={classes.mainHeroBtnContainer}>
                    <Link to="/doctor/dashboard/chat/to-patients">
                      <Button endIcon={<LocalHospitalIcon />}>
                        Chat with patients
                      </Button>
                    </Link>
                  </Box>
                </Box>
                <Box className={classes.mainHeroBannerContainer}>
                  <Box
                    component="img"
                    src={homeHeroBanner}
                    alt="home hero banner"
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Box
                component="div"
                className={classes.mainHeadingReportContainer}
              >
                <Typography variant="h3" gutterBottom>
                  You can also <span>download</span> your <span>Patients</span>{" "}
                  reports here
                </Typography>
                <Box className={classes.appointmentContainerDoc}>
                  {appointment.length > 0 ? (
                    appointment.map((item: any) => {
                      const {
                        patientId,
                        appointementUrl,
                        appointmentDate,
                        appointmentTitle,
                        _id,
                      } = item;
                      const { name, profileImage, report } = patientId;
                      return (
                        <>
                          <Box key={_id}>
                            <Box className={classes.patientDetailsContainer}>
                              <Box className={classes.patientProfileData}>
                                <Box>
                                  <Avatar
                                    alt={name}
                                    src={profileImage}
                                    sx={{
                                      width: "100px",
                                      height: "100px",
                                    }}
                                  />
                                </Box>
                                <Box>
                                  <Typography variant="h4">{name}</Typography>
                                  <Button
                                    onClick={() => joinMeeting(appointementUrl)}
                                    endIcon={<GroupsIcon />}
                                  >
                                    Join
                                  </Button>
                                </Box>
                              </Box>
                              <Box
                                className={classes.patientMeetDetailContainer}
                              >
                                <Typography variant="h5">
                                  On <span>{formatDate(appointmentDate)}</span>
                                </Typography>
                                <Typography variant="h4">
                                  for <span>{appointmentTitle}</span>
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              <PatientReports report={report} />
                            </Box>
                          </Box>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <Typography
                        variant="h2"
                        gutterBottom
                        className={classes.appointmentEmptyState}
                      >
                        No Appointments Found
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
  );
}

export default DoctorAppointment;
