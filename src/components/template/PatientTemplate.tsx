import { ReactNode } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { patientSideBarItems } from "../../constant/constant";
import { user_type } from "../../constant/user";
import ResponsiveDrawer from "../common/Sidebar";

interface PatientTemplateProps {
  children: ReactNode;
}

function PatientTemplate({ children }: PatientTemplateProps) {
  const patientData =
    useSelector((state: any) => state.userData.patientInfo) || {};

  return (
    <Box
      sx={{
        display: "flex",
        width: "auto",
        minHeight: "100vh",
        backgroundColor: "#f3f3f3",
      }}
    >
      <ResponsiveDrawer data={patientData} menuItems={patientSideBarItems} userType={user_type.PATIENT}>
        {children}
      </ResponsiveDrawer>
    </Box>
  );
}

export default PatientTemplate;
