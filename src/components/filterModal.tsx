import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedFilter: string[];
  onToggleFilter: (status: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  selectedFilter,
  onToggleFilter,
}) => {
  const filters = [
    "RECEIVED",
    "PUTAWAY",
    "DELIVERED",
    "CANCELLED",
    "REJECTED",
    "LOST",
    "ON HOLD",
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.filterTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterContainer}>
            <Text style={styles.filterLabel}>SHIPMENT STATUS</Text>
            <View style={styles.filterOptions}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    selectedFilter.includes(filter) && styles.selectedFilter,
                  ]}
                  onPress={() => onToggleFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selectedFilter.includes(filter) && styles.selectedText,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    // padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 16,
    borderColor: "#F4F2F8",
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cancelText: {
    fontSize: 14,
    color: "#007AFF",
  },
  doneText: {
    fontSize: 14,
    color: "#007AFF",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  filterLabel: {
    fontSize: 12,
    marginVertical: 10,
    color: "#8e8e93",
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#f2f2f7",
    borderRadius: 8,
    marginBottom: 10,
    width: "30%",
  },
  selectedFilter: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    textAlign: "center",
    color: "#8e8e93",
  },
  selectedText: {
    color: "#fff",
  },
});

export default FilterModal;
