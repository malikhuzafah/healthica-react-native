import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { auth, db } from "../screens/Firebase";
import COLORS from "../constants/colors";
import DrawerButton from "./DrawerButton";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Drawer({ navigation }) {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (!auth.currentUser) navigation.navigate("Auth");
          }}
        >
          <Image
            style={styles.image}
            source={require("../../assets/profile.png")}
          />
        </TouchableOpacity>
        <Text style={styles.username}>
          {auth.currentUser ? userName : "Guest"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.push("UserProducts");
        }}
      >
        <View style={styles.buttonView}>
          <Icon name="person" size={22} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Your Products</Text>
        </View>
      </TouchableOpacity>
      {auth.currentUser ? (
        <DrawerButton
          onPress={() => {
            auth.signOut();
            navigation.navigate("Auth");
          }}
          icon="log-out"
          text="Signout"
        />
      ) : (
        <DrawerButton
          onPress={() => {
            navigation.navigate("Auth");
          }}
          icon="log-in"
          text="Login"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.primaryColor,
    height: "35%",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: 100, width: 100 },
  username: { color: "white", fontSize: 20, marginTop: 10 },
  buttonView: {
    height: 70,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.bottomTabs,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row",
    paddingStart: 20,
  },
  buttonIcon: { color: COLORS.primaryColor, width: "20%" },
  buttonText: {
    color: COLORS.primaryColor,
    fontWeight: "bold",
    fontSize: 15,
    width: "60%",
  },
});
