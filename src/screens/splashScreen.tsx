import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigations/appNavigator";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  // Use Animated.Value for both scale and rotation
  const imageScale = useRef(new Animated.Value(0.4)).current;
  const imageRotateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence: scaling and rotating (around X-axis for vertical flip)
    Animated.parallel([
      // Scaling animation (from 1 to 5)
      Animated.timing(imageScale, {
        toValue: 7,
        duration: 2000, // Adjust duration if necessary
        useNativeDriver: true,
      }),
      // Rotation animation (flip vertically when scale > 4)
      Animated.timing(imageRotateX, {
        toValue: 1, // Rotation of 180 degrees (flip upside down vertically)
        duration: 1000, // Rotate during the second half of the zoom
        delay: 900, // Delay the flip to start halfway through zoom
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to the Onboarding screen after animation
    setTimeout(() => {
      navigation.replace("Onboarding");
    }, 1900);
  }, []);

  // Interpolating rotation around the X-axis: 0 means 0 degrees, 1 means 180 degrees (vertical flip)
  const rotationX = imageRotateX.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"], // Rotate vertically (flip from top to bottom)
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/animate.png")}
        style={[
          {
            transform: [
              { scale: imageScale }, // Apply scale animation
              { rotateX: rotationX }, // Apply vertical flip (card-like) animation
            ],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
