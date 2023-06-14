import { ToastContainer } from "react-toastify";
// import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Routing from "./routes";
// import socketClient from "./config/socket.config";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1222} />
      <Routing />
    </>
  );
}

export default App;
