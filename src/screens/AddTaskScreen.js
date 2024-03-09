import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddTaskScreen = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [tasks, setTasks] = useState([]);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Add Task</Text>
      </View>
      
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

      <Text style={styles.subHeading}>Task</Text>
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
    </View>
  );
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
    marginBottom: 10,
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
    marginBottom: 10,
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
});

export default AddTaskScreen;
