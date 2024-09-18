import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
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

const LoginScreen: React.FC = () => {
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
                !(isValid && dirty) ? styles.disabledButton : styles.loginButton // Apply different styles based on validity
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#fff",
    width: "90%",
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

export default LoginScreen;
