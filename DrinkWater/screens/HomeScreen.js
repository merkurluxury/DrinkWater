import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('Erkek');

  const handleSave = () => {
    navigation.navigate('PushScreen');
  };

  const genderOptions = ['Erkek', 'Kadın', 'Diğer'];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./ek.png')} style={styles.image} />
      </View>
      <Text style={styles.title}>Kişisel Bilgiler</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Yaş:</Text>
        <TextInput
          style={styles.input}
          placeholder="Yaşınızı girin"
          value={age}
          onChangeText={(text) => setAge(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Boy (cm):</Text>
        <TextInput
          style={styles.input}
          placeholder="Boyunuzu girin"
          value={height}
          onChangeText={(text) => setHeight(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Cinsiyet:</Text>
        <View style={styles.genderButtons}>
          {genderOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.genderButton,
                gender === option ? styles.selectedGender : null,
              ]}
              onPress={() => setGender(option)}
            >
              <Text style={styles.genderButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Button title="Kaydet" onPress={handleSave} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#0782F9',
  },
  genderButtonText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
});
