import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CreateEntry from "../screens/CreateEntry";
import ToDoList from "../screens/ToDoList";
import SearchEntry from "../screens/SearchEntry";
import EntryDetails from "../screens/EntryDetails";
import ViewList from "../screens/ViewList";
import ListDetails from "../screens/ListDetails";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Entry" component={CreateEntry} />
    <Stack.Screen name="Search" component={SearchEntry} />
    <Stack.Screen name="List" component={ToDoList} />
    <Stack.Screen name="Details" component={EntryDetails} />
    <Stack.Screen name="To Do List" component={ViewList} />
    <Stack.Screen name="List Details" component={ListDetails} />
  </Stack.Navigator>
);

export default AuthNavigator;
