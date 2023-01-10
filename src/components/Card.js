import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";

export default function Card({ navigation, item }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.push("Product", { item })}
    >
      <View style={styles.cardView}>
        <Image
          source={require("../../assets/medicine.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.priceText}>Rs. {item.price}</Text>
      </View>
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
    width: 160,
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  cardView: {
    height: 150,
    width: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#59b2ab",
  },
  image: {
    height: 150,
    width: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardDetails: { paddingHorizontal: 10, paddingVertical: 10 },
  titleText: {
    fontWeight: "bold",
    fontSize: 15,
    color: COLORS.primaryText,
  },
  priceText: { fontSize: 13, color: COLORS.primaryText },
});
