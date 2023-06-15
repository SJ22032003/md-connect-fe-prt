import { Box, Typography } from "@mui/material";
import commonClasses from "./styles/common.module.scss";
import classes from "./styles/footer.module.scss";

function Footer() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#dbdbdb",
      }}
    >
      <section className={`${commonClasses.marginLeftRight}`}>
        <div className={classes.container}>
          <Box className={classes.footerContainer}>
            <Typography component="p" gutterBottom={false}>
              © 2023 Medi Connect | All Rights Reserved
            </Typography>

            <Typography component="p" gutterBottom={false}>
              Made by Team BITWISE
            </Typography>
          </Box>
        </div>
      </section>
    </Box>
  );
}

export default Footer;
