import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import LoadingIndicator from "../loadingIndicator";

interface LoginButtonProps {
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean; // Add loading prop
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  disabled,
  buttonStyle,
  textStyle,
  loading, // Use loading prop
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton, buttonStyle]}
      onPress={onPress}
      disabled={disabled || loading} // Disable button when loading
    >
      {loading ? ( // Show spinner when loading
        <LoadingIndicator />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>Login</Text>
      )}
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
