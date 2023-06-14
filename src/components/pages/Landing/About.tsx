import { Box, Typography, Grid, Paper } from "@mui/material";
import commonClasses from "./styles/common.module.scss";
import classes from "./styles/about.module.scss";
import heroImg from "../../../assets/about_hero.svg";

function About() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <section className={`${commonClasses.marginLeftRight}`}>
        <div className={classes.container}>
          <Box component="div" className={classes.aboutHead}>
            <Typography variant="h2" component="h2" gutterBottom={false}>
              About Us<span>.</span>
            </Typography>
            <Typography component="p">
              <span>
                <strong>H</strong>ealthcare
              </span>{" "}
              <span>
                <strong>O</strong>ptimizers
              </span>{" "}
              <span>
                <strong>P</strong>artners
              </span>{" "}
              <span>
                <strong>E</strong>ngineers
              </span>
            </Typography>
          </Box>
          <Box component="div" className={classes.aboutMain}>
            <Paper sx={{ margin: { xs: "0", sm: "0 20px" } }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box component="div" className={classes.heroImgContainer}>
                    {/* <Box
                    component="img"
                    src={heroPlus}
                    alt="hero"
                    className={`${classes.heroPlus} ${classes.floating}`}
                  /> */}
                    <Box
                      component="img"
                      src={heroImg}
                      alt="hero"
                      className={classes.heroImg}
                    />
                    {/* <Box
                    component="img"
                    src={heroHeart}
                    alt="hero"
                    className={`${classes.heroHeart} ${classes.floating}`}
                  /> */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    component="div"
                    className={`${classes.heroMainContainer}`}
                  >
                    <Box component="section">
                      <Typography variant="h1" component="h1">
                        Our Goal<span>.</span>
                      </Typography>
                      <Typography variant="h4" component="h4">
                        Health as a first priority
                      </Typography>
                      <Typography variant="body2" component="p">
                        Our goal is to connect patients with their preferred
                        doctors on an online platform, enabling secure sharing
                        of health information. Patients can choose doctors based
                        on specialization and experience, leading to
                        personalized medical consultations and improved
                        healthcare accessibility.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </div>
      </section>
    </Box>
  );
}

export default About;
