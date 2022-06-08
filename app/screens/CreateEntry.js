import React, { Component, useState } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingViewBase,
} from "react-native";
import LargeButton from "../components/LargeButton";
import colors from "../config/colors";
import firebase from "../../firebase";
import DatePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class CreateEntry extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("RepairDocuments");

    this.state = {
      unit: "",
      datetime: new Date(),
      bio: "",
      isLoading: false,
    };
  }

  onChange = (event, selectedDate) => {
    const showFlag = Platform.OS === "ios";
    this.setState({ show: showFlag });
    this.inputValueUpdate(selectedDate, "datetime");
  };

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  storeEntry() {
    if (this.state.unit === "") {
      alert("Please fill out unit #");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          unit: this.state.unit,
          datetime: this.state.datetime,
          bio: this.state.bio,
        })
        .then((res) => {
          this.setState({
            unit: "",
            datetime: new Date(),
            bio: "",
            isLoading: false,
          });
          this.props.navigation.navigate("Home");
        })
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
      showMode = (currentMode) => {
        this.setState({ show: true });
        this.setState({ mode: currentMode });
      };
      showDatepicker = () => {
        this.showMode("date");
      };
    }

    return (
      <ImageBackground
        style={styles.background}
        source={require("../assets/Login.jpeg")}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.headerLogo}
              source={require("../assets/WordLogo.jpeg")}
            />
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.inputGroup}>
              <TextInput
                placeholder={"Enter Unit #"}
                value={this.state.unit}
                onChangeText={(val) => this.inputValueUpdate(val, "unit")}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.datePicker}>
                <DatePicker
                  testID="dateTimePicker"
                  value={this.state.datetime}
                  display="inline"
                  onChange={this.onChange}
                  dateFormat="dd/MM/yyyy h:mm aa"
                />
              </View>
            </View>

            <View style={styles.story}>
              <TextInput
                placeholder={"Enter Work Completed"}
                multiline
                value={this.state.bio}
                onChangeText={(val) => this.inputValueUpdate(val, "bio")}
              />
            </View>

            <LargeButton
              title="submit"
              color="secondary"
              onPress={() => this.storeEntry()}
            />
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  headerLogo: {
    width: "100%",
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
  },
  backArrow: {
    marginHorizontal: 5,
  },

  homeButton: {
    marginHorizontal: 5,
  },

  input: {
    backgroundColor: colors.white,
    marginVertical: 20,
    width: "90%",
    height: 50,
    paddingLeft: 10,
  },
  container: {
    justifyContent: "center",
  },
  story: {
    backgroundColor: colors.white,

    width: "100%",
    height: 100,
    borderRadius: 5,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    paddingLeft: 10,
  },
  inputGroup: {
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 15 : 0,
    borderRadius: 5,
    color: colors.black,
    fontSize: 17,
    marginBottom: 10,
    backgroundColor: colors.white,
    width: "100%",
  },
});
export default CreateEntry;
