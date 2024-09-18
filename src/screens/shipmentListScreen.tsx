import FontAwesome from "@expo/vector-icons/FontAwesome";
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
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

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
    awb: "41785691424",
    origin: "Cairo",
    destination: "Alexandria",
    status: "CANCELED",
  },
  {
    id: "3",
    awb: "41785691425",
    origin: "Cairo",
    destination: "Alexandria",
    status: "CANCELED",
  },
  {
    id: "4",
    awb: "41785691426",
    origin: "Cairo",
    destination: "Alexandria",
    status: "CANCELED",
  },
];

const ShipmentListScreen: React.FC = () => {
  const [shipments, setShipments] = useState(shipmentsData);
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const toggleShipmentSelection = (id: string) => {
    if (selectedShipments.includes(id)) {
      setSelectedShipments(
        selectedShipments.filter((shipmentId) => shipmentId !== id)
      );
    } else {
      setSelectedShipments([...selectedShipments, id]);
    }
  };

  const handleMarkAll = () => {
    if (selectedShipments.length === shipments.length) {
      setSelectedShipments([]); // Uncheck all
    } else {
      const allIds = shipments.map((shipment) => shipment.id);
      setSelectedShipments(allIds); // Check all
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request (e.g., re-fetch the shipment data)
    setTimeout(() => {
      // You can update the shipments array here if needed
      setRefreshing(false);
    }, 2000);
  };

  const renderShipment = ({ item }: any) => (
    <View style={styles.shipmentCard}>
      <Checkbox
        value={selectedShipments.includes(item.id)}
        onValueChange={() => toggleShipmentSelection(item.id)}
        style={styles.checkbox}
      />
      <Image
        source={require("../../assets/box.png")}
        style={styles.shipmentImage}
      />
      <View style={styles.shipmentDetails}>
        <Text>AWB</Text>
        <Text style={styles.awb}>{item.awb}</Text>
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

      <TouchableOpacity style={styles.expandButton}>
        <FontAwesome name="expand" size={12} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/avatar.png")} />
        <Image source={require("../../assets/logoBlue.png")} />
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="notifications-outline" size={24} color="#2f50c1" />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.username}>Ibrahim Shaker</Text>
      </View>

      <TextInput style={styles.searchInput} placeholder="Search" />

      <View style={styles.searchFilterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={20} color="#a7a3b3" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton}>
          <Ionicons name="scan-outline" size={20} color="white" />
          <Text style={styles.scanText}>Add Scan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.shipmentsHeader}>
        <Text style={styles.shipmentsTitle}>Shipments</Text>
        <TouchableOpacity onPress={handleMarkAll}>
          <Text style={styles.markAllText}>
            {selectedShipments.length === shipments.length
              ? "Unmark All"
              : "Mark All"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shipments}
        keyExtractor={(item) => item.id}
        renderItem={renderShipment}
        style={styles.shipmentsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
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
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    justifyContent: "space-between",
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
    fontSize: 24,
    fontWeight: "bold",
  },
  searchFilterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
  },
  searchInput: {
    backgroundColor: "#F4F2F8",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    height: 50,
    marginTop: 16,
    marginHorizontal: 16,
    width: "90%",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#F4F2F8",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  filterText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#a7a3b3",
    fontWeight: "600",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2f50c1",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  scanText: {
    marginLeft: 4,
    fontSize: 14,
    color: "white",
  },
  shipmentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
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
    backgroundColor: "#F4F2F8",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  checkbox: {
    marginRight: 16,
    height: 15,
    width: 15,
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
    fontSize: 12,
    color: "#757281",
  },
  receivedStatus: {
    color: "#2f50c1",
    fontWeight: "bold",
    marginRight: 8,
    backgroundColor: "#d9e6fd",
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    textAlign: "center",
  },
  canceledStatus: {
    backgroundColor: "#f4f2f8",
    color: "#58536e",
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    textAlign: "center",
  },
  expandButton: {
    marginLeft: 8,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },
  icon: {
    backgroundColor: "#f4f2f8",
    padding: 10,
    borderRadius: 20,
  },
});

export default ShipmentListScreen;
