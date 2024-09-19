import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Checkbox } from "expo-checkbox";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import colors from "../const/colors";

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
            style={[
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
                : null,
              styles.statusContainer,
            ]}
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
            color={isExpanded ? colors.white : colors.blue}
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
              <Ionicons
                name="arrow-forward-sharp"
                size={24}
                color={colors.blue}
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
              <Ionicons name="call" size={20} color={colors.white} />
              <Text style={styles.contactDetailsText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.whatsappButton}>
              <Ionicons name="logo-whatsapp" size={20} color={colors.white} />
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
    backgroundColor: colors.lightGray,
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
    color: colors.darkGray,
  },
  statusContainer: {
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.white,
    textAlign: "center",
  },
  receivedStatus: {
    color: colors.blue,
    backgroundColor: colors.lightBlue,
  },
  canceledStatus: {
    backgroundColor: colors.lightGray,
    color: colors.darkGray,
  },
  errorStatus: {
    backgroundColor: colors.lightRed,
    color: colors.red,
  },
  deliveredStatus: {
    backgroundColor: colors.lightGreen,
    color: colors.green,
  },
  onHoldStatus: {
    backgroundColor: colors.lightOrange,
    color: colors.orange,
  },
  expandButton: {
    marginLeft: 8,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
  },
  detailsContainer: {
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.white,
    borderStyle: "dashed",
  },
  moreShipmentDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moreShipmentDetailsHeadingText: {
    fontSize: 11,
    color: colors.blue,
  },
  moreShipmentDetailsText: {
    fontSize: 16,
    color: colors.black,
  },
  moreShipmentDetailsStreetText: {
    fontSize: 13,
    color: colors.darkGray,
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
    backgroundColor: colors.blue,
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.midGreen,
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  contactDetailsText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.white,
  },
});

export default ShipmentCard;
