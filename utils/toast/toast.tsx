import { greenInfo, redInfo } from "@/app/global/svg";
import toast from "react-hot-toast";

let currentToastId: string | null = null;

const baseToast = (message: string, type: "success" | "error" | "info") => {
  if (currentToastId) {
    toast.dismiss(currentToastId);
  }

  currentToastId = toast(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      fontSize: '14px',
      padding: '16px',
      borderRadius: '8px',
      background: '#ffffff',
      color: '#333333',
      maxWidth: '350px',
      textAlign: 'left',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderLeft: `4px solid ${
        type === "success"
          ? "#109368"
          : type === "error"
          ? "#DC1827"
          : "#141414"
      }`,
    },
    icon: type === "success" 
      ? greenInfo()
      : type === "error" 
      ? redInfo()
      : 'ℹ️',
  });
};

// Simplified toast functions
export const successToast = (message: string) => baseToast(message, "success");
export const errorToast = (message: string) => baseToast(message, "error");
export const infoToast = (message: string) => baseToast(message, "info");
