import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function CalendarScreen({ navigation, route }) {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date

  // Function to update the items state with the task data
  const updateItems = (taskData) => {
    const date = taskData.startTime.toISOString().split('T')[0];

    setItems((prevItems) => ({
      ...prevItems,
      [date]: [
        ...(prevItems[date] ? prevItems[date] : []),
        { time: taskData.startTime.toLocaleTimeString(), name: taskData.name },
      ],
    }));
  };

  useEffect(() => {
    // Check if route params contain task data
    if (route.params && route.params.taskData) {
      const taskData = route.params.taskData;
      updateItems(taskData);
    }
  }, [route.params]);

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
          selected={selectedDate} // Set to the current date
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
