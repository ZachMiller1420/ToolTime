import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./app/navigation/AuthNavigator";
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  NativeBaseProvider,
} from "native-base";

export default () => (
  <NavigationContainer>
    <AuthNavigator />
  </NavigationContainer>
);
