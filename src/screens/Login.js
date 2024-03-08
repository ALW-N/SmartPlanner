import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    // Add your login logic here
    console.log('Login button pressed');
    navigation.navigate('Home')
    
  };

  return (
    <View>
      <Text>Login</Text>
      <View>
        <Text>Email:</Text>
        <TextInput
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />

        <Text>Password:</Text>
        <TextInput
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        />

        <Button title="Login" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default Login;
