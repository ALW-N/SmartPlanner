import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';

const HomeScreen = ({ navigation, route }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Initialize with 'All'

  const formatDate = (date) => {
    const options = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatMonthYear = (date) => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const updateCurrentDate = (newDate) => {
    setCurrentDate(newDate);
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isFocused) {
      setCurrentDate(new Date());
    }
  }, [isFocused]);

  const getCalendarDates = () => {
    const today = new Date(currentDate);
    const currentMonth = today.getMonth();
    const nextMonth = new Date(today);
    nextMonth.setMonth(currentMonth + 1);

    const calendarDates = [];
    let date = new Date(today);
    while (date.getMonth() === currentMonth) {
      calendarDates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    calendarDates.push('+');

    return calendarDates;
  };

  const monthNames = Array.from({ length: 12 }, (_, index) => {
    return {
      label: formatMonthYear(new Date(currentDate.getFullYear(), index, 1)),
      value: index,
    };
  });

  const toggleMonthModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const markTaskAsDone = (index) => {
    // Create a copy of the tasks array
    const updatedTasks = [...tasks];
    // Update the 'done' property of the task at the specified index
    updatedTasks[index].done = true;
    // Move the task to the bottom of the array
    const removedTask = updatedTasks.splice(index, 1)[0];
    updatedTasks.push(removedTask);
    // Update the state with the modified tasks array
    setTasks(updatedTasks);
  };

  useEffect(() => {
    if (route.params && route.params.taskData) {
      setTasks([...tasks, { ...route.params.taskData, done: false }]);
    }
  }, [route.params]);

  // Filter tasks based on the selected category
  const filteredTasks = selectedCategory === 'All' ? tasks : tasks.filter(task => task.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileContainer}>
            <Image source={require('../assets/profile.png')} style={styles.profilePhoto} />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Alwin Tomy</Text>
              <Text style={styles.date}>{currentDate.toDateString()}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <FontAwesomeIcon icon={faBell} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleMonthModal}>
        <View style={styles.monthYearContainer}>
          <Text style={styles.monthYearText}>{formatMonthYear(currentDate)}</Text>
          <FontAwesomeIcon icon={faChevronRight} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                {monthNames.map((month, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => updateCurrentDate(new Date(currentDate.getFullYear(), month.value, 1))}
                    style={styles.monthButton}>
                    <Text>{month.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.calendarContainer}>
        {getCalendarDates().map((date, index) => (
          <TouchableOpacity
            key={index}
            style={styles.calendarBox}
            onPress={() => {
              if (date === '+') {
                updateCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
              } else {
                updateCurrentDate(date);
              }
            }}>
            {date === '+' ? (
              <Text style={styles.nextMonthIndicator}>+</Text>
            ) : (
              <>
                <Text style={styles.calendarDay}>{formatDate(date)}</Text>
                <Text style={styles.calendarDate}>
                  {date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}
                </Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Filter buttons */}

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setSelectedCategory('All')} style={[styles.filterButton, selectedCategory === 'All' && styles.selectedFilterButton]}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Academics/Profession')} style={[styles.filterButton, selectedCategory === 'Academics/Profession' && styles.selectedFilterButton]}>
          <Text>Academics/Prof</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Personal')} style={[styles.filterButton, selectedCategory === 'Personal' && styles.selectedFilterButton]}>
          <Text>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Social')} style={[styles.filterButton, selectedCategory === 'Social' && styles.selectedFilterButton]}>
          <Text>Social</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('General')} style={[styles.filterButton, selectedCategory === 'General' && styles.selectedFilterButton]}>
          <Text>General</Text>
        </TouchableOpacity>
      </View>
      {/* Render tasks only if there are tasks */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredTasks.length > 0 && (
          <View style={styles.cardContainer}>
            <Text style={styles.title}>Tasks for the day</Text>
            {filteredTasks.map((task, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.taskCategory}>Category: {task.category}</Text>
                <Text style={styles.taskTitle}>Title: {task.title}</Text>
                <Text style={styles.taskDescription}>Description: {task.description}</Text>
                <Text style={styles.taskTime}>Time: {task.time}</Text>
                {!task.done && (
                  <TouchableOpacity onPress={() => markTaskAsDone(index)} style={styles.markDoneButton}>
                    <Text style={styles.markDoneButtonText}>Mark as Done</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  notificationButton: {
    padding: 10,
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  arrowIcon: {
    fontSize: 20,
    color: 'black',
  },
  calendarContainer: {
    // alignItems: 'flex-start',
    height: 70,
    // marginTop: 5,
  
  },
  calendarBox: {
    backgroundColor: '#00FF00',
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  calendarDay: {
    fontSize: 12,
  },
  calendarDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextMonthIndicator: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    maxHeight: 500,
    width: '80%',
  },
  monthButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardContainer: {
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    padding: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskCategory: {
    fontSize: 16,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  taskTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  markDoneButton: {
    backgroundColor: '#00f',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  markDoneButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    // marginTop:10,
  },
  selectedFilterButton: {
    backgroundColor: '#00f',
  },
};

export default HomeScreen;
