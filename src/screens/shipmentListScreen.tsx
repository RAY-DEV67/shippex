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
import colors from "../const/colors"; 

// Enable layout animation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ShipmentListScreen: React.FC = () => {
  const shipments = ShipmentsData;
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedShipmentIds, setExpandedShipmentIds] = useState<string[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [userDetails, setUserDetails] = useState<string | null>(null);
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
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const toggleDetails = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedShipmentIds.includes(id)) {
      setExpandedShipmentIds(
        expandedShipmentIds.filter((shipmentId) => shipmentId !== id)
      ); // Collapse
    } else {
      setExpandedShipmentIds([...expandedShipmentIds, id]); // Expand
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
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../../assets/avatar.png")} />
          <Image source={require("../../assets/logoBlue.png")} />
          <TouchableOpacity style={styles.icon}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.blue}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.username}>{userDetails}</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="search" size={20} color={colors.gray} />
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
            <Ionicons name="filter-outline" size={20} color={colors.gray} />
            <Text style={styles.filterText}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanButton}>
            <Ionicons name="scan-outline" size={20} color={colors.white} />
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
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  userInfo: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 16,
    color: colors.darkGray,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingLeft: 50,
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
  searchFilterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: colors.lightGray,
    paddingVertical: 14,
    borderRadius: 8,
    width: "48%",
  },
  filterText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.gray,
    fontWeight: "600",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    paddingVertical: 14,
    borderRadius: 8,
    width: "48%",
  },
  scanText: {
    marginLeft: 8,
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
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 20,
  },
});

export default ShipmentListScreen;
