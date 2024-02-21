import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ProfileScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Studies');
  const [categoryData, setCategoryData] = useState([]);

  // Simulated task data for demonstration
  const simulatedTaskData = [
    { timestamp: '2024-02-20 09:00:00', frequency: 2 },
    { timestamp: '2024-02-21 09:00:00', frequency: 5 },
    { timestamp: '2024-02-22 09:00:00', frequency: 3 },
    { timestamp: '2024-02-23 09:00:00', frequency: 7 },
    { timestamp: '2024-02-24 09:00:00', frequency: 4 },
    { timestamp: '2024-02-25 09:00:00', frequency: 6 },
    { timestamp: '2024-02-26 09:00:00', frequency: 8 },
  ];

  // Fetch task data for the selected category
  useEffect(() => {
    // Simulated fetchCategoryData function
    const fetchCategoryData = (category) => {
      // Simulated logic to fetch task data
      return simulatedTaskData;
    };

    const fetchedData = fetchCategoryData(selectedCategory);
    setCategoryData(fetchedData);
  }, [selectedCategory]);

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text>Line Graph for {selectedCategory}</Text>
        <LineChart
          data={{
            labels: categoryData.map((dataPoint) => dataPoint.timestamp),
            datasets: [
              {
                data: categoryData.map((dataPoint) => dataPoint.frequency),
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisSuffix="x"
          yAxisInterval={1}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
