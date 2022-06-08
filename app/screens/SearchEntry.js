import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  TextInput,
} from "react-native";
import { List, NativeBaseProvider } from "native-base";
import { ListItem, SearchBar } from "react-native-elements";
import colors from "../config/colors";
import { query, orderBy, limit } from "firebase/firestore";
import _ from "lodash";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, connectSearchBox } from "react-instantsearch-native";
import PropTypes from "prop-types";
import styles from "../config/styles";
import firebase from "../../firebase";

class SearchEntry extends Component {
  constructor(props) {
    super(props);
    this.firestoreRef = firebase
      .firestore()
      .collection("RepairDocuments")
      .orderBy("datetime", "desc");

    this.state = {
      isLoading: true,
      entryArr: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const entryArr = [];
    querySnapshot.forEach((res) => {
      const { unit, datetime, bio } = res.data();
      entryArr.push({
        key: res.id,
        res,
        unit,
        datetime,
        bio,
      });
    });
    this.setState({
      entryArr,
      isLoading: false,
    });
  };

  render() {
    const { search } = this.state;

    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        {this.state.entryArr.map((res, i) => {
          return (
            <ListItem
              key={i}
              onPress={() => {
                this.props.navigation.navigate("Details", {
                  userkey: res.key,
                });
              }}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{res.unit}</ListItem.Title>
                <ListItem.Subtitle>
                  {res.datetime
                    ? new Date(res.datetime?.seconds * 1000).toDateString() +
                      " at " +
                      new Date(
                        res.datetime?.seconds * 1000
                      ).toLocaleTimeString()
                    : "No date"}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="black" />
            </ListItem>
          );
        })}
      </ScrollView>
    );
  }
}

export default SearchEntry;
