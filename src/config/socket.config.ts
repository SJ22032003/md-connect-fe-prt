import { io, Socket } from "socket.io-client";
function socketClient(): Socket {
  return io(import.meta.env.VITE_APP_URL, {
    transports: ["websocket", "polling", "flashsocket"],
    withCredentials: true,
  });
}
export default socketClient;
