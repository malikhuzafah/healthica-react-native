import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from "react-native";
import HomeHeader from "../components/HomeHeader.js";
import MedicinesList from "../components/MedicinesList.js";
import Icon from "react-native-vector-icons/Ionicons";
import BottomTabs from "../components/BottomTabs.js";
import COLORS from "../constants/colors.js";
import Drawer from "../components/Drawer.js";

export default function HomeScreen({ navigation }) {
  const drawer = useRef(null);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => <Drawer navigation={navigation} />}
    >
      <View
        style={[styles.container, { backgroundColor: COLORS.secondaryColor }]}
      >
        <View style={styles.header}>
          <StatusBar
            animated={true}
            backgroundColor={COLORS.primaryColor}
            barStyle={"light-content"}
            showHideTransition={"slide"}
          />

          <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
            <Icon style={{ color: "white" }} name="menu" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <Icon style={{ color: "white" }} name="cart" size={28} />
          </TouchableOpacity>
        </View>
        <HomeHeader navigation={navigation} />
        <MedicinesList navigation={navigation} />
        <BottomTabs navigation={navigation} />
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primaryColor,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
