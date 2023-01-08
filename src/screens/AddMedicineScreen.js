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
import { doc, collection, updateDoc, getDoc, setDoc } from "firebase/firestore";
import COLORS from "../constants/colors.js";

export default function AddMedicineScreen({ navigation }) {
  const creater = auth.currentUser;

  useEffect(() => {
    if (auth.currentUser == null) {
      navigation.navigate("Auth");
    }
  }, []);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");

  const addMedicine = () => {
    setDoc(doc(collection(db, "products")), {
      title,
      price,
      description,
      image,
      quantity,
      createrId: creater.uid,
    })
      .then(() => {
        alert("Medicine added");
        navigation.push("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View behavior="padding" style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondaryColor} />
      <View style={styles.header}>
        <Icon name="close" size={28} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.addContainer}>
        <Text style={styles.addText}>Add Medicine</Text>
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
          <TouchableOpacity onPress={addMedicine} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
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
    backgroundColor: COLORS.secondaryColor,
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
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
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
    color: "#0782F9",
  },
});
