import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const defaultImage = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
  const [image, setImage] = useState(defaultImage);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background header with image */}
      <ImageBackground
        source={{ uri: 'https://images4.alphacoders.com/148/148924.jpg' }}
        style={styles.headerBackground}
        imageStyle={styles.headerImage}
      />

      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: image }} style={styles.profileImage} />
        </View>
        <Text style={styles.nameText}>First Name</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={pickImage}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome5 name="calendar-alt" size={25} color="#ECF0F1" />
            <Text style={styles.infoText}>   2 months in force</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="shield-account" size={25} color="#ECF0F1" />
            <Text style={styles.infoText}>   Alpha</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome5 name="chalkboard-teacher" size={20} color="#ECF0F1" />
            <Text style={styles.infoText}>   OIT</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1C2C',
  },
  safeAreaContainer: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerImage: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    resizeMode: 'cover',
  },
  profileImageContainer: {
    alignSelf: 'center',
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#0C1C2C',
    width: 140,
    height: 140, 
    borderRadius: 70, 
    marginTop: '25%',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    borderWidth: 6, 
    borderColor: '#FFFFFF',
  },
  nameText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  editProfileButton: {
    alignSelf: 'center',
    marginTop: '5%',
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: '#F39C12',
    borderRadius: 20,
  },
  editProfileText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 30,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#34495E',
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, // Reduced the margin between rows
  },
  infoText: {
    fontSize: 18,
    color: 'white',
  },
});

export default ProfileScreen;
