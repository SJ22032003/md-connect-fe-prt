import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_EMERGENCY_AVAILABLE_DOCTORS, UPDATE_NEW_CHAT_WITH_DOCTOR } from "../../../../store/actions";
import classes from "../styles/explore.module.scss";
import Loader from "../../../../components/common/Loader";

function EmergencyAvailable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch({
      type: GET_EMERGENCY_AVAILABLE_DOCTORS,
      setData,
      setLoading,
    });
  }, []);

  const handleAddDoctorToChat = (id: string) => {
    dispatch({
      type: UPDATE_NEW_CHAT_WITH_DOCTOR,
      payload: {
        dId: id,
      },
      navigate: (path: string = "/patient/dashboard/chat/to-doctor") => navigate(path),
    });
  };

  if (loading) {
    return <Loader />;
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
                        <span>U</span>rgent help ?
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        These doctors are currently active right now.{" "}
                        <span>Message</span> them.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              {data && data.length ? (
                data.map((item: any) => (
                  <Paper elevation={3} key={item._id} sx={{margin: "1rem 0"}}>
                    <Box className={classes.doctorMainDetailsContainer}>
                      <Box className={classes.doctorMainBelowDetailsContainer}>
                        <Box className={classes.avatarContainer}>
                          <Avatar
                            alt="doctor image"
                            src={item.profileImage}
                            sx={{
                              width: "clamp(100px, 16vw, 150px)",
                              height: "clamp(100px, 16vw, 150px)",
                            }}
                          />
                        </Box>
                        <Box className={classes.doctorDetailsContainer}>
                          <Typography variant="h4">{item.name}</Typography>
                          <Typography variant="h5">{item.speciality}</Typography>
                          <Typography variant="h5">{item.qualification}</Typography>
                          <Typography variant="h6">
                           Available <span>right now</span> for you
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Divider />
                        <Box className={classes.doctorDetailsBtnContainer}>
                          <Button onClick={() => handleAddDoctorToChat(item._id)}>
                            Message Now
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))
              ) : (
                <>
                  <Typography variant="h4" gutterBottom>
                    No doctors are available right now.
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        </section>
      </Box>
    </>
  );
}

export default EmergencyAvailable;
