import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth, db } from "./Firebase.js";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import COLORS from "../constants/colors.js";

export default function EditProduct({ navigation }) {
  const medicine = navigation.getParam("item");

  useEffect(() => {
    if (auth.currentUser == null) {
      navigation.navigate("Auth");
    }
  }, []);

  const [title, setTitle] = useState(medicine.title);
  const [price, setPrice] = useState(medicine.price);
  const [description, setDescription] = useState(medicine.description);
  const [image, setImage] = useState(medicine.image);
  const [quantity, setQuantity] = useState(medicine.quantity);

  const updateMedicine = () => {
    updateDoc(doc(db, "products", medicine.id), {
      title,
      price,
      description,
      image,
      quantity,
    })
      .then(() => {
        navigation.replace("UserProducts");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMedicine = () => {
    deleteDoc(doc(db, "products", `${medicine.id}`));
    navigation.push("UserProducts");
  };

  return (
    <View behavior="padding" style={styles.container}>
      <StatusBar backgroundColor={COLORS.bottomTabs} />
      <View style={styles.header}>
        <Icon name="close" size={28} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.addContainer}>
        <Text style={styles.addText}>Update Medicine</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={(text) =>
              setPrice(parseFloat(text) ? parseFloat(text) : 0)
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Quantity"
            value={quantity}
            onChangeText={(text) =>
              setQuantity(parseInt(text) ? parseInt(text) : 0)
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Image"
            value={image}
            onChangeText={(text) => setImage(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={updateMedicine} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={deleteMedicine} style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bottomTabs,
  },
  addContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.primaryColor,
    width: "100%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  addText: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.primaryColor,
    marginBottom: 20,
  },
});
