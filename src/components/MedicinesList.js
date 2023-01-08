import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { db } from "../screens/Firebase.js";
import { getDocs, collection } from "firebase/firestore";
import Card from "../components/Card.js";
import COLORS from "../constants/colors.js";

export default function MedicinesList({ navigation }) {
  const [medicines, setMedicines] = useState([]);

  const getData = () => {
    getDocs(collection(db, "products")).then((docSnap) => {
      let tempMedicines = [];
      docSnap.forEach((doc) => {
        tempMedicines.push({ ...doc.data(), id: doc.id });
      });
      setMedicines(tempMedicines);
    });
  };

  useEffect(getData, []);

  return (
    <FlatList
      columnWrapperStyle={{ justifyContent: "space-evenly" }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        marginTop: 10,
        paddingBottom: 100,
        backgroundColor: COLORS.secondaryColor,
      }}
      numColumns={2}
      data={medicines}
      renderItem={({ item }) => <Card item={item} navigation={navigation} />}
    />
  );
}
