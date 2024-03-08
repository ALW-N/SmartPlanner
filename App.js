import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCalendarAlt, faPlusCircle,  faTasks } from '@fortawesome/free-solid-svg-icons'; 

// Import your screens
import Home from './src/screens/home';
import Profile from './src/screens/profile';
import Calendar from './src/screens/calendar';
import Task from './src/screens/task'; // Import the Task screen

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            let color; // Define color variable
            switch (route.name) {
              case 'Home':
                iconName = faPlusCircle;
                break;
              case 'Profile':
                iconName = faUser;
                break;
              case 'Calendar':
                iconName = faCalendarAlt;
                break;
              case 'Task':
                iconName = faTasks; // Use checklist icon for Task screen
                break;
              default:
                iconName = faPlusCircle;
                break;
            }
            color = focused ? '#DDFF94' : '#748c94'; // Set color based on focus
            // Use the color variable for the icon color
            return <FontAwesomeIcon icon={iconName} size={24} color={color} />;
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#000000', // Set the background color to black
            height: 60,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Task" component={Task} />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
