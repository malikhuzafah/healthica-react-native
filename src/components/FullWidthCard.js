import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function FullWidthCard({ navigation, item }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Product", { item })}
    >
      <View style={styles.cardView}>
        <Image
          source={require("../../assets/login.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>Rs. {item.price}</Text>
      </View>
      <Icon name="arrow-forward" size={28} />
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
    height: 100,
    width: 160,
    borderRadius: 15,
    backgroundColor: "#59b2ab",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  image: {
    borderRadius: 15,
    height: 100,
    width: 100,
  },
  textView: { paddingHorizontal: 10, paddingVertical: 10 },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#585a61",
  },
  description: { fontSize: 15, color: "#b1e5d3" },
});
