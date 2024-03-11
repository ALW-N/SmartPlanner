import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faSort } from '@fortawesome/free-solid-svg-icons'; // Assuming you have the filter icon

const HomeScreen = ({ navigation }) => {
  // If you still need to use useIsFocused, you can keep it
  const isFocused = useIsFocused();

  // Get the current date
  const currentDate = new Date();
  // Get the day, month, and date
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const date = currentDate.getDate();

  // Example: Check if there are tasks
  const tasks = []; // Assume this is your tasks array

  // Add any navigation-related logic here

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
      {/* Conditionally render the rectangular card */}
      {tasks.length === 0 ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
          <Text style={{ color: 'white', fontSize: 18 }}>No tasks for today</Text>
        </View>
      ) : (
        <View style={{ backgroundColor: '#FFD700', width: '100%', height: 100, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginHorizontal: 5 }}>
          <Text style={{ color: 'black', fontSize: 18 }}>Rectangular Card</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
