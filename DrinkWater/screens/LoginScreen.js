import { StyleSheet, Text, View, KeyboardAvoidingView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

// Logo eklemek için bir resim yolunu aşağıdaki gibi tanımlayın
const logoImage = require('./logo.png');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Kullanıcı ', user.email);
      })
      .catch((error) => alert(error.message));
  };
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Kullanıcı giriş yaptı', user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Logo eklemek için Image bileşenini kullanın */}
      <Image source={logoImage} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.outlineButton]}
        >
          <Text style={styles.outlineButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Logo stilini ayarlayın
  logo: {
    width: 400, // Logo genişliğini ve yüksekliğini istediğiniz gibi ayarlayabilirsiniz
    height: 400,
    resizeMode: 'contain', // Logo resminin boyutunu korumak için
    marginBottom: 5, // Logo ile diğer bileşenler arasındaki boşluğu ayarlayın
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '60%',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold', // Kalın yazı tipi için 'bold' kullanın
  },
  outlineButton: {
    backgroundColor: 'white',
    marginTop: 5,
  },
  outlineButtonText: {
    color: '#0782F9',
    fontSize: 16,
    fontWeight: 'bold', // Kalın yazı tipi için 'bold' kullanın
  },
});
