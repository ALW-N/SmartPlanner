import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Modal, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTaskScreen = ({ route, navigation }) => {
  const { categoryName } = route.params || { categoryName: 'Default Category' };

  // State variables for task name, description, time, selected item, and modal visibility
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTime, setTaskTime] = useState(new Date()); // Initialize with current date and time
  const [selectedItem, setSelectedItem] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [customItem, setCustomItem] = useState('');
  const [predefinedLists, setPredefinedLists] = useState({
    'Academics/Profession': ['Homework/Assignments', 'Exams/Tests', 'Study Sessions', 'Projects'],
    'Personal': ['Fitness/Health', 'Career/Internship', 'Personal Tasks'],
    'Social': ['Extracurricular Activities', 'Meetings', 'Social Events'],
    'General': ['Reminders', 'Travel Plans', 'Sleep/Rest'],
  });

  // Function to handle adding the task
  const handleAddTask = () => {
    // Here you would typically add the task to your data source
    // For now, let's just navigate back to the previous screen
    const newTask = { category: categoryName, name: taskName, description: taskDescription, time: taskTime };
    navigation.navigate('Home', { newTask: newTask });
  };

  // Function to handle selecting an item from the list
  const handleItemPress = (item) => {
    setSelectedItem(item);
    setTaskName(item); // Set the task name to the selected item
    setModalVisible(false);
  };

  // Function to handle setting the time
  const handleSetTime = (event, selectedTime) => {
    if (selectedTime !== undefined) {
      const currentTime = selectedTime || taskTime;
      const currentTimeStamp = new Date(currentTime).getTime();
      const nowTimeStamp = new Date().getTime();

      // Check if the selected time is in the future
      if (currentTimeStamp >= nowTimeStamp) {
        setShowTimePicker(Platform.OS === 'ios'); // Hide the picker on iOS
        setTaskTime(currentTime);
      } else {
        // If selected time is in the past, show an alert or handle it accordingly
        // For now, we can simply ignore setting the time
        // You can display an alert or provide feedback to the user as needed
        Alert.alert('Invalid Time', 'Please select a time in the future.');
      }
    } else {
      setShowTimePicker(false);
    }
  };

  // Function to format the time as AM or PM
  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  // Function to handle adding custom list item
  const handleAddCustomItem = () => {
    if (customItem.trim() !== '') {
      setPredefinedLists(prevLists => ({
        ...prevLists,
        [categoryName]: [...prevLists[categoryName], customItem]
      }));
      setCustomItem('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Display the selected category */}
      <Text style={styles.categoryTitle}>Category: {categoryName}</Text>
      {/* Input field for task name */}
      <TextInput
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Enter task name"
        editable={false} // Make the input non-editable
      />
      {/* Input field for task description */}
      <TextInput
        style={styles.input}
        value={taskDescription}
        onChangeText={setTaskDescription}
        placeholder="Enter task description"
        multiline
      />
      {/* Button to set the task time */}
      <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.timeButtonText}>Set Time</Text>
      </TouchableOpacity>
      {/* Display selected task time */}
      <Text style={styles.selectedTimeText}>{formatTime(taskTime)}</Text>
      {/* Button to add the task */}
      <Button title="Add Task" onPress={handleAddTask} />
      
      {/* Time picker */}
      {showTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={taskTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleSetTime}
        />
      )}

      {/* Modal for displaying predefined lists */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            {predefinedLists[categoryName].map((item, index) => (
              <TouchableOpacity key={index} style={styles.listItem} onPress={() => handleItemPress(item)}>
                <Text style={styles.listItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
            {/* Input field for adding custom list item */}
            <TextInput
              style={styles.input}
              value={customItem}
              onChangeText={setCustomItem}
              placeholder="Add custom item"
              onSubmitEditing={handleAddCustomItem}
            />
            {/* Option to add a new list */}
            <TouchableOpacity
              style={[styles.listItem, styles.addListItem]}
              onPress={handleAddCustomItem}
            >
              <Text style={[styles.listItemText, styles.addListItemText]}>+ Add Custom Item</Text>
            </TouchableOpacity>
          </ScrollView>
          {/* Button to close the modal */}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    maxHeight: '80%',
    width: '80%',
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    fontSize: 16,
  },
  addListItem: {
    backgroundColor: '#e6e6e6',
  },
  addListItemText: {
    color: '#666',
  },
  timeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  timeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedTimeText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default AddTaskScreen;
