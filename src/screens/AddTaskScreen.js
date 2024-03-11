import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTaskScreen = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [customTaskName, setCustomTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(null); // Initialize with null
  const [selectedEndTime, setSelectedEndTime] = useState(null); // Initialize with null
  const [timeDuration, setTimeDuration] = useState('00:00');

  useEffect(() => {
    if (route.params && route.params.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory);
    }
  }, [route.params]);

  useEffect(() => {
    switch (selectedCategory) {
      case 'Academics/Profession':
        setTasks(['Homework/Assignments', 'Exams/Tests', 'Study Sessions', 'Projects', 'Custom']);
        break;
      case 'Personal':
        setTasks(['Fitness/Health', 'Career/Internship', 'Personal Tasks', 'Custom']);
        break;
      case 'Social':
        setTasks(['Extracurricular Activities', 'Meetings', 'Social Events', 'Custom']);
        break;
      case 'General':
        setTasks(['Reminders', 'Travel Plans', 'Sleep/Rest', 'Custom']);
        break;
      default:
        setTasks([]);
    }
  }, [selectedCategory]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedTask('');
  };

  const togglePicker = () => {
    setSelectedTask(selectedTask === '' ? tasks[0] : ''); // Toggle picker dropdown
  };

  const handleCustomTaskInput = () => {
    if (customTaskName.trim() !== '') {
      setTasks([...tasks.filter(task => task !== 'Custom'), customTaskName, 'Custom']);
      setSelectedTask(customTaskName);
    } else {
      Alert.alert('Error', 'Please enter a valid task name');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);

    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 00:00:00

    // Check if selected date is in the past
    if (currentDate < today) {
      Alert.alert('Error', 'Please select a date in the future');
    } else {
      setSelectedDate(currentDate);
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || selectedTime;
    setShowStartTimePicker(false);
    const currentDateTime = new Date();

    // Check if selected start time is before the current time
    if (currentTime < currentDateTime) {
      Alert.alert('Error', 'Start time cannot be in the past. Please select a time from the current time onwards.');
    } else {
      setSelectedStartTime(currentTime);
      updateTimeDuration(currentTime, selectedEndTime || new Date()); // Provide default value if selectedEndTime is null
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || selectedTime;
    setShowEndTimePicker(false);
    setSelectedEndTime(currentTime);
    updateTimeDuration(selectedStartTime || new Date(), currentTime); // Provide default value if selectedStartTime is null
  };

  const updateTimeDuration = (startTime, endTime) => {
    if (startTime && endTime) {
      const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // Convert milliseconds to minutes
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      setTimeDuration(`${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
    } else {
      setTimeDuration('00:00');
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
  };

  const formatTime = (time, defaultText) => {
    if (!time) {
      return defaultText;
    } else {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }
  };

  const handleCreateTask = () => {
    // Implement the logic to create the task here
    // This function will be called when the "Create Task" button is pressed
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 70,
      paddingHorizontal: 20,
    },
    heading: {
      fontSize: 25,
      color: 'white',
      marginLeft: 80,
    },
    cancel: {
      fontSize: 18,
      color: '#A9A9A9',
      marginRight: 10,
    },
    subHeading: {
      fontSize: 20,
      color: 'white',
      marginTop: 50,
      marginBottom: 20,
      marginLeft: 20,
    },
    filterContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginLeft: 20,
      marginRight: 20,
    },
    filter: {
      backgroundColor: '#333333',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginRight: 10,
      marginBottom: 20,
    },
    selectedFilter: {
      backgroundColor: '#DDFF94',
    },
    selectedFilterText: {
      color: 'black',
    },
    filterText: {
      color: 'white',
    },
    pickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 20,
    },
    picker: {
      flex: 1,
      color: 'white',
    },
    dropdownIcon: {
      marginLeft: 10,
    },
    customInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20,
      marginBottom:10,
    },
    customInput: {
      flex: 1,
      backgroundColor: '#333333',
      borderRadius: 20,
      color: 'white',
      paddingHorizontal: 20,
      marginRight: 10,
    },
    addButton: {
      backgroundColor: '#DDFF94',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    addButtonText: {
      color: 'black',
    },
    descriptionContainer: {
      paddingHorizontal: 20,
      marginTop:10,
    },
    descriptionInput: {
      backgroundColor: '#333333',
      borderRadius: 20,
      color: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 10,
    },
    timePickerCard: {
      backgroundColor: '#333333',
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row', 
      marginRight: 20, // Adjust margin if needed
      marginBottom: 20, // Adjust marginBottom to change the size of the card
      marginTop:10,
      width: '30%', // Adjust width to change the size of the card
    },
    pickerInner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end', 
    },
    pickerText: {
      color: 'white',
      marginLeft: 30,
    },
    calendarIcon: {
      marginLeft: 10,
    },
    taskHeading: {
      fontSize: 20,
      color: 'white',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
    },
    descriptionHeading: {
      fontSize: 20,
      color: 'white',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
    },
    // New style for the "Due Date" and "Estimate Task" headings
    subHeadingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
    },
    dueDateHeading: {
      fontSize: 20,
      color: 'white',
    },
    estimateTaskHeading: {
      fontSize: 20,
      color: 'white',
      marginLeft: 90,
      marginRight: 65,
    },
    // New style for the "Create Task" button
    createTaskButton: {
      backgroundColor: '#DDFF94',
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop:30,
      borderRadius:30,
      // marginBottom: 20,
    },
    createTaskButtonText: {
      color: '#1E1E1E',
      fontSize: 18,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Add Task</Text>
      </View>

      {/* Category selection */}
      <Text style={styles.subHeading}>Category</Text>
      <View style={styles.filterContainer}>
        {['Academics/Profession', 'Personal', 'Social', 'General'].map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filter,
              selectedCategory === category && styles.selectedFilter,
              index === tasks.length - 1 && { marginBottom: 20 }
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={[styles.filterText, selectedCategory === category && styles.selectedFilterText]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task selection */}
      <Text style={styles.taskHeading}>Task</Text>
      <TouchableOpacity style={styles.pickerContainer} onPress={togglePicker}>
        <Picker
          selectedValue={selectedTask}
          onValueChange={(itemValue) => setSelectedTask(itemValue)}
          style={styles.picker}
          enabled={selectedTask !== ''} // Disable picker when selectedTask is empty
        >
          {tasks.map((task, index) => (
            <Picker.Item key={index} label={task} value={task} />
          ))}
        </Picker>
        <Icon name="angle-down" size={20} color="white" style={styles.dropdownIcon} />
      </TouchableOpacity>

      {/* Custom task input */}
      {selectedTask === 'Custom' && (
        <View style={styles.customInputContainer}>
          <TextInput
            style={styles.customInput}
            placeholder="Enter custom task name"
            value={customTaskName}
            onChangeText={(text) => setCustomTaskName(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleCustomTaskInput}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Description input */}
      <Text style={styles.descriptionHeading}>Description</Text>
      <View style={styles.descriptionContainer}>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Enter task description"
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
      </View>

      {/* Subheading for Due Date and Estimate Task */}
      <View style={styles.subHeadingContainer}>
        <Text style={styles.dueDateHeading}>Due Date</Text>
        <Text style={styles.estimateTaskHeading}>Estimate Task</Text>
      </View>

      {/* Date and Time Pickers */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        {/* Start Date Picker */}
        <TouchableOpacity style={[styles.timePickerCard, { marginRight: 10 }]} onPress={() => setShowDatePicker(true)}>
          <View style={styles.pickerInner}>
            <Text style={styles.pickerText}> {formatDate(selectedDate)}</Text>
            <Icon name="calendar" size={20} color="white" style={styles.calendarIcon} />
          </View>
        </TouchableOpacity>

        {/* Start Time Picker */}
        <TouchableOpacity style={[styles.timePickerCard, { marginRight: 10 }]} onPress={() => setShowStartTimePicker(true)}>
          <View style={styles.pickerInner}>
            <Text style={styles.pickerText}>
               {selectedStartTime ? formatTime(selectedStartTime, 'Start Time') : 'Start Time'}
            </Text>
            <Icon name="clock-o" size={20} color="white" style={styles.calendarIcon} />
          </View>
        </TouchableOpacity>

        {/* End Time Picker */}
        <TouchableOpacity style={styles.timePickerCard} onPress={() => setShowEndTimePicker(true)}>
          <View style={styles.pickerInner}>
            <Text style={styles.pickerText}>
               {selectedEndTime ? formatTime(selectedEndTime, 'End Time') : 'End Time'}
            </Text>
            <Icon name="clock-o" size={20} color="white" style={styles.calendarIcon} />
          </View>
        </TouchableOpacity>
      </View>

      {/* "Create Task" button */}
      <TouchableOpacity style={styles.createTaskButton} onPress={handleCreateTask}>
        <Text style={styles.createTaskButtonText}>Create Task</Text>
      </TouchableOpacity>

      {/* DateTimePicker modals */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          minimumDate={new Date()} 
        />
      )}

      {showStartTimePicker && (
        <DateTimePicker
          value={selectedStartTime || new Date()} // Provide a default value if selectedStartTime is null
          mode="time"
          display="spinner"
          onChange={handleStartTimeChange}
        />
      )}

      {showEndTimePicker && (
        <DateTimePicker
          value={selectedEndTime || new Date()} // Provide a default value if selectedEndTime is null
          mode="time"
          display="spinner"
          onChange={handleEndTimeChange}
        />
      )}

    </View>
  );
};

export default AddTaskScreen;
