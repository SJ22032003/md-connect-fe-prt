import { user_type } from "../constant/user";

const handleLogout = (type: string) => {
  const { PATIENT, DOCTOR, ADMIN } = user_type;
  switch (type) {
    case PATIENT:
      localStorage.removeItem(PATIENT);
      localStorage.removeItem("user_type_as");
      break;
    case DOCTOR:
      localStorage.removeItem(DOCTOR);
      localStorage.removeItem("user_type_as");
      break;
    case ADMIN:
      localStorage.removeItem(ADMIN);
      localStorage.removeItem("user_type_as");
      break;
    default:
      localStorage.clear();
      break;
  }
  // redirect to landing page
  return (window.location.href = "/");
};

export default handleLogout;
