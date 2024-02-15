// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/home';
import Task from './src/screens/task';
import Profile from './src/screens/profile';
import Calendar from './src/screens/calendar';
import StartScreen from './src/screens/StartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="Task" component={Task} /> */}
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
        {/* <Stack.Screen name="Calendar" component={Calendar} /> */}
        {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}