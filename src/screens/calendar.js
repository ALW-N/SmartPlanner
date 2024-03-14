import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

// Function to generate random tasks for February
const generateRandomTasks = () => {
  const categories = ["Academics/Profession", "Personal", "Social", "General"];
  const tasks = [];
  const analyticsData = {}; // Object to store analytics data

  // Generate random tasks for each day in February
  for (let day = 1; day <= 28; day++) {
    const date = new Date(2024, 1, day); // Year 2024, Month February (0-indexed), Day 'day'
    const category = categories[Math.floor(Math.random() * categories.length)];
    const taskCount = Math.floor(Math.random() * 5) + 1; // Generate between 1 to 5 tasks per day

    for (let i = 0; i < taskCount; i++) {
      // Generate random start and end times for the task
      const startTime = new Date(date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0));
      const endTime = new Date(date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0));

      tasks.push({
        startTime: startTime,
        endTime: endTime,
        name: `Task ${i + 1}`,
        category: category,
      });
    }
  }

  return tasks;
};

const CalendarScreen = ({ navigation, route }) => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date

  // Function to update the items state with the task data
  const updateItems = (taskData) => {
    const tasks = taskData;

    tasks.forEach(task => {
      const startDate = new Date(task.startTime);
      const endDate = new Date(task.endTime);
  
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
        const startTime = isFirstDay ? task.startTime.toLocaleTimeString() : '00:00:00';
        const endTime = isLastDay ? task.endTime.toLocaleTimeString() : '23:59:59';
    
        // Add task data for the current date
        const date = currentDate.toISOString().split('T')[0];
        setItems((prevItems) => ({
          ...prevItems,
          [date]: [
            ...(prevItems[date] ? prevItems[date] : []),
            {
              name: task.name,
              startTime: task.startTime,
              endTime: task.endTime,
            },
          ],
        }));
      }
    });
  };

  useEffect(() => {
    // Generate random tasks for February
    const tasks = generateRandomTasks();
    updateItems(tasks);
    
    // Check if there is new task data passed from AddTaskScreen
    if (route.params && route.params.taskData) {
      const newTaskData = route.params.taskData;
      updateItems([newTaskData]); // Update items with the new task data
    }
  }, [route.params]); // Include route.params in the dependency array

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ position: 'absolute', top: 100, left: 40 }}>
        <Text style={{ color: 'white', fontSize: 24 }}>Calendar</Text>
      </View>

      <View style={{ flex: 1, marginTop: 150 }}>
        {/* Render your calendar component here */}
        {/* Placeholder for the Agenda component */}
        <Agenda
          items={items}
          selected={selectedDate}
          renderItem={(item, firstItemInDay) => (
            // Render your agenda item
            <View>
              <Text>{item.name}</Text>
              <Text>Start Time: {new Date(item.startTime).toLocaleTimeString()}</Text>
              <Text>End Time: {new Date(item.endTime).toLocaleTimeString()}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CalendarScreen;
