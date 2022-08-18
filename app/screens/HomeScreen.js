import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import LargeButton from "../components/LargeButton";
import { auth } from "../../firebase";
function HomeScreen({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Welcome");
      })
      .catch((error) => alert(error.message));
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerLogo}
          source={require("../assets/WordLogo.jpeg")}
        />
      </View>
      <View style={styles.user}>
        <Text>USER: {auth.currentUser?.email}</Text>
      </View>
      <Image
        style={styles.background}
        source={require("../assets/Login.jpeg")}
      />
      
      <TouchableOpacity style={styles.entryButton}>
        <MaterialCommunityIcons
          name="hammer-wrench"
          size={80}
          color="white"
          onPress={() => navigation.navigate("Entry")}
        />
        <Text style={styles.tileTitle}>Create Entry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton}>
        <MaterialCommunityIcons
          name="cloud-search"
          size={80}
          color="white"
          onPress={() => navigation.navigate("Search")}
        />
        <Text style={styles.tileTitle}>View Entry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.todoButton}>
        <MaterialCommunityIcons
          name="playlist-edit"
          size={90}
          color="white"
          onPress={() => navigation.navigate("List")}
        />
        <Text style={styles.tileLower}>Create List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.quotesButton}>
        <MaterialCommunityIcons
          name="view-list-outline"
          size={90}
          color="white"
          onPress={() => navigation.navigate("To Do List")}
        />
        <Text style={styles.tileLower}>View List</Text>
      </TouchableOpacity>
      
      <View style={styles.logoutContainer}>
        <LargeButton title="LogOut" color="secondary" onPress={handleSignOut} />
      </View>
    </View>
    
  );
}
const styles = StyleSheet.create({
  tileLower: {
    paddingTop: 5,
    fontWeight: "bold",
  },
  tileTitle: {
    paddingTop: 15,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#000",
  },

  background: {
    height: "100%",
    width: "100%",
  },

  entryButton: {
    position: "absolute",
    top: 175,
    left: 60,
    width: 100,
    height: 100,
    backgroundColor: colors.black,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.darkgrey,
    alignItems: "center",
  },

  searchButton: {
    position: "absolute",
    top: 175,
    right: 60,
    width: 100,
    height: 100,
    backgroundColor: colors.black,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.darkgrey,
    alignItems: "center",
  },

  todoButton: {
    position: "absolute",
    top: 375,
    left: 60,
    width: 100,
    height: 100,
    backgroundColor: colors.black,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.darkgrey,
    alignItems: "center",
  },

  quotesButton: {
    position: "absolute",
    top: 375,
    right: 60,
    width: 100,
    height: 100,
    backgroundColor: colors.black,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.darkgrey,
    alignItems: "center",
  },

  logoutContainer: {
    position: "absolute",
    bottom: 185,
    width: "100%",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    marginBottom: 10,
  },

  headerLogo: {
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  user: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
  },
});

export default HomeScreen;
