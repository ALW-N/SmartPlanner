// src/screens/Home.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Task"
        onPress={() => navigation.navigate('Task')}
      />
    </View>
  );
}