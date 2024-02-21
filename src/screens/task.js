// src/screens/task.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TaskScreen = ({ route }) => {
  // Extract the selected date from the route parameters
  const { selectedDate } = route.params || { selectedDate: 'Your default date here' };

  // State to manage tasks for the selected date
  const [tasks, setTasks] = useState([]);
  
  // State to manage the current task input
  const [taskInput, setTaskInput] = useState('');

  // State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState('Studies');

  // Function to handle task input change
  const handleTaskInputChange = (text) => {
    setTaskInput(text);
  };

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle adding a task
  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      // Add the task with category and status to the tasks list
      setTasks([...tasks, { category: selectedCategory, task: taskInput, completed: false }]);
      // Clear the task input field
      setTaskInput('');
    }
  };

  // Function to handle marking a task as completed
  const handleTaskCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <View>
      <Text>Tasks for: {selectedDate}</Text>
      {/* Category selection */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => handleCategoryChange(itemValue)}
      >
        <Picker.Item label="Studies" value="Studies" />
        <Picker.Item label="Productivity" value="Productivity" />
        <Picker.Item label="Leisure" value="Leisure" />
        <Picker.Item label="Chores" value="Chores" />
      </Picker>
      {/* Form to enter tasks */}
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5 }}
        value={taskInput}
        onChangeText={handleTaskInputChange}
        placeholder="Enter task"
      />
      <Button title="Add Task" onPress={handleAddTask} />
      {/* Display tasks */}
      <View style={{ marginTop: 20 }}>
        {tasks.map((task, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch
              value={task.completed}
              onValueChange={() => handleTaskCompleted(index)}
            />
            <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
              {task.category}: {task.task}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TaskScreen;
