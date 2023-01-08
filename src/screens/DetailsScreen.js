import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth, db } from "./Firebase";
import {
  doc,
  deleteDoc,
  collection,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import COLORS from "../constants/colors";

export default function DetailsScreen({ navigation }) {
  const currentUser = auth.currentUser;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const medicine = navigation.getParam("item");

  const addToCart = () => {
    if (!currentUser) {
      navigation.navigate("Auth");
      return;
    }
    setDoc(doc(collection(db, "cart")), {
      userId: auth.currentUser.uid,
      medicineId: medicine.id,
      quantity: quantity,
    })
      .then(() => {
        alert("Added to cart");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const toggleFavorites = () => {
    if (!auth.currentUser) {
      navigation.navigate("Auth");
      return;
    }
    if (isFavorite) {
      let id;
      getDocs(
        query(
          collection(db, "userFavorites"),
          where(
            "userId",
            "==",
            currentUser.uid,
            "medicineId",
            "==",
            medicine.id
          )
        )
      ).then((docSnap) => {
        id = docSnap.doc.data().id;
      });
      deleteDoc(doc(db, "userFavorites", id));
    } else {
      setDoc(doc(collection(db, "userFavorites")), {
        userId: currentUser.uid,
        medicineId: medicine.id,
      })
        .then(() => {
          console.log("data saved");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    setIsFavorite(isFavorite ? false : true);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    getDocs(
      query(
        collection(db, "userFavorites"),
        where("userId", "==", currentUser.uid, "medicineId", "==", medicine.id)
      )
    )
      .then((docSnap) => {
        if (docSnap.doc) {
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../../assets/medicine.jpg")}
      >
        <StatusBar backgroundColor="transparent" translucent />
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            size={28}
            onPress={() => navigation.goBack()}
          />
          <TouchableOpacity onPress={toggleFavorites}>
            {isFavorite ? (
              <Icon
                name="favorite"
                size={28}
                style={{ color: COLORS.favorite }}
              />
            ) : (
              <Icon name="favorite-border" size={28} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsView}>
            <Text style={styles.titleText}>{medicine.title}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.priceTagText}>Rs. {medicine.price}</Text>
            </View>
          </View>
          <View style={styles.descriptionView}>
            <Text style={styles.descriptionTitle}>About</Text>
            <Text style={styles.description}>{medicine.description}</Text>
            <View style={styles.bottomButtonsView}>
              <View style={styles.setQuantityView}>
                <View style={styles.borderBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <Text style={styles.borderBtnText}>-</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.quantityText}>{quantity}</Text>
                <View style={styles.borderBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      if (quantity < medicine.quantity) {
                        setQuantity(quantity + 1);
                      } else {
                        alert("Sorry, we are out of stock");
                      }
                    }}
                  >
                    <Text style={styles.borderBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.addToCart}>
                <TouchableOpacity onPress={addToCart}>
                  <Text style={styles.addToCartText}>Add to cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: { flex: 1, height: "70%", justifyContent: "center" },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  detailsContainer: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
    position: "absolute",
    height: "50%",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
    paddingTop: 30,
  },
  detailsView: {
    marginLeft: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: { fontSize: 22, fontWeight: "bold" },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: "bold", fontSize: 28 },
  addToCart: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  priceTag: {
    backgroundColor: COLORS.primaryColor,
    width: 80,
    height: 40,
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  priceTagText: {
    marginLeft: 15,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  descriptionView: { paddingHorizontal: 20, marginTop: 10 },
  descriptionTitle: { fontSize: 20, fontWeight: "bold" },
  description: {
    color: "grey",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  bottomButtonsView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  setQuantityView: {
    flexDirection: "row",
    alignItems: "center",
  },
});
