// ShipmentCard.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Checkbox } from "expo-checkbox";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

type ShipmentCardProps = {
  item: any;
  isExpanded: boolean;
  expandedShipmentIds: string[];
  toggleShipmentSelection: (id: string) => void;
  toggleDetails: (id: string) => void;
  selectedShipments: string[];
};

const ShipmentCard: React.FC<ShipmentCardProps> = ({
  item,
  isExpanded,
  expandedShipmentIds,
  toggleShipmentSelection,
  toggleDetails,
  selectedShipments,
}) => {
  return (
    <View style={styles.shipmentCardContainer}>
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
          ]}
          onPress={() => toggleDetails(item.id)}
        >
          <FontAwesome
            name={isExpanded ? "compress" : "expand"}
            size={12}
            color={isExpanded ? "white" : "#2f50c1"}
          />
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View style={styles.detailsContainer}>
          <View style={styles.moreShipmentDetails}>
            <View>
              <Text style={styles.moreShipmentDetailsHeadingText}>Origin</Text>
              <Text style={styles.moreShipmentDetailsText}>{item.origin}</Text>
              <Text style={styles.moreShipmentDetailsStreetText}>
                {item.originStreet}
              </Text>
            </View>
            <View>
              <Ionicons name="arrow-forward-sharp" size={24} color="#2f50c1" />
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

const styles = StyleSheet.create({
  shipmentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F2F8",
    padding: 16,
    borderRadius: 8,
  },
  shipmentCardContainer: {
    marginVertical: 4,
    marginHorizontal: 12,
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

export default ShipmentCard;
