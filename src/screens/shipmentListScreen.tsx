// src/screens/ShipmentListScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const shipmentsData = [
  {
    id: "1",
    awb: "41785691423",
    origin: "Cairo",
    destination: "Alexandria",
    status: "RECEIVED",
  },
  {
    id: "2",
    awb: "41785691423",
    origin: "Cairo",
    destination: "Alexandria",
    status: "CANCELED",
  },
  {
    id: "3",
    awb: "41785691423",
    origin: "Cairo",
    destination: "Alexandria",
    status: "CANCELED",
  },
  {
    id: "4",
    awb: "41785691423",
    origin: "Cairo",
    destination: "Alexandria",
    status: "CANCELED",
  },
];

const ShipmentListScreen: React.FC = () => {
  const [shipments, setShipments] = useState(shipmentsData);

  const renderShipment = ({ item }: any) => (
    <View style={styles.shipmentCard}>
      <Image
        source={require("../../assets/icon.png")}
        style={styles.shipmentImage}
      />
      <View style={styles.shipmentDetails}>
        <Text style={styles.awb}>AWB {item.awb}</Text>
        <Text style={styles.route}>
          {item.origin} → {item.destination}
        </Text>
      </View>
      <TouchableOpacity>
        <Text
          style={
            item.status === "RECEIVED"
              ? styles.receivedStatus
              : styles.canceledStatus
          }
        >
          {item.status}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    // <>
    //   <StatusBar backgroundColor="#ffffff" barStyle="light-content" />
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.profilePic}
        />
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.username}>Ibrahim Shaker</Text>
        </View>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="black"
          style={styles.notificationIcon}
        />
      </View>

      <View style={styles.searchFilterContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={20} color="gray" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton}>
          <Ionicons name="scan-outline" size={20} color="blue" />
          <Text style={styles.scanText}>Add Scan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.shipmentsHeader}>
        <Text style={styles.shipmentsTitle}>Shipments</Text>
        <TouchableOpacity>
          <Text style={styles.markAllText}>Mark All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shipments}
        keyExtractor={(item) => item.id}
        renderItem={renderShipment}
        style={styles.shipmentsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 16,
    color: "#888",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationIcon: {
    marginLeft: "auto",
  },
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 8,
  },
  filterText: {
    marginLeft: 4,
    fontSize: 14,
    color: "gray",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f4ff",
    padding: 10,
    borderRadius: 8,
  },
  scanText: {
    marginLeft: 4,
    fontSize: 14,
    color: "blue",
  },
  shipmentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  shipmentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  markAllText: {
    fontSize: 14,
    color: "blue",
  },
  shipmentsList: {
    paddingHorizontal: 16,
  },
  shipmentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  shipmentImage: {
    width: 40,
    height: 40,
  },
  shipmentDetails: {
    flex: 1,
    marginLeft: 12,
  },
  awb: {
    fontSize: 16,
    fontWeight: "bold",
  },
  route: {
    fontSize: 14,
    color: "#888",
  },
  receivedStatus: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  canceledStatus: {
    color: "#F44336",
    fontWeight: "bold",
  },
});

export default ShipmentListScreen;
