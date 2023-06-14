import { useMemo } from "react";
import { Box, AppBar, Toolbar, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import mainLogo from "../../../assets/main_logo.png";
import classes from "./styles/navbar.module.scss";
import commonClasses from "./styles/common.module.scss";

function Navbar() {
  const navigate = useNavigate();

  const navMenuList = useMemo(() => {
    return landingPageNavItems.map((item, index) => {
      return (
        <li key={index}>
          <a href={`#${item.link}`}>{item.name}</a>
        </li>
      );
    });
  }, []);

  const token = useMemo(() => {
    return {
      patient_token:
        JSON.parse(localStorage.getItem("patient") || "{}")?.auth_token ||
        null,
      doctor_token:
        JSON.parse(localStorage.getItem("doctor") || "{}")?.auth_token ||
        null,
    };
  }, []);

  const handleRedirection = () => {
  
    if (token.patient_token) {
      navigate("/patient/dashboard/home");
    } else if (token.doctor_token) {
      navigate("/doctor/dashboard/home");
    }else {
      navigate("/signin");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="sticky" className={classes.appBar}>
        <Toolbar className={commonClasses.marginLeftRight}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            className={`${classes.mainMenu}`}
          >
            <Grid item xs={4}>
              <Box
                component="img"
                src={mainLogo}
                sx={{ width: 50, height: 50 }}
                alt="logo"
              />
            </Grid>
            <Grid item xs={4}>
              <ul className={classes.navMenuList}>{navMenuList}</ul>
            </Grid>
            <Grid item xs={4}>
              <button onClick={handleRedirection} className={classes.loginBtn}>
                Login
              </button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;

const landingPageNavItems = [
  {
    name: "Home",
    link: "home",
  },
  {
    name: "Service",
    link: "service",
  },
  {
    name: "About",
    link: "about",
  },
];
