import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';

const Home = ({ navigation }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [punchInOutText, setPunchInOutText] = useState('Punch In');
  const [breakText, setBreakText] = useState('Start Break');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePunchInOut = () => {
    setPunchInOutText((prevText) => (prevText === 'Punch In' ? 'Punch Out' : 'Punch In'));
  };

  const handleBreak = () => {
    setBreakText((prevText) => (prevText === 'Start Break' ? 'End Break' : 'Start Break'));
  };

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

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
        <Text style={styles.welcomeText}>Welcome, [OIT Name]</Text>

        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.timeText}>{formattedTime}</Text>
        </View>

        <View style={styles.trainingContainer}>
          <Text style={styles.trainingText}>Training</Text>
          <Text style={styles.assignedFTO}>
            <Text style={styles.boldLabel}>Assigned FTO:</Text> [First Name Last Name]
          </Text>
          <Text style={styles.shiftTime}>
            <Text style={styles.boldLabel}>Next Shift:</Text> 6:30 AM - 18:30 PM
          </Text>

          <View style={styles.phasesContainer}>
            {phases.map(({ phase, daysLeft, totalDays }) => (
              <View key={phase} style={styles.phaseCircle}>
                <Text style={styles.phaseText}>{phase}</Text>
                <Progress.Circle
                  size={70}
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
            <TouchableOpacity style={styles.punchButton} onPress={handlePunchInOut}>
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
    margin: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 50,
    marginTop: 20,
    color: 'white',
  },
  dateTimeContainer: {
    backgroundColor: '#2C3E50',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 18,
    color: 'white',
  },
  trainingContainer: {
    backgroundColor: '#2A3D55',
    padding: 20,
    borderRadius: 10,
  },
  trainingText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  assignedFTO: {
    fontSize: 16,
    marginBottom: 15,
    color: 'white',
  },
  shiftTime: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  boldLabel: {
    fontWeight: 'bold',
  },
  phasesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  phaseCircle: {
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 16,
    marginTop: 10,
    color: 'white',
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
    backgroundColor: '#B0BEC5',
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
