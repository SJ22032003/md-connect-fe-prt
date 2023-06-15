import { useMemo, useState } from "react";
import { Box, AppBar, Toolbar, Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import mainLogo from "../../../assets/main_logo.png";
import classes from "./styles/navbar.module.scss";
import commonClasses from "./styles/common.module.scss";
import MenuIcon from "@mui/icons-material/Menu";


function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const token = useMemo(() => {
    return {
      patient_token:
        JSON.parse(localStorage.getItem("patient") || "{}")?.auth_token || null,
      doctor_token:
        JSON.parse(localStorage.getItem("doctor") || "{}")?.auth_token || null,
    };
  }, []);

  const handleRedirection = () => {
    if (token.patient_token) {
      navigate("/patient/dashboard/home");
    } else if (token.doctor_token) {
      navigate("/doctor/dashboard/home");
    } else {
      navigate("/signin");
    }
  };

  const navMenuList = useMemo(() => {
    return landingPageNavItems.map((item, index) => {
      const { type, link, name } = item;
      switch (type) {
        case "section":
          return (
            <li key={index}>
              <a href={`#${link}`}>{name}</a>
            </li>
          );
        case "button":
          return (
            <li key={index}>
              <button onClick={handleRedirection} className={classes.loginBtn}>
                {name}
              </button>
            </li>
          );
      }
    });
  }, []);

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
            <Grid item xs={3}>
              <Box
                component="img"
                src={mainLogo}
                sx={{ width: 50, height: 50 }}
                alt="logo"
              />
            </Grid>
            <Grid item xs={9}>
                <ul className={classes.navMenuList}>{navMenuList}</ul>
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
    type: "section",
  },
  {
    name: "Service",
    link: "service",
    type: "section",
  },
  {
    name: "About",
    link: "about",
    type: "section",
  },
  {
    name: "Login",
    type: "button",
  }, 
];
