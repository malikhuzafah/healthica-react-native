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
import { getDocs, collection, query, where } from "firebase/firestore";

export default function UserProductsScreen({ navigation }) {
  const user = auth.currentUser;
  const [userMedicines, setUserMedicines] = useState([]);

  const getMedicines = async () => {
    if (!user) {
      navigation.navigate("Auth");
      return;
    }
    getDocs(
      query(collection(db, "products"), where("createrId", "==", user.uid))
    ).then((docSnap) => {
      let tempMedicines = [];
      docSnap.forEach((docSnap) => {
        tempMedicines.push({ ...docSnap.data(), id: docSnap.id });
      });
      setUserMedicines(tempMedicines);
    });
  };

  useEffect(() => {
    getMedicines();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ebeffa" />
      <View style={styles.header}>
        <Icon
          style={styles.icon}
          name="arrow-back"
          size={28}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Your Products</Text>
      </View>

      {userMedicines.length > 0 ? (
        <>
          <FlatList
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 100,
              paddingStart: 20,
              paddingEnd: 20,
            }}
            data={userMedicines}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardView}>
                  <Image
                    source={require("../../assets/login.png")}
                    style={styles.image}
                  />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.description}>Rs. {item.price}</Text>
                </View>
                <TouchableOpacity
                  style={{ width: "10%" }}
                  onPress={() => {
                    navigation.navigate("EditProduct", { item });
                  }}
                >
                  <Icon name="edit" size={28} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20 }}>
            You have not added any products yet
          </Text>
        </View>
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
    backgroundColor: "#ebeffa",
    paddingTop: 20,
  },
  title: {
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: 20,
  },
  removeAllButton: {
    width: "33%",
  },
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
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#585a61",
  },
  description: { fontSize: 15, color: "#b1e5d3" },
  icon: { position: "absolute", left: 20 },
});
