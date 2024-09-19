import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../components/inputField";
import LoginButton from "../components/buttons/loginButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/appNavigator";
import useAuth from "../hooks/useAuth"; // Import useAuth
import ToastFunction from "../helper/toast";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isVisible, onClose }) => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, loading } = useAuth(); // Get loading state from useAuth

  const handleLogin = async (values: {
    url: string;
    username: string;
    password: string;
  }) => {
    try {
      await login(values.username, values.password);
      onClose();
      ToastFunction("success", `Login Successful`, `Welcome Back`);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        Alert.alert("Login Failed", error.message);
      } else {
        // Handle unknown error types
        Alert.alert(
          "Login Failed",
          "An unknown error occurred. Please try again."
        );
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="#2f50c1" barStyle="dark-content" />
      <Formik
        initialValues={{ url: "", username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <SafeAreaView style={styles.container}>
            <View style={styles.form}>
              <View>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>
                  Please enter your credentials
                </Text>
                <InputField
                  label="Username / Email"
                  name="username"
                  placeholder="Your email"
                />
                <InputField
                  label="Password"
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
              </View>
              <LoginButton
                onPress={handleSubmit}
                disabled={!(isValid && dirty)} // Disable if form is invalid or dirty
                loading={loading} // Pass the loading state
                buttonStyle={
                  !(isValid && dirty) || loading
                    ? styles.disabledButton
                    : styles.loginButton
                }
                textStyle={
                  !(isValid && dirty) || loading
                    ? styles.disabledButtonText
                    : styles.loginButtonText
                }
              />
            </View>
          </SafeAreaView>
        )}
      </Formik>
    </Modal>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  form: {
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b6b6b",
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#007aff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
    marginBottom: 40,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#a1a1a1",
  },
});
