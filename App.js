import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/home';
import Task from './src/screens/task';
import Profile from './src/screens/profile';
import Calendar from './src/screens/calendar';
import Login from './src/screens/Login';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faTasks, faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icon;
            switch (route.name) {
              case 'Home':
                icon = <FontAwesomeIcon icon={faHome} size={size} style={{ color }} />;
                break;
              case 'Task':
                icon = <FontAwesomeIcon icon={faTasks} size={size} style={{ color }} />;
                break;
              case 'Profile':
                icon = <FontAwesomeIcon icon={faUser} size={size} style={{ color }} />;
                break;
              case 'Calendar':
                icon = <FontAwesomeIcon icon={faCalendarAlt} size={size} style={{ color }} />;
                break;
              default:
                break;
            }
            return icon;
          },
        })}
        tabBarOptions={null} // Set tabBarOptions to null
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Task" component={Task} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Calendar" component={Calendar} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
