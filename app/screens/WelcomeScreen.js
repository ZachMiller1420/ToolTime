import colors from "../config/colors";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import firebase from "../../firebase";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  userLogin = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res);
          console.log("User logged-in successfully!");
          this.setState({
            isLoading: false,
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Home");
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/Login.jpeg")}
        >
          <View style={styles.logo}>
            <Image
              style={styles.logo}
              source={require("../assets/ToolTime.png")}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, "email")}
              />
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(val) => this.updateInputVal(val, "password")}
                maxLength={15}
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => this.userLogin()}
              >
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => this.props.navigation.navigate("Register")}
              >
                <Text style={styles.registerText}>
                  Don't have account? Click here to register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  registerText: {
    color: "#3740FE",
    fontSize: 14,
  },
  registerButton: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  loginText: {
    color: colors.white,
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  logo: {
    marginTop: 25,
    alignContent: "center",
    width: 350,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    backgroundColor: colors.white,
    width: "100%",
    height: "85%",
    borderRadius: 25,
    paddingTop: 45,
    marginBottom: 200,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },

  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
