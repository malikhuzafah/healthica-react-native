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
import Icon from "react-native-vector-icons/Ionicons";
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
import BottomTabs from "../components/BottomTabs";
import COLORS from "../constants/colors";

export default function FavoritesScreen({ navigation }) {
  const user = auth.currentUser;
  const [favorites, setfavorites] = useState([]);

  const removeAll = () => {
    favorites.forEach((item) => {
      deleteDoc(doc(db, "userFavorites", item.id));
    });
    setfavorites([]);
  };
  const deleteItem = (id) => {
    deleteDoc(doc(db, "userFavorites", `${id}`));
    setfavorites(favorites.filter((item) => item.id !== id));
  };

  const getfavorites = () => {
    if (!user) {
      navigation.navigate("Auth");
      return;
    }
    getDocs(
      query(collection(db, "userFavorites"), where("userId", "==", user.uid))
    ).then((docSnap) => {
      let tempMedicines = [];
      docSnap.forEach((document) => {
        console.log("called");

        getDoc(doc(db, "products", `${document.data().medicineId}`))
          .then((docData) => {
            if (docData.exists()) {
              let item = docData.data();
              tempMedicines.push({ ...item, id: document.id });
              setfavorites(tempMedicines);
            } else {
              console.log("no such data exists");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  useEffect(() => {
    getfavorites();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondaryColor} />
      <View style={styles.header}>
        <View style={styles.headerItem}></View>
        <View style={styles.headerItem}>
          <Text style={styles.title}>Favorites</Text>
        </View>
        <View style={[styles.headerItem, styles.removeAllButton]}>
          <TouchableOpacity onPress={removeAll}>
            <Text>Remove all</Text>
          </TouchableOpacity>
        </View>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 100,
            paddingStart: 20,
            paddingEnd: 20,
          }}
          data={favorites}
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
                <Text style={styles.itemPrice}>Rs. {item.price}</Text>
              </View>
              <TouchableOpacity
                style={{ width: "10%" }}
                onPress={() => {
                  deleteItem(item.id);
                }}
              >
                <Icon
                  style={{ color: COLORS.favorite }}
                  name="heart"
                  size={28}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={styles.alternateView}>
          <Text style={styles.altText}>No favorites yet</Text>
        </View>
      )}
      <BottomTabs navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  alternateView: { flex: 1, alignItems: "center", justifyContent: "center" },
  altText: { fontSize: 20 },
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
  headerItem: {
    width: "33%",
  },
  removeAllButton: { alignItems: "flex-end", justifyContent: "center" },
  resultsText: { justifyContent: "center", alignItems: "center", padding: 10 },
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
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  image: {
    borderRadius: 15,
    height: 110,
    width: 110,
  },
  textView: { paddingHorizontal: 10, paddingVertical: 10, width: "50%" },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.primaryText,
  },
  itemPrice: { fontSize: 15, color: COLORS.primaryText },
});
