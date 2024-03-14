// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Calendar from '../screens/calendar';
import AddTaskScreen from '../screens/AddTaskScreen';
import Pandora from '../screens/Pandora';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
        <Stack.Screen name="Pandora" component={Pandora} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
