import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, RefreshControl } from "react-native";

const ShipmentListScreen: React.FC = () => {
  const [shipments, setShipments] = useState([
    { id: "1", status: "Received" },
    { id: "2", status: "Canceled" },
    // Add more shipments
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // You can also fetch new data here
    }, 2000);
  };

  return (
    <FlatList
      data={shipments}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>Shipment ID: {item.id}</Text>
          <Text>Status: {item.status}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ShipmentListScreen;
