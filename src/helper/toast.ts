import Toast from "react-native-toast-message";

// Define the possible types for the toast
type ToastType = "success" | "error" | "info";

// Toast function with type safety
function ToastFunction(type: ToastType, text1: string, text2?: string) {
  return Toast.show({
    type: type, // Toast type (success, error, info)
    position: "top", // Position of the toast (top, bottom)
    text1: text1, // Main text
    text2: text2, // Optional subtext or additional information
    visibilityTime: 3000, // Duration the toast should be visible (in milliseconds)
    autoHide: true, // Hide the toast automatically after `visibilityTime`
    topOffset: 50, // Customize the position from the top (in pixels)
    bottomOffset: 40, // Customize the position from the bottom (in pixels)
  });
}

export default ToastFunction;
