import React, { Fragment, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigations/appNavigator";
import { Easing } from "react-native";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  // Use Animated.Value for both scale and position
  const imageScale = useRef(new Animated.Value(0.3)).current; // Scale for whole view
  const halfLogo1Scale = useRef(new Animated.Value(1)).current; // Scale for halfLogo1
  const halfLogo2Scale = useRef(new Animated.Value(1)).current; // Scale for halfLogo2
  const halfLogo2Translate = useRef(
    new Animated.ValueXY({ x: 0, y: 0 })
  ).current; // Position for halfLogo2

  useEffect(() => {
    // First animation: zoom entire view
    Animated.sequence([
      Animated.parallel([
        // Scaling animation (whole view zoom from 0.3 to 1)
        Animated.timing(imageScale, {
          toValue: 1,
          duration: 2000, // Duration for first zoom
          easing: Easing.out(Easing.ease), // Smooth easing
          useNativeDriver: true,
        }),
      ]),
      // Pause for 800ms
      Animated.delay(800),
      // Trigger simultaneous animations for both logos
      Animated.parallel([
        // Animate only halfLogo1 (zoom in)
        Animated.timing(halfLogo1Scale, {
          toValue: 50,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        // Animate halfLogo2 (move to top-left corner and shrink)
        Animated.parallel([
          Animated.timing(halfLogo2Scale, {
            toValue: 0.5,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(halfLogo2Translate, {
            toValue: { x: -150, y: -250 }, // Move to top-left (adjust values based on screen size)
            duration: 1000,
            easing: Easing.out(Easing.quad), // Smooth and natural movement
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();

    // Navigate to the Onboarding screen after all animations
    setTimeout(() => {
      navigation.replace("Login");
    }, 4000);
  }, []);

  return (
    <Fragment>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.container}>
        <Animated.View
          style={[
            {
              transform: [{ scale: imageScale }],
            },
          ]}
        >
          <Animated.Image
            source={require("../../assets/halfLogo1.png")}
            resizeMode="contain"
            style={[
              {
                transform: [{ scale: halfLogo1Scale }],
              },
            ]}
          />
          <Animated.Image
            source={require("../../assets/halfLogo2.png")}
            resizeMode="contain"
            style={[
              styles.image2,
              {
                transform: [
                  { scale: halfLogo2Scale }, // Apply scale animation to halfLogo2 (shrinking)
                  { translateX: halfLogo2Translate.x }, // Move horizontally
                  { translateY: halfLogo2Translate.y }, // Move vertically
                ],
              },
            ]}
          />
        </Animated.View>
      </View>
    </Fragment>
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
  image2: {
    marginTop: 4,
  },
});
