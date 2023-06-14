import { useMemo } from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./styles.module.scss";

type TChatSidebarProp = {
  sideBarLoading: boolean;
  sideBarMessageToList: any;
  userType: string;
  setMessageAreaTopData: any;
  messageAreaTopData: any;
  setRoom: any;
};

function ChatSidebar({
  sideBarLoading,
  sideBarMessageToList,
  userType,
  setMessageAreaTopData,
  messageAreaTopData,
  setRoom,
}: TChatSidebarProp) {
  const handleMessageBoxData = (dataForMessages: {}, roomId: string) => {
    setMessageAreaTopData(dataForMessages);
    setRoom(roomId);
  };

  // MEMOIZING SIDEBAR DATA UNTIL CHANGE REQUIRED
  const sideBarMessageList = useMemo(() => {
    if (sideBarMessageToList.length === 0) {
      const linkTo = userType === "p" ? "/patient/dashboard/explore-doctors" : "/doctor/dashboard/appointments";
      return (
        <Box className={classes.exploreContainer}>
          <Link to={linkTo}>
            <Button>Explore</Button>
          </Link>
        </Box>
      );
    }
    return sideBarMessageToList.map((item: any) => {
      const { pId, dId, roomId } = item;
      const { _id, name, profileImage } = pId || dId;
      const { _id: userId } = messageAreaTopData;

      return (
        <Box
          key={_id}
          onClick={() => handleMessageBoxData(pId || dId, roomId)}
          sx={{
            backgroundColor: userId === _id ? "#633ed8" : "#fff",
            color: userId === _id ? "#fff" : "#000",
          }}
        >
          <Avatar
            alt={name}
            src={profileImage}
            sx={{ width: 60, height: 60 }}
          />
          <Box>
            <Typography variant="h6">{name}</Typography>
          </Box>
        </Box>
      );
    });
  }, [sideBarMessageToList, messageAreaTopData]);

  return (
    <>
      <Grid item xs={12} md={6} lg={3}>
        <Paper
          elevation={3}
          sx={{ height: { md: "calc(100vh - 120px)", xs: "fit-content" } }}
        >
          <Box className={classes.sideBarContainer}>
            <Box className={classes.sideBarHeader}>
              <Typography variant="h4">Chats</Typography>
              <Typography component="p">
                Your chats with{" "}
                <span>{userType === "d" ? "Patients" : "Doctors"}</span>
              </Typography>
            </Box>
            <Divider />
            <Box
              className={classes.sideBarList}
              sx={{
                maxHeight: "calc(100vh - 260px)",
                overflowY: "auto",
              }}
            >
              {sideBarLoading ? (
                <Box component="aside">
                  <CircularProgress sx={{ color: "#633ed8" }} />
                </Box>
              ) : (
                sideBarMessageList
              )}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default ChatSidebar;
