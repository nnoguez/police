import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import * as Progress from 'react-native-progress';
import { FontAwesome } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [punchInOutText, setPunchInOutText] = useState('Punch In');
  const [breakText, setBreakText] = useState('Start Break');
  const [shiftStart, setShiftStart] = useState('06:30');
  const [shiftEnd, setShiftEnd] = useState('18:30');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time for comparison
  const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return date.toLocaleTimeString('en-US', options);
  };

  // Check if within allowable punch time
  const isWithinTimeFrame = (startTime, endTime) => {
    const start = new Date();
    const end = new Date();

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    start.setHours(startHour, startMinute, 0);
    end.setHours(endHour, endMinute, 0);

    const fifteenMinutesBefore = new Date(start.getTime() - 15 * 60 * 1000);
    const fifteenMinutesAfter = new Date(end.getTime() + 15 * 60 * 1000);

    return currentDateTime >= fifteenMinutesBefore && currentDateTime <= fifteenMinutesAfter;
  };

  // Check for alert if punch-in or punch-out is missed
  const checkForAlert = () => {
    const shiftStartTime = new Date();
    const [startHour, startMinute] = shiftStart.split(':').map(Number);
    shiftStartTime.setHours(startHour, startMinute, 0);

    const shiftEndTime = new Date();
    const [endHour, endMinute] = shiftEnd.split(':').map(Number);
    shiftEndTime.setHours(endHour, endMinute, 0);

    const fiveMinutesAfterShiftStart = new Date(shiftStartTime.getTime() + 5 * 60 * 1000);
    const fiveMinutesAfterShiftEnd = new Date(shiftEndTime.getTime() + 5 * 60 * 1000);

    if (currentDateTime > shiftStartTime && currentDateTime < fiveMinutesAfterShiftStart && punchInOutText === 'Punch In') {
      Alert.alert('Alert', 'Have you begun your shift yet?', [{ text: 'OK' }]);
    } else if (currentDateTime > shiftEndTime && currentDateTime < fiveMinutesAfterShiftEnd && punchInOutText === 'Punch Out') {
      Alert.alert('Alert', 'Did you remember to punch out after your shift?', [{ text: 'OK' }]);
    }
  };

  useEffect(() => {
    checkForAlert();
  }, [currentDateTime]);

  // Determine button color
  const punchButtonStyle = isWithinTimeFrame(shiftStart, shiftEnd)
    ? styles.punchButton
    : { ...styles.punchButton, backgroundColor: 'grey' };

  const handlePunchInOut = () => {
    if (isWithinTimeFrame(shiftStart, shiftEnd)) {
      setPunchInOutText((prevText) => (prevText === 'Punch In' ? 'Punch Out' : 'Punch In'));
    } else {
      Alert.alert('Punch disabled', 'You can only punch in/out within your shift timeframe or 15 minutes before/after.');
    }
  };

  const handleBreak = () => {
    setBreakText((prevText) => (prevText === 'Start Break' ? 'End Break' : 'Start Break'));
  };

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = formatTime(currentDateTime);

  // Example data for days left in each phase
  const phases = [
    { phase: 'Phase 1', daysLeft: 6, totalDays: 14 },
    { phase: 'Phase 2', daysLeft: 14, totalDays: 14 },
    { phase: 'Phase 3', daysLeft: 14, totalDays: 14 },
    { phase: 'Phase 4', daysLeft: 7, totalDays: 7 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.containerContain}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.timeText}>{formattedTime}</Text>
        </View>

        <Text style={styles.welcomeText}>Welcome, [OIT Name]</Text>

        <View style={styles.shiftContainer}>
          <View style={styles.nextShiftRow}>
            <Text style={styles.boldLabel}>Next Shift:</Text>
            <Text style={styles.shiftTimeText}>In 3 days</Text>
          </View>
          <Text style={styles.shiftTime}>{shiftStart} - {shiftEnd} (12h)</Text>
          <View style={styles.locationRow}>
            <FontAwesome name="map-marker" size={20} color="#F39C12" />
            <Text style={styles.locationText}>Orlando Police Department</Text>
          </View>
        </View>


        <View style={styles.trainingContainer}>
          <Text style={styles.trainingText}>Training</Text>
          <Text style={styles.shiftCat}>
            <Text style={styles.boldLabel}>Assigned FTO:</Text> [First Name Last Name]
          </Text>
          <Text style={styles.shiftCat}>
            <Text style={styles.boldLabel}>Group:</Text> Alpha (Day Shift)
          </Text>

          <View style={styles.phasesContainer}>
            {phases.map(({ phase, daysLeft, totalDays }) => (
              <View key={phase} style={styles.phaseCircle}>
                <Text style={styles.phaseText}>{phase}</Text>
                <Progress.Circle
                  size={75}

                  thickness={6}
                  borderWidth={3} 
                  progress={(totalDays - daysLeft) / totalDays}
                  showsText={true}
                  formatText={() => `${daysLeft}`}
                  color={daysLeft === totalDays ? '#B0BEC5' : '#F39C12'}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={punchButtonStyle} onPress={handlePunchInOut}>
            <Text style={styles.buttonText}>{punchInOutText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.breakButton} onPress={handleBreak}>
            <Text style={styles.buttonText}>{breakText}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1C2C',
  },
  containerContain: {
    margin: 15,
  },
  dateTimeContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 18,
    color: 'white',
  },
  welcomeText: {
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 40,
    color: '#F39C12',
  },
  shiftContainer: {
    backgroundColor: '#34495E',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  nextShiftRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white'
  },
  shiftTimeText: {
    color: '#F39C12',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  shiftTime: {
    marginTop: 5,
    fontSize: 18,
    color: 'white',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    marginLeft: 5,
    color: 'white',
  },
  trainingContainer: {
    backgroundColor: '#34495E',
    padding: 20,
    borderRadius: 10,
  },
  trainingText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F39C12',
    textAlign: 'center',
  },
  shiftCat: {
    fontSize: 16,
    marginBottom: 15,
    color: 'white',
  },
  boldLabel: {
    fontWeight: 'bold',
    color: 'white'
  },
  phasesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0C1C2C',
    padding: '3%',
    borderRadius: 10,
    marginHorizontal: '-3%'
  },
  phaseCircle: {
    alignItems: 'center',
    padding: 10,
  },
  phaseText: {
    fontSize: 16,
    marginTop: 10,
    color: '#F39C12',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  punchButton: {
    backgroundColor: '#F39C12',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  breakButton: {
    backgroundColor: '#34495E',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
