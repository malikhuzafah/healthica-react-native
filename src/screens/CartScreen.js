import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth, db } from "./Firebase";
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import COLORS from "../constants/colors";
import Alt from "../components/Alt";

export default function CartScreen({ navigation }) {
  const user = auth.currentUser;
  const [cartItems, setCartItems] = useState([]);

  const removeAll = () => {
    cartItems.forEach((item) => {
      deleteDoc(doc(db, "cart", item.id));
    });
    setCartItems([]);
  };

  const deleteItem = (id) => {
    deleteDoc(doc(db, "cart", `${id}`));
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getCartItems = () => {
    if (!user) {
      navigation.navigate("Auth");
      return;
    }
    getDocs(
      query(collection(db, "cart"), where("userId", "==", user.uid))
    ).then((docSnap) => {
      let tempMedicines = [];
      docSnap.forEach((document) => {
        getDoc(doc(db, "products", `${document.data().medicineId}`))
          .then((docData) => {
            if (docData.exists()) {
              let item = docData.data();
              item.quantity = document.data().quantity;
              tempMedicines.push({ ...item, id: document.id });
              setCartItems(tempMedicines);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondaryColor} />
      <View style={styles.header}>
        <View style={styles.headerItems}>
          <Icon
            style={styles.icon}
            name="arrow-back"
            size={28}
            onPress={() => navigation.replace("Home")}
          />
        </View>
        <View style={styles.headerItems}>
          <Text style={styles.title}>Cart</Text>
        </View>
        <View style={[styles.headerItems, styles.removeAll]}>
          <TouchableOpacity onPress={removeAll}>
            <Text>Remove all</Text>
          </TouchableOpacity>
        </View>
      </View>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 100,
              paddingStart: 20,
              paddingEnd: 20,
            }}
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardView}>
                  <Image
                    source={require("../../assets/medicine.jpg")}
                    style={styles.image}
                  />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.description}>Rs. {item.price}</Text>
                  <View style={styles.quantityView}>
                    <TouchableOpacity>
                      <Icon name="remove" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => {}}>
                      <Icon name="add" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ width: "10%" }}
                  onPress={() => {
                    deleteItem(item.id);
                  }}
                >
                  <Icon name="delete" size={28} />
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 20,
              alignSelf: "center",
              padding: 15,
              backgroundColor: COLORS.primaryColor,
              borderRadius: 50,
              elevation: 5,
            }}
            onPress={() => {
              removeAll();
              alert("Order Placed!");
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.secondaryColor,
              }}
            >
              Place Order!
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Alt text="No items in the cart" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
    paddingTop: 20,
  },
  title: {
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: 20,
  },
  headerItems: {
    width: "33%",
  },
  removeAll: { alignItems: "flex-end", justifyContent: "center" },
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
    width: "30%",
    borderRadius: 15,
    backgroundColor: "#59b2ab",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  quantityView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "60%",
    marginTop: 5,
  },
  quantityText: { fontSize: 15, fontWeight: "bold" },
  image: {
    borderRadius: 15,
    height: 110,
    width: 110,
  },
  textView: { paddingHorizontal: 10, paddingVertical: 10, width: "50%" },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#585a61",
  },
  description: { fontSize: 15, color: "#b1e5d3" },
});
