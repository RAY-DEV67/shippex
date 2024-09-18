// src/components/Navbar.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Navbar: React.FC = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity>
        <Ionicons name="cube-outline" size={24} color="blue" />
        <Text style={styles.navText}>Shipments</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="barcode-outline" size={24} color="gray" />
        <Text style={styles.navText}>Scan</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="wallet-outline" size={24} color="gray" />
        <Text style={styles.navText}>Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
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
});

export default Navbar;
