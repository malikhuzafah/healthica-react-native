import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";

export default function Alt({ text }) {
  return (
    <View style={styles.altView}>
      <Text style={styles.altText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  altView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  altText: {
    fontSize: 20,
  },
});
