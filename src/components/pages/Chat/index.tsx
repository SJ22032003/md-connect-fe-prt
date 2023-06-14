import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GET_PATIENT_MESSAGE_LIST,
  GET_DOCTOR_MESSAGE_LIST,
  GET_USER_CHATS,
  UPDATE_DOCTOR_PATIENT_APPOINTMENT,
} from "../../../store/actions";
import classes from "./styles.module.scss";
import ChatSidebar from "./ChatSidebar";
import ChatMessageBox from "./ChatMessageBox";
import socketClient from "../../../config/socket.config";
import Loader from "../../common/Loader";
import DoctorAppointmentModal from "./DoctorAppointmentModal";
import PatientAcceptAppointmentModal from "./PatientAcceptAppointmentModal";

function index() {
  const dispatch = useDispatch();
  const socket = socketClient();

  const [sideBarMessageToList, setSideBarMessageToList] = useState([]);
  const [messageAreaTopData, setMessageAreaTopData] = useState({});

  const [sideBarLoading, setSideBarLoading] = useState(true);
  const [messageAreaLoading, setMessageAreaLoading] = useState(true);

  const [room, setRoom] = useState("");
  const [chatBetweenUsers, setChatBetweenUsers] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const [openDoctorBookingModal, setDoctorBookingModal] = useState(false);
  const [doctorAppointmentToPatient, setDoctorAppointmentToPatient] =
    useState(false);
  const [patientAppointmentData, setPatientAppointmentData] = useState<any>({});

  const type = localStorage.getItem("user_type_as");

  // GET ALL THE USER MESSAGED TO LIST
  const dispatchCall = (type: string) => {
    dispatch({
      type,
      setData: setSideBarMessageToList,
      setLoading: setSideBarLoading,
    });
  };
  useEffect(() => {
    switch (type) {
      case "d":
        dispatchCall(GET_DOCTOR_MESSAGE_LIST);
        break;
      case "p":
        dispatchCall(GET_PATIENT_MESSAGE_LIST);
        break;
      default:
        break;
    }
  }, []);

  // DEFAULT SELECTED DATA FOR SIDEBAR
  useEffect(() => {
    if (sideBarMessageToList.length) {
      const { pId, dId, roomId } = sideBarMessageToList[0];
      setMessageAreaTopData(pId || dId);
      setRoom(roomId);
    }
  }, [sideBarMessageToList]);

  // GET CHAT BETWEEN TWO USER BASED ON ROOM_ID
  useEffect(() => {
    setMessageAreaLoading(true);
    if (room) {
      dispatch({
        type: GET_USER_CHATS,
        setData: setChatBetweenUsers,
        setLoading: setMessageAreaLoading,
        payload: {
          roomId: room,
        },
      });
      socket.emit("JOIN", room);
    }
  }, [room]);

  const handleMessageSentToSocket = async (message: string, data?: {}) => {
    if (!room) return;
    const roomData = room.split("-");
    const [pId, dId] = [roomData[0], roomData[1]];
    const messageData = {
      chat: message,
      roomId: room,
      from: type,
      fromId: type === "p" ? pId : dId,
      toId: type === "p" ? dId : pId,
      ...(data && {
        appointmentData: data,
      }),
    };
    await socket.emit("MESSAGE", room, messageData);
    setMessage("");
  };

  // UPDATE CHAT BETWEEN USER LIST WHEN RECIEVING MESSAGE
  const handleMessage = (message: any) => {
    setChatBetweenUsers((prevMessageList: any[]) => [
      ...prevMessageList,
      message,
    ]);
    console.log("message", message);
    if (message.appointmentData) {
      setDoctorAppointmentToPatient(true);
      setPatientAppointmentData(message.appointmentData);
    }
  };
  useEffect(() => {
    socket.on("MESSAGE", handleMessage);
    return () => {};
  }, [socket]);

  if (!sideBarMessageToList || !type || !chatBetweenUsers) {
    return <Loader />;
  }

  // -----------------------------------------------------------------
  // FOR BOOKING

  const acceptAppointmentBookingFromDoctor = async (appointmentData: any) => {
    const doctorId = room.split("-")[1];
    console.log("doctorId", doctorId, appointmentData);
    dispatch({
      type: UPDATE_DOCTOR_PATIENT_APPOINTMENT,
      payload: {
        dId: doctorId,
        data: appointmentData,
      },
      fn: () => handleMessageSentToSocket("APPOINTMENT ACCEPTED"),
    });
    setDoctorAppointmentToPatient(false);
  };

  const ModalToShowUpToRespectiveUser = () => {
    switch (type) {
      case "d":
        return (
          <DoctorAppointmentModal
            open={openDoctorBookingModal}
            handleClose={() => setDoctorBookingModal(false)}
            handleMessageSentToSocket={handleMessageSentToSocket}
          />
        );
      case "p":
        return (
          <PatientAcceptAppointmentModal
            open={doctorAppointmentToPatient}
            handleClose={() => setDoctorAppointmentToPatient(false)}
            patientAppointmentData={patientAppointmentData}
            handleMessageSentToSocket={handleMessageSentToSocket}
            acceptAppointmentBookingFromDoctor={acceptAppointmentBookingFromDoctor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <section className={classes.container}>
          <Grid container spacing={2} alignItems="center">
            <ChatSidebar
              sideBarLoading={sideBarLoading}
              sideBarMessageToList={sideBarMessageToList}
              userType={type || ""}
              setMessageAreaTopData={setMessageAreaTopData}
              messageAreaTopData={messageAreaTopData}
              setRoom={setRoom}
            />
            <ChatMessageBox
              messageAreaTopData={messageAreaTopData}
              userType={type || ""}
              chatBetweenUsers={chatBetweenUsers}
              setChatBetweenUsers={setChatBetweenUsers}
              handleMessageSentToSocket={handleMessageSentToSocket}
              messageAreaLoading={messageAreaLoading}
              message={message}
              setMessage={setMessage}
              setDoctorBookingModal={setDoctorBookingModal}
            />
          </Grid>
        </section>
      </Box>
      <ModalToShowUpToRespectiveUser />
    </>
  );
}

export default index;
