import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import colors from "../const/colors";

const LoadingIndicator: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={colors.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default LoadingIndicator;
