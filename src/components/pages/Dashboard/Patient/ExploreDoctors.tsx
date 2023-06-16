import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Divider,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_PATIENT_DOCTORS_EXPLORE_DATA,
  UPDATE_NEW_CHAT_WITH_DOCTOR,
} from "../../../../store/actions";
import { useNavigate } from "react-router-dom";
import classes from "../styles/explore.module.scss";
import wideRangeDoctors from "../../../../assets/range_doctors.svg";
import CircularProgress from "@mui/material/CircularProgress";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import useDebounce from "../../../../hooks/useDebounce";
import StarRatings from "react-star-ratings";

function ExploreDoctors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const common =
    useSelector((state: any) => state.commonData.patientDoctorsExploreData) ||
    [];

  useEffect(() => {
    dispatch({
      type: GET_PATIENT_DOCTORS_EXPLORE_DATA,
      payload: {
        search: "",
      },
      setLoading,
    });
  }, []);
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: GET_PATIENT_DOCTORS_EXPLORE_DATA,
      payload: {
        search: debouncedSearch,
      },
      setLoading,
    });
  }, [debouncedSearch]);

  const handleAddDoctorToChat = (id: string) => {
    dispatch({
      type: UPDATE_NEW_CHAT_WITH_DOCTOR,
      payload: {
        dId: id,
      },
      navigate: (path: string = "/patient/dashboard/chat/to-doctor") =>
        navigate(path),
      setLoading,
    });
  };

  const handleSearchBox = (value: string) => {
    if (value === "") return setSearch(value)
    setSearch(value);
  };

  const doctorsList = useMemo(() => {
    if (common.length === 0)
      return (
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
              margin: "2rem",
              font: "600 1.5rem 'Manrope', sans-serif",
            }}
          >
            No Doctors Found {search && `for "${search}"`}
          </Typography>
        </Box>
      );
    return common.map((item: any) => {
      return (
        <Grid
          item
          md={12}
          lg={6}
          key={item._id}
          alignItems="center"
          sx={{
            width: "100%",
          }}
        >
          <Paper elevation={3}>
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
                    <span> {item.experience} years</span> of experience
                  </Typography>
                  <Typography variant="h6">
                    <StarRatings
                      rating={item.rating}
                      starRatedColor="#633ed8"
                      numberOfStars={5}
                      name="rating"
                      starDimension="25px"
                      starSpacing="clamp(1px, 0.5vw, 2px)"
                    />
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Divider />
                <Box className={classes.doctorDetailsBtnContainer}>
                  <Button onClick={() => handleAddDoctorToChat(item._id)}>
                    Message
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      );
    });
  }, [common]);

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
                      <span>B</span>est <span>d</span>octors for you
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      Search from a <span>wide</span> range of doctors and
                      <span> message</span> them directly <span>.</span>
                    </Typography>
                  </Box>
                </Box>
                <Box className={classes.mainHeroBannerContainer}>
                  <Box component="img" src={wideRangeDoctors} alt="doctors" />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <TextField
                className={classes.searchBarInput}
                id="outlined-basic"
                placeholder="Search Doctors by Speciality, Qualification"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => handleSearchBox(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "2px solid #633ed8",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ManageSearchIcon sx={{ color: "#633ed8" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            {loading ? (
              <>
                <CircularProgress
                  sx={{
                    position: "absolute",
                    top: "80%",
                    left: "55%",
                    marginTop: "-50px",
                    marginLeft: "-50px",
                    color: "#633ed8",
                  }}
                />
              </>
            ) : (
              doctorsList
            )}
          </Grid>
        </Grid>
      </section>
    </Box>
  );
}

export default ExploreDoctors;
