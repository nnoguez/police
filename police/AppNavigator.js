import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

import Login from './screens/Login'; 
import Home from './screens/Home';
import Calendar from './screens/Calendar';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main app screens
const MainApp = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Calendar') {
          iconName = 'calendar-month';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Calendar" component={Calendar} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

// Stack navigator to handle login and main app
const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate an authentication check (should be replaced with real authentication logic)
    const checkAuth = async () => {
      setTimeout(() => {
        setIsLoggedIn(false); 
      }, 1000);
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
