import { useMemo } from "react";
import Loader from "../components/common/Loader";
import { Suspense } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import PatientTemplate from "../components/template/PatientTemplate";
import DoctorTemplate from "../components/template/DoctorTemplate";
import {
  LazyLandingPage,
  LazySignInPage,
  LazyPatientOnboardingPage,
  LazyPatientDashboardHome,
  LazyPatientDashboardProfile,
  LazyPatientDashboardReport,
  LazyPatientExploreDoctors,
  LazyChatPage,

  //-----------------//
  LazyDoctorOnboardingPage,
  LazyDoctorDashboardHome,
  LazyDoctorDashboardProfile,
  LazyDoctorDashboardAppointment
} from "./lazy.routes";


function Routing() {
  const ProtectedDoctorRoutes = () => {
    const doctorData = JSON.parse(localStorage.getItem("doctor") || "{}");
    if (doctorData?.auth_token) {
      return (
        <DoctorTemplate>
          <Outlet />
        </DoctorTemplate>
      );
    } else {
      return <Navigate to="/signin" />;
    }
  };

  const ProtectedPatientRoutes = () => {
    const patientData = useMemo(() => {
      return JSON.parse(localStorage.getItem("patient") || "{}");
    }, []);
    if (patientData?.auth_token) {
      return (
        <PatientTemplate>
          <Outlet />
        </PatientTemplate>
      );
    } else {
      return <Navigate to="/signin" />;
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LazyLandingPage />} />
          <Route path="/signin" element={<LazySignInPage />} />
          <Route path="/onboarding">
            <Route path="patient" element={<LazyPatientOnboardingPage />} />
            <Route path="doctor" element={<LazyDoctorOnboardingPage />} />
          </Route>
          <Route path="/patient/dashboard" element={<ProtectedPatientRoutes />}>
            <Route path="home" element={<LazyPatientDashboardHome />} />
            <Route path="profile" element={<LazyPatientDashboardProfile />} />
            <Route path="report" element={<LazyPatientDashboardReport />} />
            <Route
              path="explore-doctors"
              element={<LazyPatientExploreDoctors />}
            />
            <Route path="chat/:type" element={<LazyChatPage  />} />
          </Route>
          <Route path="/doctor/dashboard" element={<ProtectedDoctorRoutes />}>
            <Route path="home" element={<LazyDoctorDashboardHome />} />
            <Route path="profile" element={<LazyDoctorDashboardProfile />} />
            <Route path="chat/:type" element={<LazyChatPage />} />
            <Route path="appointments" element={<LazyDoctorDashboardAppointment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routing;
