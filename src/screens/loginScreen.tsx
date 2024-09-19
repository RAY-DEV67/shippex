import React, { Fragment, useState } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import LoginButton from "../components/buttons/loginButton";
import LoginModal from "../components/loginModal";
import colors from "../const/colors";

const LoginScreen: React.FC = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  return (
    <Fragment>
      <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
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
            backgroundColor={colors.white}
            color={colors.blue}
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
    backgroundColor: colors.blue,
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
});
