import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function CalendarScreen({ navigation, route }) {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date

  // Function to update the items state with the task data
  const updateItems = (taskData) => {
    const startDate = new Date(taskData.startTime);
    const endDate = new Date(taskData.endTime);
  
    // Calculate the number of days the task spans
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Use Math.ceil to include the end day
  
    // Loop through the range of dates and add task data
    for (let i = 0; i < diffDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
  
      // Determine if it's the first or last day of the task
      const isFirstDay = i === 0;
      const isLastDay = i === diffDays - 1;
  
      // For the first day, use the original start time; for the last day, use the original end time
      const startTime = isFirstDay ? taskData.startTime.toLocaleTimeString() : '00:00:00';
      const endTime = isLastDay ? taskData.endTime.toLocaleTimeString() : '23:59:59';
  
      // Add task data for the current date
      const date = currentDate.toISOString().split('T')[0];
      setItems((prevItems) => ({
        ...prevItems,
        [date]: [
          ...(prevItems[date] ? prevItems[date] : []),
          {
            startTime,
            endTime,
            name: taskData.name,
          },
        ],
      }));
    }
  };
  

  useEffect(() => {
    // Check if route params contain task data
    if (route.params && route.params.taskData) {
    const taskData = route.params.taskData;

    // Parse date strings back into Date objects
    const startDate = new Date(taskData.startTime);
    const endDate = new Date(taskData.endTime);
      const diffTime = Math.abs(endDate - startDate);
      // Use Math.floor to get the correct number of full days difference
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
      // Add task data only for the start date if the difference is 0
      if (diffDays === 0) {
        updateItems(taskData);
      } else {
        // Loop through the range of dates and add task data
        for (let i = 0; i < diffDays; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          updateItems({ ...taskData, startTime: currentDate });
        }
        // Make sure to add the task for the end date as well
        updateItems({ ...taskData, startTime: endDate });
      }
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
              <Text style={{ color: 'white' }}>{`${item.startTime} - ${item.endTime} | ${item.name}`}</Text>
            </View>
          )}
          
        />
      </View>
    </View>
  );
}
