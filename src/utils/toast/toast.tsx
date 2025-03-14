/* eslint-disable @typescript-eslint/no-explicit-any */

import { errorInfoIcon, successInfoIcon } from "@/app/global/svg";
import toast from "react-hot-toast";

let currentToastId: string | null = null;

const baseToast = (message: any, type: "success" | "error" | "info") => {
  if (currentToastId) {
    toast.dismiss(currentToastId);
  }

  currentToastId = toast(message, {
    duration: 3000,
    position: 'bottom-center',
    style: {
      fontSize: '16px',
      fontWeight:'600',
      padding: '14px',
      borderRadius: '8px',
      background: '#ffffff',
      color: '#333333',
      maxWidth: '350px',
      width:"100%",
      textAlign: 'left',
      border:'gray',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderLeft: `5px solid ${
        type === "success"
          ? "#109368"
          : type === "error"
          ? "#DC1827"
          : "#141414"
      }`,
    },
    icon: type === "success" 
      ? successInfoIcon()
      : type === "error" 
      ?  errorInfoIcon()
      : 'ℹ️',
  });
};

// Simplified toast functions
export const successToast = (message: any) => baseToast(message, "success");
export const errorToast = (message: any) => baseToast(message, "error");
export const infoToast = (message: any) => baseToast(message, "info");

/* eslint-disable @typescript-eslint/no-explicit-any */
