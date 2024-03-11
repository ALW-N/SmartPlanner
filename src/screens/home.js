// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faSort } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [recentTask, setRecentTask] = useState(undefined); // Initialize recentTask to undefined

  // Get the current date
  const currentDate = new Date();
  // Get the day, month, and date
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const date = currentDate.getDate();

  useEffect(() => {
    if (route.params && route.params.newTask) {
      setRecentTask(route.params.newTask); // Set the recent task when a new task is created
    }
  }, [route.params]);

  const markAsDone = (index) => {
    Alert.alert(
      'Mark as Done',
      'Are you sure you want to mark this task as done?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const updatedTasks = [...tasks];
            updatedTasks.splice(index, 1);
            setTasks(updatedTasks);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', borderTopWidth: 0, paddingHorizontal: 30, paddingTop: 80 }}>
      {/* Display the current day, month, and date */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>{`${day}, ${month} ${date}`}</Text>
          <Text style={{ color: 'white', fontSize: 24 }}>Hey Alwin 🙋‍♂️</Text>
        </View>
        {/* Notification Bell Icon */}
        <TouchableOpacity onPress={() => console.log("Notification bell icon pressed")} style={{ paddingHorizontal: 8, paddingTop: 30 }}>
          <FontAwesomeIcon icon={faBell} size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* Draw a box around the Cards Section */}
      <View style={{ borderWidth: 1, borderColor: 'black', marginBottom: 20 }}>
        {/* Cards Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 10, marginBottom: 20 }}>
          <TouchableOpacity style={{ backgroundColor: '#DDFF94', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'black', fontSize: 18 }}>My Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#9F7AF9', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Card 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#FB83F7', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Card 3</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* Subheading for Recent Tasks */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>Recent Tasks</Text>
        <TouchableOpacity onPress={() => console.log("Filter icon pressed")} style={{ paddingHorizontal: 8, marginTop:10 }}>
          <FontAwesomeIcon icon={faSort} size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* Display the most recent task if available */}
      {recentTask && (
        <TouchableOpacity
          style={{
            backgroundColor: '#FFD700',
            width: '100%',
            height: 100,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            marginTop: 10,
            marginHorizontal: 5
          }}
          onPress={() => console.log('Recent Task Card Pressed')}
        >
          <Text style={{ color: 'black', fontSize: 18 }}>Task Name: {recentTask.name}</Text>
          <Text style={{ color: 'black', fontSize: 16 }}>Description: {recentTask.description}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeScreen;
