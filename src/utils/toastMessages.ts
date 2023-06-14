import { toast } from "react-toastify";

interface ToastMessagesProps {
  type?: "success" | "error" | "info" | "warning" | "dark";
  message: string;
}

const toastMessages = (props: ToastMessagesProps) => {
  const { type = "success", message } = props;
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default toastMessages;
