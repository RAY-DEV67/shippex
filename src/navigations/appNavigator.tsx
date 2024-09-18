import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./authStack";
import MainStack from "./mainStack";

export type RootStackParamList = {
  Splash: undefined;
  Authentication: undefined;
  Login: undefined;
  Shipments: undefined;
  Main: undefined;
  Onboarding: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Authentication"
        component={AuthStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
