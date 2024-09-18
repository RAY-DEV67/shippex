import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/splashScreen";
import LoginScreen from "../screens/loginScreen";
import ShipmentListScreen from "../screens/shipmentListScreen";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Shipments: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Shipments" component={ShipmentListScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
