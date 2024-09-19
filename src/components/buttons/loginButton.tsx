import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import LoadingIndicator from "../loadingIndicator";
import colors from "../../const/colors";

interface LoginButtonProps {
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  color?: string;
  loading?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  disabled,
  backgroundColor,
  color,
  loading, // Use loading prop
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        { backgroundColor: backgroundColor },
      ]}
      onPress={onPress}
      disabled={disabled || loading} // Disable button when loading
    >
      {loading ? ( // Show spinner when loading
        <LoadingIndicator />
      ) : (
        <Text style={[styles.buttonText, { color: color }]}>Login</Text>
      )}
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: colors.midGray,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
