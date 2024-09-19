import React, { Fragment, useEffect, useState } from "react";
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
import FilterModal from "../components/filterModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShipmentsData } from "../json/shipments";
import ShipmentCard from "../components/shipmentCard";

// Enable layout animation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ShipmentListScreen: React.FC = () => {
  // const { shipments, loading, error, refetch } = useShipments(); // Response from API Call does not match UI in figma file
  const shipments = ShipmentsData;
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedShipmentIds, setExpandedShipmentIds] = useState<string[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [userDetails, setUserDetails] = useState<string | null>(null); // Fixed type here
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetailsJson = await AsyncStorage.getItem("userName");
      if (userDetailsJson) {
        setUserDetails(JSON.parse(userDetailsJson));
      }
    };
    fetchUserDetails();
  }, []);

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
      setRefreshing(false);
    }, 2000);
  };

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

  const toggleFilterSelection = (status: string) => {
    if (selectedFilter.includes(status)) {
      setSelectedFilter(
        selectedFilter.filter((filterStatus) => filterStatus !== status)
      );
    } else {
      setSelectedFilter([...selectedFilter, status]);
    }
  };

  // Combine the filter and search logic
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearchQuery = shipment.awb
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter.length === 0 || selectedFilter.includes(shipment.status);
    return matchesSearchQuery && matchesFilter;
  });

  const renderShipment = ({ item }: any) => {
    const isExpanded = expandedShipmentIds.includes(item.id);
    return (
      <ShipmentCard
        item={item}
        isExpanded={isExpanded}
        expandedShipmentIds={expandedShipmentIds}
        toggleShipmentSelection={toggleShipmentSelection}
        toggleDetails={toggleDetails}
        selectedShipments={selectedShipments}
      />
    );
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
          <Text style={styles.username}>{userDetails}</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="search" size={20} color="#a7a3b3" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search AWB Number"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
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

        {filteredShipments.length > 0 ? (
          <FlatList
            data={filteredShipments}
            renderItem={renderShipment}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 16 }}>
            No Shipments Found
          </Text>
        )}

        {/* Filter Modal */}
        <FilterModal
          isVisible={filterModalVisible}
          selectedFilter={selectedFilter}
          onToggleFilter={toggleFilterSelection}
          onClose={() => setFilterModalVisible(false)}
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
  icon: {
    backgroundColor: "#f4f2f8",
    padding: 10,
    borderRadius: 20,
  },
});

export default ShipmentListScreen;
