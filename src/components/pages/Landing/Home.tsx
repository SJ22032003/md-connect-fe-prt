import { Box, Paper, Typography, Grid, Divider } from "@mui/material";
import commonClasses from "./styles/common.module.scss";
import classes from "./styles/home.module.scss";
import heroImg from "../../../assets/main_hero_img.svg";
import heroPlus from "../../../assets/hero_plus.svg";
import heroHeart from "../../../assets/hero_heart.svg";

function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <section className={`${commonClasses.marginLeftRight}`}>
        <div className={classes.container}>
          <Paper sx={{ margin: { xs: "0", sm: "0 20px" } }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box component="div" className={`${classes.heroMainContainer}`}>
                  <Box component="section">
                    <Typography variant="h1" component="h1">
                      Medi Connect<span>.</span>
                    </Typography>
                    <Typography variant="h4" component="h4">
                      Your health is our priority
                    </Typography>
                    <Typography variant="body2" component="p">
                      Best in class healthcare services to the most remote areas
                      now possible with Medi Connect
                    </Typography>
                    <Box component="section">
                      <Box component="div" className={classes.heroBtnContainer}>
                        <button className={classes.heroServiceBtn}>
                          <a href="#service">Service</a>
                        </button>
                        <button className={classes.heroAboutBtn}><a href="#about">About</a></button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box component="div" className={classes.heroImgContainer}>
                  <Box
                    component="img"
                    src={heroPlus}
                    alt="hero"
                    className={`${classes.heroPlus} ${classes.floating}`}
                  />
                  <Box
                    component="img"
                    src={heroImg}
                    alt="hero"
                    className={classes.heroImg}
                  />
                  <Box
                    component="img"
                    src={heroHeart}
                    alt="hero"
                    className={`${classes.heroHeart} ${classes.floating}`}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <div className={classes.mainSubSection}>
            <Box component="center" className={classes.mainSubSectionContent}>
              <Typography variant="h4" component="h4" gutterBottom>
                Connect patients with doctors
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Our solution is an online platform that allows patients to sign
                up and securely share their health information, including
                documents and reports. Simultaneously, doctors can create
                profiles and browse through patient profiles and health records
                on a centralized dashboard. Patient identities remain
                undisclosed until the doctor is selected by the patient.
              </Typography>
              <Divider className={classes.subSectionDivider} />
            </Box>
          </div>
        </div>
      </section>
    </Box>
  );
}

export default Home;
