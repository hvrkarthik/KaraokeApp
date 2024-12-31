import { Alert } from 'react-native';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

import { MainStackParamList } from "../NavigationParamList";

type ScreenOneProps = {
  route: RouteProp<MainStackParamList, "One">;
  navigation: StackNavigationProp<MainStackParamList, "One">;
};

export function ScreenOne({ navigation }: ScreenOneProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Tapped!")}
      >
        <Text style={styles.buttonText}>Tap me for an alert</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Two", { message: "Hello, world!" })}
      >
        <Text style={styles.buttonText}>Go to next screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
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
