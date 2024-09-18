import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginButton from "../components/buttons/loginButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigations/appNavigator";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const Onboarding: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logo.png")} resizeMode="contain" />
      </View>

      <View style={styles.buttonContainer}>
        <LoginButton
          onPress={() => {
            navigation.replace("Login");
          }}
          buttonStyle={styles.whiteButton} 
          textStyle={styles.blackButtonText} 
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E56D1",
    justifyContent: "space-between",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  whiteButton: {
    backgroundColor: "#fff", 
  },
  blackButtonText: {
    color: "#000",
  },
});
