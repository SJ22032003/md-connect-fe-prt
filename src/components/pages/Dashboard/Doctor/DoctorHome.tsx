import { useEffect } from "react";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/date";
import { GET_DOCTOR_DATA } from "../../../../store/actions";
import classes from "../styles/home.module.scss";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import homeHeroBanner from "../../../../assets/doctor_dashboard_home.svg";
import homeThirdBanner from "../../../../assets/third_banner_home.svg";

function DoctorHome() {
  const dispatch = useDispatch();

  const { name, appointment = [] } = useSelector(
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
                      Hey {name}, <br /> your <span>P</span>atients are waiting
                      <span>.</span>
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      Reply to your patients and create{" "}
                      <span>appointments</span> with them.
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
          <Grid item xs={12} md={4}>
            <Paper elevation={3}>
              <Box component="div" className={classes.appointmentContainer}>
                <Typography variant="h3" gutterBottom>
                  Your <span>Appointments</span>
                </Typography>
                <Box>
                  {appointment.length > 0 ? (
                    appointment.map((item: any) => {
                      const {
                        appointmentDate,
                        appointementUrl,
                        appointmentTitle,
                        patientId,
                      } = item;
                      const { name } = patientId;
                      return (
                        <Box>
                          <Box
                            key={item._id}
                            className={classes.appointmentCard}
                          >
                            <Typography variant="h4" gutterBottom>
                              For {name}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                              Meeting for {appointmentTitle}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                              On <span>{formatDate(appointmentDate)}</span>
                            </Typography>
                          </Box>
                          <Box>
                            <Button
                              onClick={() => joinMeeting(appointementUrl)}
                            >
                              Join
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
                        No Appointments
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3}>
              <Box component="div" className={classes.profileContainer}>
                <Box>
                  <Typography variant="h3" gutterBottom>
                    Update your <span>profile</span>
                  </Typography>
                  <Box>
                    <Link to="/doctor/dashboard/profile">
                      <Button>Click Here</Button>
                    </Link>
                  </Box>
                </Box>
                <Box className={classes.profileBannerContainer}>
                  <Box
                    component="img"
                    src={homeThirdBanner}
                    alt="home third banner"
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </section>
    </Box>
  );
}

export default DoctorHome;
