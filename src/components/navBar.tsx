// src/components/Navbar.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Navbar: React.FC = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="cube-outline" size={24} color="blue" />
        <Text style={styles.navText}>Shipments</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="barcode-outline" size={24} color="gray" />
        <Text style={styles.navText}>Scan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="wallet-outline" size={24} color="gray" />
        <Text style={styles.navText}>Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="person-outline" size={24} color="gray" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  navText: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginTop: 4,
  },
  navButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Navbar;
