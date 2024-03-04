import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput, Switch, Button, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';

const AddTaskScreen = ({ route, navigation }) => {
  const { categoryName } = route.params || { categoryName: '' };
  const [tasksByCategory, setTasksByCategory] = useState({
    'Academics/Profession': ['Homework/Assignments', 'Exams/Tests', 'Study Sessions', 'Projects'],
    'Personal': ['Fitness/Health', 'Career/Internship', 'Personal Tasks'],
    'Social': ['Extracurricular Activities', 'Meetings', 'Social Events'],
    'General': ['Reminders', 'Travel Plans', 'Sleep/Rest'],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryName);
  const [selectedTask, setSelectedTask] = useState('');
  const [isAddingCustomTask, setIsAddingCustomTask] = useState(false);
  const [customTask, setCustomTask] = useState('');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pastTimeAlertVisible, setPastTimeAlertVisible] = useState(false);

  // Function to handle opening modal when screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(true);
      setSelectedCategory(categoryName); // Set the default category when modal opens
      return () => {
        // Cleanup function
        setModalVisible(false);
      };
    }, [categoryName])
  );

  // Function to handle displaying modal every time the component mounts or updates
  useEffect(() => {
    setModalVisible(true);
  }, [route]);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setTaskName(task); // Set task name to the selected task
    setModalVisible(false);
  };

  const handleAddCustomTask = () => {
    if (customTask.trim() !== '') {
      const updatedTasks = [...tasksByCategory[selectedCategory]];
      updatedTasks.push(customTask.trim());
      setTasksByCategory({
        ...tasksByCategory,
        [selectedCategory]: updatedTasks,
      });
      setCustomTask('');
      setIsAddingCustomTask(false);
    }
  };

  // Function to handle saving task
  const handleSaveTask = () => {
    if (!selectedCategory) {
      Alert.alert(
        'Please select a category',
        'You must select a category before adding a task.',
        [{ text: 'OK' }]
      );
      return; // Exit function if no category is selected
    }
    // Save the task details and navigate back to the previous screen
    // You can implement your logic here to save the task to your data source
    navigation.goBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const currentTime = currentDate.getTime();
    const now = new Date().getTime();

    // Check if the selected time is in the past
    if (currentTime < now) {
      // If it's in the past, show an alert or handle it accordingly
      // For now, just reset the date to the current time
      setDate(new Date());
      setPastTimeAlertVisible(true);
    } else {
      setShowDatePicker(false);
      setDate(currentDate);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Category</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              {Object.keys(tasksByCategory).map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
            <Text style={styles.modalTitle}>Select a Task</Text>
            {tasksByCategory[selectedCategory] && tasksByCategory[selectedCategory].map((task, index) => (
              <TouchableOpacity
                key={index}
                style={styles.taskItem}
                onPress={() => handleTaskSelect(task)}
              >
                <Text style={styles.taskText}>{task}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.switchContainer}>
              <Text>Add Custom Task</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isAddingCustomTask ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => setIsAddingCustomTask(value)}
                value={isAddingCustomTask}
              />
            </View>
            {isAddingCustomTask && (
              <View style={styles.customTaskInputContainer}>
                <TextInput
                  style={styles.customTaskInput}
                  value={customTask}
                  onChangeText={setCustomTask}
                  placeholder="Enter custom task"
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddCustomTask}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      {/* Task details input */}
      <View style={styles.taskDetailsContainer}>
        <Text style={styles.categoryText}>Category: {selectedCategory}</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          value={taskName}
          onChangeText={setTaskName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Select Time"
            onPress={() => setShowDatePicker(true)}
          />
          <View style={styles.buttonSpace}></View>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          {pastTimeAlertVisible && (
            Alert.alert(
              'Please select a time in the future.',
              undefined,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setShowDatePicker(true); // Allow user to select time again
                    setPastTimeAlertVisible(false); // Hide the alert
                  },
                },
              ],
              { cancelable: false }
            )
          )}
        </View>
        <View style={styles.buttonSpace}></View>
        {/* Add Task button with disabled prop */}
        <Button
          title="Add Task"
          onPress={handleSaveTask}
          disabled={!selectedCategory} // Disable button if no category is selected
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  customTaskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  customTaskInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  taskDetailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  categoryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSpace: {
    marginTop:30,
    width: 10,
  },
});

export default AddTaskScreen;
