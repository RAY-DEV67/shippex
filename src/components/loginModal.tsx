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

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const validationSchema = Yup.object().shape({
  url: Yup.string().url("Invalid URL").required("URL is required"),
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

  const handleLogin = (values: {
    url: string;
    username: string;
    password: string;
  }) => {
    // Simulate login and navigate to Home screen after success
    Alert.alert("Login Successful", `Welcome, ${values.username}!`);

    // Reset the navigation stack to prevent going back to login
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
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
                  Please enter your First, Last name and your phone number in
                  order to register
                </Text>
                <InputField
                  label="URL"
                  name="url"
                  placeholder="https://www.example.com"
                  isUrlField // Pass the prop for URL-specific behavior
                />
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
              {/* Use the reusable LoginButton and handle disabled state */}
              <LoginButton
                onPress={handleSubmit}
                disabled={!(isValid && dirty)} // Disable the button if the form is not valid or dirty
                buttonStyle={
                  !(isValid && dirty)
                    ? styles.disabledButton
                    : styles.loginButton // Apply different styles based on validity
                }
                textStyle={
                  !(isValid && dirty)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
  cancelButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  cancelText: {
    color: "#007aff",
    fontSize: 16,
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
    backgroundColor: "#2f50c1",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: "#eae7f2",
    marginBottom: 40,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#a7a3b3",
  },
});

export default LoginModal;
