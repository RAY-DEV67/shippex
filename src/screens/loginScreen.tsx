import React, { Fragment, useState } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import LoginButton from "../components/buttons/loginButton";
import LoginModal from "../components/loginModal";

const LoginScreen: React.FC = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  return (
    <Fragment>
      <StatusBar backgroundColor="#2f50c1" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonContainer}>
          <LoginButton
            onPress={() => {
              setFilterModalVisible(true);
            }}
            buttonStyle={styles.whiteButton}
            textStyle={styles.blackButtonText}
          />
        </View>
      </View>

      {/* Render the FilterModal */}
      <LoginModal
        isVisible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      />
    </Fragment>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f50c1",
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
