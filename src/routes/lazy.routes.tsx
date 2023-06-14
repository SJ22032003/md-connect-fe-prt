import { lazy } from "react";

export const LazyLandingPage = lazy(() => import("../components/pages/Landing"));

export const LazySignInPage = lazy(() => import("../components/pages/SignIn"));

export const LazyPatientOnboardingPage = lazy(() => import("../components/pages/Onboarding/PatientOnboarding"));
export const LazyDoctorOnboardingPage = lazy(() => import("../components/pages/Onboarding/DoctorOnboarding"));

// Patient dashboard
export const LazyPatientDashboardHome = lazy(() => import("../components/pages/Dashboard/Patient/PatientHome"));
export const LazyPatientDashboardProfile = lazy(() => import("../components/pages/Dashboard/Patient/PatientProfile"));
export const LazyPatientDashboardReport = lazy(() => import("../components/pages/Dashboard/Patient/PatientReport"));
export const LazyPatientExploreDoctors = lazy(() => import("../components/pages/Dashboard/Patient/ExploreDoctors"));

export const LazyChatPage = lazy(() => import("../components/pages/Chat"));

// Doctor dashboard
export const LazyDoctorDashboardHome = lazy(() => import("../components/pages/Dashboard/Doctor/DoctorHome"));
export const LazyDoctorDashboardProfile = lazy(() => import("../components/pages/Dashboard/Doctor/DoctorProfile"));
export const LazyDoctorDashboardAppointment = lazy(() => import("../components/pages/Dashboard/Doctor/DoctorAppointment"))