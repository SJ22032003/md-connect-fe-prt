import HomeIcon from "@mui/icons-material/Home";
import FaceIcon from "@mui/icons-material/Face";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MessageIcon from "@mui/icons-material/Message";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

export const patientSideBarItems = [
  {
    id: "home",
    name: "Home",
    redirect: "/patient/dashboard/home",
    icon: <HomeIcon />,
  },
  {
    id: "profile",
    name: "Profile",
    redirect: "/patient/dashboard/profile",
    icon: <FaceIcon />,
  },
  {
    id: "report",
    name: "Report",
    redirect: "/patient/dashboard/report",
    icon: <AssessmentIcon />,
  },
  {
    id: "to-doctor",
    name: "Chat",
    redirect: "/patient/dashboard/chat/to-doctor",
    icon: <MessageIcon />,
  },
  {
    id: "emergency",
    name: "Urgent",
    redirect: "/patient/dashboard/emergency",
    icon: <BloodtypeIcon />,
  },
  {
    id: "explore-doctors",
    name: "Explore Doctors",
    redirect: "/patient/dashboard/explore-doctors",
    icon: <LocalHospitalIcon />,
  },
];

export const doctorSideBarItems = [
  {
    id: "home",
    name: "Home",
    redirect: "/doctor/dashboard/home",
    icon: <HomeIcon />,
  },
  {
    id: "profile",
    name: "Profile",
    redirect: "/doctor/dashboard/profile",
    icon: <FaceIcon />,
  },
  {
    id: "to-patients",
    name: "Chat",
    redirect: "/doctor/dashboard/chat/to-patients",
    icon: <MessageIcon />,
  },
  {
    id: "appointments",
    name: "Appointments",
    redirect: "/doctor/dashboard/appointments",
    icon: <LocalHospitalIcon />,
  }
];
