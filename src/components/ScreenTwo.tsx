import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

import { MainStackParamList } from "../NavigationParamList";

type ScreenTwoProps = {
  route: RouteProp<MainStackParamList, "Two">;
  navigation: StackNavigationProp<MainStackParamList, "Two">;
};

export function ScreenTwo({ navigation, route }: ScreenTwoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You're viewing screen two!</Text>
      <Text style={styles.text}>Message: {route.params.message}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "yellow",
    alignItems: "center",
    padding: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    color: "black",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2e6ddf",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
