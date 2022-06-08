import React, { Component } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import firebase from "../../firebase";

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

class ListDetails extends Component {
  constructor() {
    super();
    this.state = {
      unit: "",
      datetime: new Date(),
      bio: "",
      isLoading: true,
    };
  }
  componentDidMount() {
    const dbRef = firebase
      .firestore()
      .collection("TodoList")
      .doc(this.props.route.params.userkey);
    dbRef.get().then((res) => {
      if (res.exists) {
        const entry = res.data();
        this.setState({
          key: entry.id,
          unit: entry.unit,
          datetime: entry.datetime,
          bio: entry.bio,
          isLoading: false,
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase
      .firestore()
      .collection("TodoList")
      .doc(this.state.key);
    updateDBRef
      .set({
        unit: this.state.unit,
        datetime: this.state.datetime,
        bio: this.state.bio,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          unit: "",
          datetime: new Date(),
          bio: "",
          isLoading: false,
        });
        this.props.navigation.navigate("To Do List");
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }
  deleteUser() {
    const dbRef = firebase
      .firestore()
      .collection("TodoList")
      .doc(this.props.route.params.userkey);
    dbRef.delete().then((res) => {
      console.log("Item removed from database");
      this.props.navigation.navigate("To Do List");
    });
  }
  openTwoButtonAlert = () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this.deleteUser() },
        {
          text: "No",
          onPress: () => console.log("No item was removed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Unit #"}
            value={this.state.unit}
            onChangeText={(val) => this.inputValueUpdate(val, "unit")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={"Date"}
            value={
              this.state.datetime
                ? new Date(this.state.datetime?.seconds * 1000).toDateString() +
                  " at " +
                  new Date(
                    this.state.datetime?.seconds * 1000
                  ).toLocaleTimeString()
                : "No date"
            }
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Work Completed"}
            multiline
            value={this.state.bio}
            onChangeText={(val) => this.inputValueUpdate(val, "bio")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Update"
            onPress={() => this.updateUser()}
            color="#19AC52"
          />
        </View>
        <View>
          <Button
            title="Delete"
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 7,
  },
});
export default ListDetails;
