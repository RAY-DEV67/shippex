import React, { Fragment } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/splashScreen";
import LoginScreen from "../screens/loginScreen";
import ShipmentListScreen from "../screens/shipmentListScreen";
import Navbar from "../components/navBar";

export type RootStackParamList = {
  Shipments: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Fragment>
      <Stack.Navigator initialRouteName="Shipments">
        <Stack.Screen name="Shipments" component={ShipmentListScreen} />
      </Stack.Navigator>
      <Navbar />
    </Fragment>
  );
};

export default MainStack;
