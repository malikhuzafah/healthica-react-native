import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../constants/colors";

export default function BottomTabs({ navigation }) {
  return (
    <KeyboardAvoidingView>
      <View style={styles.tabView}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.replace("Home")}
        >
          <View style={styles.tab}>
            <Icon style={styles.tabIcon} name="home" size={25} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, styles.addButton]}
          onPress={() => navigation.push("AddMedicine")}
        >
          <View style={styles.tab}>
            <Icon
              style={[styles.tabIcon, { color: COLORS.primaryColor }]}
              name="add"
              size={40}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Favorites")}
        >
          <View style={styles.tab}>
            <Icon style={styles.tabIcon} name="heart" size={25} />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: COLORS.primaryColor,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  tabButton: {
    width: "33%",
  },
  tab: {
    alignItems: "center",
  },
  tabIcon: {
    color: COLORS.secondaryColor,
  },
  addButton: {
    backgroundColor: COLORS.bottomTabs,
    borderRadius: 50,
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
