import React from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function CalendarScreen({ navigation }) {
  // Generate dummy items for a specific day
  const generateDummyItems = () => {
    // Simulate events on two specific days
    return {
      '2024-03-10': [
        { time: '09:00', name: 'Morning Workout' },
        { time: '10:00', name: 'Team Meeting via Zoom' },
        { time: '12:00', name: 'Lunch with Sarah' },
        { time: '15:00', name: 'Client Call' },
        { time: '18:00', name: 'Dinner Prep' },
      ],
      '2024-03-11': [
        { time: '08:00', name: 'Yoga Session' },
        { time: '11:00', name: 'Project Discussion' },
        { time: '13:00', name: 'Lunch' },
        { time: '16:00', name: 'Coffee Break' },
        { time: '19:00', name: 'Read a Book' },
      ],
      // Add more dates and events as needed
    };
  };

  const items = generateDummyItems();

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ position: 'absolute', top: 100, left: 40 }}>
        <Text style={{ color: 'white', fontSize: 24 }}>Calendar</Text>
      </View>

      <View style={{ flex: 1, marginTop: 150 }}>
        <Agenda
          theme={{
            agendaKnobColor: 'white',
            todayTextColor: 'white',
            dotColor: 'white',
            selectedDayBackgroundColor: 'white',
            selectedDayTextColor: 'black',
            backgroundColor: 'black',
            calendarBackground: 'black',
          }}
          items={items}
          selected={'2024-03-10'}
          renderItem={(item, firstItemInDay) => (
            <View style={{ backgroundColor: '#333333', padding: 10, marginRight: 10, marginLeft: 10, marginTop: 17, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>{`${item.time} - ${item.name}`}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
