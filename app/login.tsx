import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message'; 
// Importation de votre méthode expert
import { signIn } from '../services/auth_signin';
import { signinWithGithub } from '../services/auth_github';
import { signinWithFacebook } from '../services/auth_facebook_sigin_popup';

export default function LoginScreen() {
  const router = useRouter();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      const user = await signinWithGithub();
      if (user) {
        Toast.show({
          type: 'success',
          text1: 'Connexion réussie',
          text2: 'Bienvenue via GitHub !'
        });
        router.replace('/profile');
      }
    } catch (error: any) {
      setErrorMessage("Erreur d'authentification GitHub : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      const user = await signinWithFacebook();
      if (user) {
        Toast.show({
          type: 'success',
          text1: 'Connexion réussie',
          text2: 'Bienvenue via Facebook !'
        });
        router.replace('/profile');
      }
    } catch (error: any) {
      setErrorMessage("Erreur d'authentification Facebook : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de validation
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setErrorMessage("Format d'email invalide.");
      return false;
    }
    
    if (password.length < 6) {
      setErrorMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }

    setErrorMessage(""); 
    return true;
  };

  // Adaptation pour la redirection intelligente
  const handleSignin = async () => {
    if (validateForm()) {
      setLoading(true); // Active l'indicateur de chargement
      try {
        const user = await signIn(email, password);
        
        if (user) {
          router.replace('/profile');
        }
      } catch (error: any) {
        console.error("Erreur de connexion:", error.message);
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentification</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Text>Email</Text>
      <TextInput
        style={[styles.input, errorMessage.includes("email") && styles.inputError]}
        onChangeText={onChangeEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading} // Désactive l'input pendant le chargement
      />

      <Text>Password</Text>
      <TextInput
        style={[styles.input, errorMessage.includes("passe") && styles.inputError]}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
        editable={!loading}
      />


      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <Button title="Sign In!" onPress={handleSignin} color="#4CAF50" />
        )}
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#2196F3' }]} 
          onPress={() => router.push('/phone-login')}
          disabled={loading}
        >
          <FontAwesome name="phone" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#333' }]} 
          onPress={handleGithubLogin}
          disabled={loading}
        >
          <FontAwesome name="github" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#1877F2' }]} 
          onPress={handleFacebookLogin}
          disabled={loading}
        >
          <FontAwesome name="facebook" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 45,
    width: "100%",
    maxWidth: 300,
    marginVertical: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    maxWidth: 300,
    minHeight: 45, // Évite les sauts de mise en page avec l'ActivityIndicator
    justifyContent: 'center'
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});