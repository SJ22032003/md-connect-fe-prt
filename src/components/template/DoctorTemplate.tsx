import { ReactNode } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { doctorSideBarItems } from "../../constant/constant";
import { user_type } from "../../constant/user";
import ResponsiveDrawer from "../common/Sidebar";

interface PatientTemplateProps {
  children: ReactNode;
}

function DoctorTemplate({ children }: PatientTemplateProps) {
  const doctorData =
    useSelector((state: any) => state.userData.doctorInfo) || {};

  return (
    <Box
      sx={{
        display: "flex",
        width: "auto",
        minHeight: "100vh",
        backgroundColor: "#f3f3f3",
      }}
    >
      <ResponsiveDrawer data={doctorData} menuItems={doctorSideBarItems} userType={user_type.DOCTOR}>
        {children}
      </ResponsiveDrawer>
    </Box>
  );
}

export default DoctorTemplate;
