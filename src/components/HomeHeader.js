import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../screens/Firebase.js";
import { getDocs, collection, query, where } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../constants/colors.js";

export default function HomeHeader({ navigation }) {
  const currentUser = auth.currentUser;
  const [userName, setUserName] = useState("");

  const getCurrentUserName = () => {
    if (!currentUser) {
      return;
    }
    getDocs(
      query(collection(db, "users"), where("userId", "==", currentUser.uid))
    )
      .then((docSnap) => {
        setUserName(docSnap.docs[0].data().name);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getCurrentUserName();
  }, []);

  return (
    <>
      <View style={styles.upperContainer}>
        <View style={styles.upperInnerContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              Hi {currentUser ? userName : "Guest"},
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
              <Image
                source={require("../../assets/profile.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <LinearGradient
        colors={["rgba(37, 46, 47, 0.4)", "transparent"]}
        style={styles.linearGradient}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <View style={styles.searchBar}>
            <Text>Search</Text>
            <Icon name="search" size={25} />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: COLORS.primaryColor,
    height: "20%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingBottom: 20,
  },
  upperInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
    backgroundColor: "transparent",
  },
  nameContainer: { width: "50%" },
  nameText: {
    fontSize: 28,
    color: "#FFF",
    fontWeight: "bold",
  },
  imageContainer: { width: "50%", alignItems: "flex-end" },
  image: { height: 60, width: 60 },
  linearGradient: {
    left: 0,
    right: 0,
    height: 90,
    marginTop: -45,
  },
  searchBar: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
