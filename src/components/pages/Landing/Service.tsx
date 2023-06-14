import { useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import commonClasses from "./styles/common.module.scss";
import classes from "./styles/service.module.scss";
import connectToDoctors from "../../../assets/service_connect.png";
import chooseDoctors from "../../../assets/service_choose.png";
import bookAppointment from "../../../assets/service_appointments.png";
import prescriptons from "../../../assets/service_prescription.svg";
import medicalRecords from "../../../assets/service_reports.svg";

function Service() {
  const serviceCards = useMemo(() => {
    return serviceCardsContent.map((item) => {
      return (
        <Grid
          item
          xs={12}
          md={4}
          key={item.id}
          className={classes.serviceCardContainer}
        >
          {item?.type === "join-now" ? (
            <Box className={classes.serviceJoinNow}>
              <Typography variant="h5">{item.title}</Typography>
              <Typography component="p">{item.description}</Typography>
              <Link to="/signin">
                <button className={classes.serviceCardButton}>
                  <span>Join Now</span>
                </button>
              </Link>
            </Box>
          ) : (
            <Card sx={{ maxWidth: 375 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                sx={{
                  objectFit: "contain",
                }}
                image={item.image}
              />
              <CardContent className={classes.seriveCardContent}>
                <Typography gutterBottom variant="h5">
                  {item.title}
                </Typography>
                <Typography component="p">{item.description}</Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      );
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <section className={`${commonClasses.marginLeftRight}`}>
        <div className={classes.container}>
          <Box component="div" className={classes.serviceHead}>
            <Typography variant="h2" component="h2" gutterBottom={false}>
              Our Services<span>.</span>
            </Typography>
            <Typography variant="body2" component="p">
              See what our platform has to offer to patients and doctors
            </Typography>
          </Box>
          <Box component="div" className={classes.serviceMain}>
            <Grid container spacing={2} alignItems="center">
              {serviceCards}
            </Grid>
          </Box>
        </div>
      </section>
    </Box>
  );
}

export default Service;

const serviceCardsContent = [
  {
    id: 1,
    title: "Connect to Doctors and Hospitals",
    description:
      "With real time chat functionality, connect to doctors and hospitals with ease and get your queries answered in no time.",
    image: connectToDoctors,
  },
  {
    id: 2,
    title: "Choose your own Doctor",
    description:
      "Wide range of doctors to choose from, with their specialities and experience listed on their profile.",
    image: chooseDoctors,
  },
  {
    id: 3,
    title: "Book Appointments",
    image: bookAppointment,
    description:
      "Book appointments with your doctor and get notified when your appointment is confirmed.",
  },
  {
    id: 4,
    title: "Get Prescriptions",
    image: prescriptons,
    description:
      "Get prescriptions from your doctor and get notified when your prescription is ready.",
  },
  {
    id: 5,
    title: "Get your Reports",
    image: medicalRecords,
    description: "Get your reports from your doctor and get notified.",
  },
  {
    id: 6,
    type: "join-now",
    title: "Medi Connect",
    description:
      "With 5000+ doctors, 100+ hospitals and 10000+ trusted patients connected, join Medi Connect now and get the best healthcare services at your fingertips.",
  },
];
