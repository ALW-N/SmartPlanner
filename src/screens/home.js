import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

const HomeScreen = ({ navigation }) => {
  // Dummy percentage value for testing
  const percentage = 75;

  // Function to determine the text based on the percentage
  const getText = () => {
    if (percentage >= 90) {
      return "Your daily tasks are almost done";
    } else {
      return "Complete your tasks";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/profile.png')} style={styles.profilePhoto} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.date}>September 20, 2022</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <FontAwesomeIcon icon={faBell} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.statusTextContainer}>
        <Text style={styles.statusText}>
          {getText()}
        </Text>
        <View style={styles.percentageContainer}>
          <View style={[styles.percentageIndicator, { backgroundColor: percentage >= 90 ? 'green' : 'red' }]} />
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between', // Add this to position the bottomBar at the bottom
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
    flexDirection: 'column', // Change to column layout
    marginLeft: 10, // Add
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
  statusTextContainer: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 600, // Add marginBottom
    marginRight: 20, // Add marginRight
    marginLeft: 20, // Add marginLeft
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  percentageText: {
    color: 'white',
    marginLeft: 10,
  },
};

export default HomeScreen;
