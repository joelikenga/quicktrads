import toast from "react-hot-toast";

// Variable to keep track of the current toast ID
let currentToastId: string | null = null;

// Utility function for toasts
export const showToast = (
  message: string,
  type: "success" | "error" | "info"
) => {
  // Dismiss the previous toast if it exists
  if (currentToastId) {
    toast.dismiss(currentToastId);
  }

  // Show the new toast and store its ID
  currentToastId = toast(message, {
    style: {
      fontSize: "12px",
      background:
        type === "success"
          ? "#4CAF50"
          : type === "error"
          ? "#ff4d4d"
          : "#D0F7E4",
      color: type === "info" ? "#000" : "#fff",
      width: "312px",
      textAlign: "left",
    },
    // icon: type === "info" ? "" : undefined,
  });
};
