import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

const TaskScreen = ({ route, navigation }) => {
  // Extract the selected date from the route parameters
  const { selectedDate } = route.params || { selectedDate: 'Your default date here' };

  // State to manage tasks for the selected date
  const [tasks, setTasks] = useState([]);

  // Function to handle marking a task as completed
  const handleTaskCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Define categories and their respective colors
  const categories = [
    { name: 'Academics/Profession', color: '#ffcc00' },
    { name: 'Personal', color: '#66ccff' },
    { name: 'Social', color: '#ff6666' },
    { name: 'General', color: '#99ff99' },
  ];

  // Function to navigate to AddTaskScreen with category name
  const handleCategoryPress = (categoryName) => {
    navigation.navigate('AddTask', { categoryName });
  };

  return (
    <View>
      <Text>Tasks for: {selectedDate}</Text>
      {/* Container to wrap cards horizontally */}
      <View style={styles.horizontalContainer}>
        {/* Display cards for each category */}
        {categories.map((category, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryPress(category.name)}>
            <View style={[styles.card, { backgroundColor: category.color }]}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>{category.name}</Text>
              {/* Display tasks for the category */}
              {tasks.map((task, taskIndex) => {
                if (task.category === category.name) {
                  return (
                    <View key={taskIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Switch
                        value={task.completed}
                        onValueChange={() => handleTaskCompleted(taskIndex)}
                      />
                      <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
                        {task.task}
                      </Text>
                    </View>
                  );
                }
              })}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%', // Adjust the width as needed
    height: 200, // Adjust the height as needed
    padding: 30,
    marginVertical: 10, // Adjust the vertical margin
    marginHorizontal: 20, // Adjust the horizontal margin
    borderRadius: 8,
  },
});

export default TaskScreen;
