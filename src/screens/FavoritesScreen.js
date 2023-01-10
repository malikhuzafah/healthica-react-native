import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
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
import Alt from "../components/Alt";
import FullWidthCard from "../components/FullWidthCard";

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
        getDoc(doc(db, "products", `${document.data().medicineId}`))
          .then((docData) => {
            if (docData.exists()) {
              let item = docData.data();
              tempMedicines.push({ ...item, id: document.id });
              setfavorites(tempMedicines);
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
            <FullWidthCard
              item={item}
              icon="heart"
              iconColor={COLORS.favorite}
              onPress={() => {
                deleteItem(item.id);
              }}
            />
          )}
        />
      ) : (
        <Alt text="No favorites yet" />
      )}
      <BottomTabs navigation={navigation} />
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
  headerItem: {
    width: "33%",
  },
  removeAllButton: { alignItems: "flex-end", justifyContent: "center" },
});
