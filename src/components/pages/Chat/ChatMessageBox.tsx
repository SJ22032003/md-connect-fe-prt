import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Avatar,
  Button,
} from "@mui/material";
import { useRef, useEffect, useMemo } from "react";
import classes from "./styles.module.scss";
import notMessageFoundImg from "../../../assets/not_message.svg";
import CircularProgress from "@mui/material/CircularProgress";
import TelegramIcon from "@mui/icons-material/Telegram";
import DuoIcon from "@mui/icons-material/Duo";

type TChatBoxMessageProps = {
  messageAreaTopData: any;
  chatBetweenUsers: any;
  userType: string;
  setChatBetweenUsers: any;
  handleMessageSentToSocket: any;
  messageAreaLoading: boolean;
  message: string;
  setMessage: any;
  setDoctorBookingModal: any;
};

function ChatMessageBox({
  messageAreaTopData,
  userType,
  chatBetweenUsers,
  handleMessageSentToSocket,
  messageAreaLoading,
  message,
  setMessage,
  setDoctorBookingModal,
}: TChatBoxMessageProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const { _id, name, profileImage, speciality } = messageAreaTopData;

  useEffect(() => {
    scrollToBottom();
  }, [chatBetweenUsers, messageEndRef]);

  const handleMessageConnectionToSocket = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    handleMessageSentToSocket(message);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const chatBoxMessageList = useMemo(() => {
    if (chatBetweenUsers.length === 0) {
      return <Box className={classes.noMessageFound}>They are waiting....</Box>;
    }
    return chatBetweenUsers.map((item: any, index: number) => {
      const isCurrentUser = userType === item.from;
      const bgColor = isCurrentUser ? "#633ed8" : "rgb(2,0,36)";
      const color = "#fff";
      const textAlign = isCurrentUser ? "right" : "left";
      return (
        <Box
          key={index}
          className={classes.chatBoxMessageList}
          sx={{
            display: "flex",
            justifyContent: userType === item.from ? "flex-end" : "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            className={classes.chatBoxMessageContent}
            sx={{
              backgroundColor: bgColor,
              textAlign,
              color,
            }}
          >
            <Typography component="p">{item.chat}</Typography>
          </Box>
        </Box>
      );
    });
  }, [chatBetweenUsers]);

  return (
    <>
      <Grid item xs={12} md={6} lg={9}>
        <Paper
          elevation={3}
          sx={{
            height: "calc(100vh - 120px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {_id ? (
            <>
              <Box className={classes.chatBoxTopBar}>
                <Avatar
                  src={profileImage}
                  sx={{ width: 60, height: 60 }}
                  alt="Remy Sharp"
                />
                <Box>
                  <Typography variant="h6">{name}</Typography>
                  <Typography component="p">{speciality || ""}</Typography>
                </Box>
              </Box>
              <Box>
                <Box className={classes.chatBoxMessage}>
                  {messageAreaLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <CircularProgress sx={{ color: "#633ed8" }} />
                    </Box>
                  ) : (
                    chatBoxMessageList
                  )}
                  <div ref={messageEndRef}></div>
                </Box>
              </Box>
              <Box>
                <form onSubmit={handleMessageConnectionToSocket}>
                  <TextField
                    className={classes.chatBoxInput}
                    placeholder="Enter your message"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <Button
                          type="submit"
                          disabled={!message}
                          sx={{
                            backgroundColor: "#633ed8",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "#633ed8",
                            },
                          }}
                        >
                          <TelegramIcon />
                        </Button>
                      ),
                      ...(userType === "d" && {
                        startAdornment: (
                          <Button
                            title="Create appointment"
                            onClick={() => setDoctorBookingModal(true)}
                            sx={{
                              backgroundColor: "#633ed8",
                              color: "#fff",
                              "&:hover": {
                                backgroundColor: "#633ed8",
                              },
                            }}
                          >
                            <DuoIcon />
                          </Button>
                        ),
                      }),
                    }}
                  />
                </form>
              </Box>
            </>
          ) : (
            <>
              <Box className={classes.noMessageContainer}>
                <Box
                  component="img"
                  src={notMessageFoundImg}
                  alt="not messages found"
                />
              </Box>
            </>
          )}
        </Paper>
      </Grid>
    </>
  );
}

export default ChatMessageBox;
