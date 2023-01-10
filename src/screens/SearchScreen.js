import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { db } from "./Firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import SearchBar from "../components/SearchBar";
import FullWidthCard from "../components/FullWidthCard";
import COLORS from "../constants/colors";

export default function SeacrhScreen({ navigation }) {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState("");

  const searchMedicines = async () => {
    getDocs(query(collection(db, "products"), where("title", "==", term))).then(
      (docSnap) => {
        let tempMedicines = [];
        docSnap.forEach((doc) => {
          tempMedicines.push({ ...doc.data(), id: doc.id });
        });
        setResults(tempMedicines);
      }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondaryColor} />
      <View style={styles.header}>
        <Icon
          style={styles.icon}
          name="arrow-back"
          size={28}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Search Medicines</Text>
      </View>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => searchMedicines()}
      />
      <View style={styles.resultsText}>
        <Text>
          {term
            ? results.length > 0
              ? `Showing results for "${term}"`
              : "No results found"
            : "Search for a medicine"}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 100,
          paddingStart: 20,
          paddingEnd: 20,
        }}
        data={results}
        renderItem={({ item }) => (
          <FullWidthCard
            item={item}
            icon="arrow-forward"
            onPress={() => navigation.navigate("Product", { item })}
          />
        )}
      />
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
  icon: { position: "absolute", left: 20 },
  title: {
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: 20,
  },
  resultsText: { justifyContent: "center", alignItems: "center", padding: 10 },
});
