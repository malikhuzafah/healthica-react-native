import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth, db } from "./Firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import COLORS from "../constants/colors";
import Alt from "../components/Alt";
import FullWidthCard from "../components/FullWidthCard";

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
      <StatusBar backgroundColor={COLORS.secondaryColor} />
      <View style={styles.header}>
        <Icon
          style={styles.icon}
          name="arrow-back"
          size={28}
          onPress={() => navigation.push("Home")}
        />
        <Text style={styles.title}>Your Products</Text>
      </View>

      {userMedicines.length > 0 ? (
        <FlatList
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 100,
            paddingStart: 20,
            paddingEnd: 20,
          }}
          data={userMedicines}
          renderItem={({ item }) => (
            <FullWidthCard
              item={item}
              icon="create"
              onPress={() => {
                navigation.navigate("EditProduct", { item });
              }}
            />
          )}
        />
      ) : (
        <Alt text="You have not added any products yet" />
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
  icon: { position: "absolute", left: 20 },
});
