import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../constants/colors";

export default function DrawerButton({ onPress, icon, text }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonView}>
        <Icon name={icon} size={22} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
