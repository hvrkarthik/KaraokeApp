import { NavigationContainer } from '@react-navigation/native';
import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { KaraokeScreen } from "./KaraokeScreen";

const Stack = createStackNavigator();

export const MainStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Karaoke"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#2e6ddf",
                },
                headerTintColor: "#ffffff",
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="Karaoke"
                component={KaraokeScreen}
                options={{
                    title: "Karaoke Studio"
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);