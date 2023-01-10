import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { db } from "../screens/Firebase.js";
import { deleteDoc, doc } from "firebase/firestore";

export default function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const deleteItem = () => {
    deleteDoc(doc(db, "cart", `${item.id}`));
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardView}>
        <Image
          source={require("../../assets/login.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>Rs. {item.price}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            // borderColor: "#b1e5d3",
            borderRadius: 50,
            paddingVertical: 5,
            paddingHorizontal: 10,
            width: "60%",
            marginTop: 5,
          }}
        >
          <TouchableOpacity>
            <Icon name="remove" size={20} />
          </TouchableOpacity>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              setQuantity(quantity + 1);
            }}
          >
            <Icon name="add" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ width: "10%" }} onPress={deleteItem}>
        <Icon name="delete" size={28} />
      </TouchableOpacity>
    </View>
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
    // height: "100%",
    width: "30%",
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
  textView: { paddingHorizontal: 10, paddingVertical: 10, width: "50%" },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#585a61",
  },
  description: { fontSize: 15, color: "#b1e5d3" },
});
