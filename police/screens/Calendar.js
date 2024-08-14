// Calendar.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Calendar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
      <Button
        title="Go to Screen Three"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF0F1'
  },
});

export default Calendar;
