import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { Fragment, useState } from "react";
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
  Platform,
  LayoutAnimation,
  UIManager,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import FilterModal from "../components/filterModal";
import { useShipments } from "../hooks/useShipments";

// Enable layout animation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const shipmentsData = [
  {
    id: "1",
    awb: "41785691423",
    origin: "Cairo",
    originStreet: "Dokki, 22 Nile St.",
    destinationStreet: "Smoha, 22 max St.",
    destination: "Alexandria",
    status: "RECEIVED",
  },
  {
    id: "2",
    awb: "41785691424",
    origin: "Cairo",
    originStreet: "Dokki, 22 Nile St.",
    destinationStreet: "Smoha, 22 max St.",
    destination: "Alexandria",
    status: "CANCELLED",
  },
  {
    id: "3",
    awb: "41785691425",
    origin: "Cairo",
    originStreet: "Dokki, 22 Nile St.",
    destinationStreet: "Smoha, 22 max St.",
    destination: "Alexandria",
    status: "ERROR",
  },
  {
    id: "4",
    awb: "41785691426",
    origin: "Cairo",
    originStreet: "Dokki, 22 Nile St.",
    destinationStreet: "Smoha, 22 max St.",
    destination: "Alexandria",
    status: "DELIVERED",
  },
  {
    id: "5",
    awb: "41785691426",
    origin: "Cairo",
    originStreet: "Dokki, 22 Nile St.",
    destinationStreet: "Smoha, 22 max St.",
    destination: "Alexandria",
    status: "ON HOLD",
  },
];

const ShipmentListScreen: React.FC = () => {
  // const { shipments, loading, error, refetch } = useShipments(); // Response from API Calldoes not match UI in figma file

  const shipments = shipmentsData;
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedShipmentIds, setExpandedShipmentIds] = useState<string[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

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

  // Function to toggle the shipment details visibility
  const toggleDetails = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedShipmentIds.includes(id)) {
      setExpandedShipmentIds(
        expandedShipmentIds.filter((shipmentId) => shipmentId !== id)
      ); // Collapse if already expanded
    } else {
      setExpandedShipmentIds([...expandedShipmentIds, id]); // Expand if not already expanded
    }
  };

  const renderShipment = ({ item }: any) => {
    const isExpanded = expandedShipmentIds.includes(item.id); // Check if the current shipment is expanded

    return (
      <View>
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
                  : item.status === "CANCELLED"
                  ? styles.canceledStatus
                  : item.status === "ERROR"
                  ? styles.errorStatus
                  : item.status === "DELIVERED"
                  ? styles.deliveredStatus
                  : item.status === "ON HOLD"
                  ? styles.onHoldStatus
                  : null
              }
            >
              {item.status}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.expandButton,
              isExpanded && { backgroundColor: "#2f50c1" },
            ]} // Blue when expanded
            onPress={() => toggleDetails(item.id)}
          >
            <FontAwesome
              name={isExpanded ? "compress" : "expand"} // Icon change when expanded
              size={12}
              color={isExpanded ? "white" : "#2f50c1"}
            />
          </TouchableOpacity>
        </View>

        {isExpanded && (
          <View style={styles.detailsContainer}>
            <View style={styles.moreShipmentDetails}>
              <View>
                <Text style={styles.moreShipmentDetailsHeadingText}>
                  Origin
                </Text>
                <Text style={styles.moreShipmentDetailsText}>
                  {item.origin}
                </Text>
                <Text style={styles.moreShipmentDetailsStreetText}>
                  {item.originStreet}
                </Text>
              </View>
              <View>
                <Ionicons
                  name="arrow-forward-sharp"
                  size={24}
                  color="#2f50c1"
                />
              </View>
              <View>
                <Text style={styles.moreShipmentDetailsHeadingText}>
                  Destination
                </Text>
                <Text style={styles.moreShipmentDetailsText}>
                  {item.destination}
                </Text>
                <Text style={styles.moreShipmentDetailsStreetText}>
                  {item.destinationStreet}
                </Text>
              </View>
            </View>

            <View style={styles.contactDetailsContainer}>
              <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call" size={20} color="white" />
                <Text style={styles.contactDetailsText}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.whatsappButton}>
                <Ionicons name="logo-whatsapp" size={20} color="white" />
                <Text style={styles.contactDetailsText}>Whatsapp</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const toggleFilterSelection = (status: string) => {
    if (selectedFilter.includes(status)) {
      setSelectedFilter(
        selectedFilter.filter((filterStatus) => filterStatus !== status)
      );
    } else {
      setSelectedFilter([...selectedFilter, status]);
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
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

        <View>
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="search" size={20} color="#a7a3b3" />
          </TouchableOpacity>
          <TextInput style={styles.searchInput} placeholder="Search" />
        </View>

        <View style={styles.searchFilterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
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

        {/* Render the FilterModal */}
        <FilterModal
          isVisible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          selectedFilter={selectedFilter}
          onToggleFilter={toggleFilterSelection}
        />
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
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
    paddingLeft: 50,
    marginRight: 8,
    height: 50,
    marginTop: 16,
    marginHorizontal: 16,
    width: "90%",
  },
  searchIcon: {
    position: "absolute",
    top: "48%",
    left: "7%",
    zIndex: 1,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#F4F2F8",
    paddingVertical: 14,
    borderRadius: 8,
    width: "48%",
  },
  filterText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#a7a3b3",
    fontWeight: "600",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2f50c1",
    paddingVertical: 14,
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
    marginTop: 8,
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
  errorStatus: {
    backgroundColor: "#fee3d4",
    color: "#D12030",
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
  deliveredStatus: {
    backgroundColor: "#e3fad6",
    color: "#208d28",
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
  onHoldStatus: {
    backgroundColor: "#fff3d5",
    color: "#db7e21",
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
  detailsContainer: {
    backgroundColor: "#f4f2f8",
    padding: 10,
    borderRadius: 10, // This keeps the rounded corners
    borderWidth: 2, // Apply the border only on the top
    borderColor: "#ffffff", // Set the top border color
    borderStyle: "dashed", // Dashed style for the top border
  },
  moreShipmentDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moreShipmentDetailsHeadingText: {
    fontSize: 11,
    color: "#2f50c1",
  },
  moreShipmentDetailsText: {
    fontSize: 16,
    color: "2f50c1",
  },
  moreShipmentDetailsStreetText: {
    fontSize: 13,
    color: "2f50c1",
  },
  contactDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    columnGap: 10,
    marginTop: 16,
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6c91ec",
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25d366",
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  contactDetailsText: {
    marginLeft: 10,
    fontSize: 16,
    color: "white",
  },
});

export default ShipmentListScreen;
