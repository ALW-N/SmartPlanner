import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faSort } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [recentTask, setRecentTask] = useState(undefined); // Initialize recentTask to undefined
  const [selectedTask, setSelectedTask] = useState(null); // State to manage selected task
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  // Get the current date
  const currentDate = new Date();
  // Get the day, month, and date
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const date = currentDate.getDate();

  useEffect(() => {
    if (route.params && route.params.newTask) {
      // Add the new task to the beginning of the tasks array
      setTasks(prevTasks => [route.params.newTask, ...prevTasks]);
      setRecentTask(route.params.newTask);
    }
  }, [route.params]);

  const markAsDone = (index) => {
    Alert.alert(
      'Mark as Done',
      'Are you sure you want to mark this task as done?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const updatedTasks = [...tasks];
            updatedTasks.splice(index, 1);
            setTasks(updatedTasks);
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Function to handle when a task is pressed
  const handleTaskPress = (task) => {
    setSelectedTask(task); // Set selected task
    setModalVisible(true); // Show modal
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedTask(null); // Clear selected task
    setModalVisible(false); // Hide modal
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', borderTopWidth: 0, paddingHorizontal: 30, paddingTop: 80 }}>
      {/* Display the current day, month, and date */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>{`${day}, ${month} ${date}`}</Text>
          <Text style={{ color: 'white', fontSize: 24 }}>Hey Alwin 🙋‍♂️</Text>
        </View>
        {/* Notification Bell Icon */}
        <TouchableOpacity onPress={() => console.log("Notification bell icon pressed")} style={{ paddingHorizontal: 8, paddingTop: 30 }}>
          <FontAwesomeIcon icon={faBell} size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* Draw a box around the Cards Section */}
      <View style={{ borderWidth: 1, borderColor: 'black', marginBottom: 20 }}>
        {/* Cards Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 10, marginBottom: 20 }}>
          <TouchableOpacity style={{ backgroundColor: '#DDFF94', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'black', fontSize: 18 }}>My Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#9F7AF9', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Card 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#FB83F7', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Card 3</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* Subheading for Recent Tasks */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>Recent Tasks</Text>
        <TouchableOpacity onPress={() => console.log("Filter icon pressed")} style={{ paddingHorizontal: 8, marginTop:10 }}>
          <FontAwesomeIcon icon={faSort} size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* Display the most recent task if available */}
      {recentTask && (
        <TouchableOpacity
          style={{
            backgroundColor: '#FFD700',
            width: '100%',
            height: 100,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            marginTop: 10,
            marginHorizontal: 5
          }}
          onPress={() => handleTaskPress(recentTask)} // Pass the recent task to handleTaskPress function
        >
          <Text style={{ color: 'black', fontSize: 18 }}>Task Name: {recentTask.name}</Text>
          <Text style={{ color: 'black', fontSize: 16 }}>Description: {recentTask.description}</Text>
        </TouchableOpacity>
      )}

      {/* Modal for displaying task details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Display task details */}
            <Text style={styles.modalText}>Category: {selectedTask && selectedTask.category}</Text>
            <Text style={styles.modalText}>Task Name: {selectedTask && selectedTask.name}</Text>
            <Text style={styles.modalText}>Description: {selectedTask && selectedTask.description}</Text>
            <Text style={styles.modalText}>Start Date: {selectedTask && selectedTask.startTime.toLocaleDateString()}</Text>
            <Text style={styles.modalText}>End Date: {selectedTask && selectedTask.endTime.toLocaleDateString()}</Text>
            <Text style={styles.modalText}>Start Time: {selectedTask && selectedTask.startTime.toLocaleTimeString()}</Text>
            <Text style={styles.modalText}>End Time: {selectedTask && selectedTask.endTime.toLocaleTimeString()}</Text>
            {/* Button to close the modal */}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the modal
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#DDFF94',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
