import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function SearchBar({ term, onTermChange, onTermSubmit }) {
  return (
    <View style={style.background}>
      <TextInput
        placeholder="Search"
        style={style.inputStyle}
        value={term}
        onChangeText={(newTerm) => onTermChange(newTerm)}
        onEndEditing={() => onTermSubmit()}
        onSubmitEditing={() => onTermSubmit()}
      />
      <Icon name="search" size={25} onPress={onTermSubmit} />
    </View>
  );
}
const style = StyleSheet.create({
  background: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    fontWeight: "bold",
    fontSize: 18,
    width: "95%",
  },
});
