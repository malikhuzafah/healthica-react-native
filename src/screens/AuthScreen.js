import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth, db } from "./Firebase.js";
import { doc, setDoc, collection } from "firebase/firestore";
import COLORS from "../constants/colors";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [newUser, setNewUser] = useState(false);

  const handleSignUp = () => {
    if (!newUser) {
      setNewUser(true);
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    auth
      .createUserWithEmailAndPassword({
        displayName,
        email,
        password,
      })
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("registered with: ", user.email);
        setDoc(doc(collection(db, "users")), {
          userId: auth.currentUser.uid,
          name: displayName,
        })
          .then(() => {
            console.log("data saved");
          })
          .catch((error) => {
            console.log(error.message);
          });
        navigation.push("Home");
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    if (newUser) {
      setNewUser(false);
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.uid);
        navigation.push("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View behavior="padding" style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryColor} />
      <View style={styles.header}>
        <Text style={styles.title}>Healthica</Text>
        <Icon
          color={COLORS.backgroundColor}
          name="close"
          size={28}
          onPress={() => navigation.push("Home")}
        />
      </View>
      <View style={styles.authContainer}>
        <Image
          style={styles.image}
          source={
            newUser
              ? require("../../assets/signup.png")
              : require("../../assets/login.png")
          }
        />

        <View style={styles.inputContainer}>
          {newUser ? (
            <TextInput
              placeholder="Name"
              value={displayName}
              onChangeText={(text) => setDisplayName(text)}
              style={styles.input}
            />
          ) : null}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          {newUser ? (
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          ) : (
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.forgotPassText}>Forgot password?</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={newUser ? handleSignUp : handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {newUser ? "Sign up" : "Login"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={newUser ? handleLogin : handleSignUp}>
            <Text style={styles.changeAuthText}>
              {newUser
                ? "Already have an account? Login!"
                : "Don't have an account? Signup!"}
            </Text>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.backgroundColor,
    fontSize: 28,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: COLORS.secondaryColor,
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
    backgroundColor: COLORS.bottomTabs,
    width: "100%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.primaryColor,
    fontWeight: "700",
    fontSize: 16,
  },
  forgotPassText: {
    marginTop: 10,
    textAlign: "right",
    color: COLORS.backgroundColor,
  },
  image: { height: 200, width: 200, resizeMode: "contain" },
  changeAuthText: {
    textDecorationLine: "underline",
    marginTop: 10,
    color: COLORS.backgroundColor,
  },
});
