// Calendar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Define shift colors
const shifts = {
  day: { color: '#ADD8E6' }, // Light Blue
  night: { color: '#D3D3D3' } // Light Grey
};

// Define work days for each week
const workWeeks = {
  week1: ['2024-08-05', '2024-08-06', '2024-08-09', '2024-08-10'], // Example dates
  week2: ['2024-08-07', '2024-08-08', '2024-08-11'] // Example dates
};

// Define shift months
const shiftMonths = {
  day: ['01', '02', '03', '07', '08', '09'], // Jan, Feb, Mar, Jul, Aug, Sep
  night: ['04', '05', '06', '10', '11', '12'] // Apr, May, Jun, Oct, Nov, Dec
};

// Define group shifts
const groups = {
  Charlie: 'Charlie',
  Alpha: 'Alpha',
  Bravo: 'Bravo',
  Delta: 'Delta'
};

// Define group assignments
const groupAssignments = {
  dayShift: {
    Charlie: 'Alpha',
    Alpha: 'Charlie',
    Bravo: 'Delta',
    Delta: 'Bravo'
  },
  nightShift: {
    Charlie: 'Alpha',
    Alpha: 'Charlie',
    Bravo: 'Delta',
    Delta: 'Bravo'
  }
};

// Function to determine shift type based on month
const getShiftType = (month) => {
  return shiftMonths.day.includes(month) ? 'day' : 'night';
};

// Generate marked dates
const generateMarkedDates = () => {
  const markedDates = {};
  const startDate = new Date('2024-01-01'); // Starting date for the year

  for (let i = 0; i < 365; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateString = currentDate.toISOString().split('T')[0];
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    const dayOfWeek = currentDate.getDay(); // Day of the week (0-Sunday, 6-Saturday)
    const shiftType = getShiftType(month);

    // Determine which group is working
    let workingGroups = {};
    if (i % 14 < 7) { // Simplified logic for alternating work days
      workingGroups = workWeeks.week1.includes(dateString) ? groupAssignments.dayShift : groupAssignments.nightShift;
    } else {
      workingGroups = workWeeks.week2.includes(dateString) ? groupAssignments.dayShift : groupAssignments.nightShift;
    }

    // Mark dates for each group
    for (const group in workingGroups) {
      const shiftColor = shifts[shiftType].color;
      markedDates[dateString] = markedDates[dateString] || { periods: [] };
      markedDates[dateString].periods.push({
        startingDay: false,
        endingDay: true,
        color: shiftColor,
        text: group // Add text to identify the group if needed
      });
    }
  }

  return markedDates;
};

const CalendarScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Calendar
        markingType="multi-period"
        markedDates={generateMarkedDates()}
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

export default CalendarScreen;
