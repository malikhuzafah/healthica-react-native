import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";

export default function FullWidthCard({ item, icon, onPress, iconColor }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardView}>
        <Image
          source={require("../../assets/medicine.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>Rs. {item.price}</Text>
      </View>
      <Icon
        style={{ color: iconColor ? iconColor : "#000" }}
        name={icon}
        size={28}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 10,
    backgroundColor: "#FFF",
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: "100%",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingEnd: 20,
  },
  cardView: {
    borderRadius: 15,
    backgroundColor: "#59b2ab",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  image: {
    borderRadius: 15,
    height: 110,
    width: 110,
  },
  textView: { paddingHorizontal: 10, paddingVertical: 10 },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.primaryColor,
  },
  description: { fontSize: 15, color: COLORS.primaryColor },
});
