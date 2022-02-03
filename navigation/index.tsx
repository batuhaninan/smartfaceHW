import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import NotFoundScreen from '../screens/NotFoundScreen';
import StudentScreen from '../screens/StudentScreen';
import TeacherScreen from '../screens/TeacherScreen';
import PrincipalScreen from '../screens/PrincipalScreen';
import LandingScreen from "../screens/LandingScreen";
import SignupScreen from "../screens/SignupScreen";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <PaperProvider>
      <NavigationContainer
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}


const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={LandingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PrincipalScreen" component={PrincipalScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StudentScreen" component={StudentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TeacherScreen" component={TeacherScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
