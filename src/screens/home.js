import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({ navigation }) => {
  // If you still need to use useIsFocused, you can keep it
  const isFocused = useIsFocused();

  // Get the current date
  const currentDate = new Date();
  // Get the day, month, and date
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const date = currentDate.getDate();

  // Add any navigation-related logic here

  return (
    <View style={{ flex: 1, backgroundColor: 'black', borderTopWidth: 0, paddingHorizontal: 40, paddingTop: 80 }}>
      {/* Display the current day, month, and date */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>{`${day}, ${month} ${date}`}</Text>
          <Text style={{ color: 'white', fontSize: 24 }}>Hey Alwin 🙋‍♂️</Text>
        </View>
        {/* Notification Bell Icon */}
        <TouchableOpacity onPress={() => console.log("Notification bell icon pressed")} style={{ paddingHorizontal: 10,paddingTop:30 }}>
          <FontAwesomeIcon icon={faBell} size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* Cards Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 30 }}>
        <TouchableOpacity style={{ backgroundColor: '#DDFF94', width: 130, height: 140, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
          <Text style={{ color: 'black', fontSize: 18 }}>My Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#9F7AF9', width: 130, height: 140, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
          <Text style={{ color: 'white', fontSize: 18 }}>Card 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#FB83F7', width: 130, height: 140, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
          <Text style={{ color: 'white', fontSize: 18 }}>Card 3</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Recent Tasks Heading */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 'auto', marginBottom: 500 }}>
        <Text style={{ color: 'white', fontSize: 20, marginRight: 10 }}>Recent Tasks</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
