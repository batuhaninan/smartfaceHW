import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { Provider as PaperProvider } from "react-native-paper";

import NotFoundScreen from '../screens/NotFoundScreen';
import StudentScreen from '../screens/StudentScreen';
import TeacherScreen from '../screens/TeacherScreen';
import PrincipalScreen from '../screens/PrincipalScreen';
import LinkingConfiguration from './LinkingConfiguration';
import LandingScreen from "../screens/LandingScreen";
import SignupScreen from "../screens/SignupScreen";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <PaperProvider>
      <NavigationContainer
        linking={LinkingConfiguration}
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


// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

  // return (
    // <BottomTab.Screen
    //   name="Landing"
    //   component={LandingScreen}
    //   options={({ navigation }: RootTabScreenProps<'Landing'>) => ({
    //     title: 'Landing',
    //     tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart-2" color={color} />,
    //   })}
    // />
    // <BottomTab.Screen

        // component={LandingScreen}
      // />
    // <BottomTab.Navigator
    //   initialRouteName="StudentScreen"
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme].tint,
    //   }}>
    //   <BottomTab.Screen
    //     name="Landing"
    //     component={LandingScreen}
    //     options={({ navigation }: RootTabScreenProps<'Landing'>) => ({
    //       title: 'Landing',
    //       tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart-2" color={color} />,
    //     })}
    //   />
    //   <BottomTab.Screen
    //     name="StudentScreen"
    //     component={StudentScreen}
    //     options={({ navigation }: RootTabScreenProps<'StudentScreen'>) => ({
    //       title: 'Student',
    //       tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart-2" color={color} />,
    //     })}
    //   />
    //   <BottomTab.Screen
    //     name="TeacherScreen"
    //     component={TeacherScreen}
    //     options={{
    //       title: 'Teacher',
    //       tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart-2" color={color} />,
    //     }}
    //   />
    //   <BottomTab.Screen
    //     name="PrincipalScreen"
    //     component={PrincipalScreen}
    //     options={{
    //       title: 'Principal',
    //       tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart-2" color={color} />,
    //     }}
    //   />
    // </BottomTab.Navigator>
  // );
// }


// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof Feather>['name'];
//   color: string;
// }) {
//   return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
// }
