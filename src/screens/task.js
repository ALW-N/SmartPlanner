import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const TaskScreen = ({ route, navigation }) => {
  // Define categories
  const categories = [
    { name: 'Academics/Profession', color: '#222222', image: require('../assets/Academics.png') },
    { name: 'Personal', color: '#222222', image: require('../assets/Personal.png') }, 
    { name: 'Social', color: '#222222', image: require('../assets/Social.png') }, 
    { name: 'General', color: '#222222', image: require('../assets/General.png') }, 
  ];

  // Function to render each category item
  const renderCategoryItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      {/* Display image */}
      {item.image && <Image source={item.image} style={styles.image} />}
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>
      {/* FlatList to display categories */}
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: 25,
    color: 'white',
    marginBottom: 20,
  },
  flatListContent: {
    alignItems: 'center',
  },
  card: {
    width: '45%',
    height: 180,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40, 
  },
});

export default TaskScreen;
