import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }
    Alert.alert('Login Successful', `Welcome, ${email}!`);
    setIsLoggedIn(true); // Update state to show the main app
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.ibb.co/zG0rYdV/Artboard-1.png' }}
        style={styles.image}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#B0BEC5"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#B0BEC5"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 36,
    backgroundColor: '#0C1C2C',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: -10
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#2A3D55',
    color: '#D0D6DF',
  },
  button: {
    backgroundColor: '#F39C12',
    paddingVertical: 14,
    marginTop: 50,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
