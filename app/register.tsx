import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message'; 
// Importation de votre méthode expert pour l'inscription
import { signUp } from '../services/auth_signup';
import { signinWithGithub } from '../services/auth_github';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGithubSignup = async () => {
    setLoading(true);
    try {
      const user = await signinWithGithub();
      if (user) {
        Toast.show({
          type: 'success',
          text1: 'Inscription réussie',
          text2: 'Bienvenue via GitHub !'
        });
        router.replace('/profile');
      }
    } catch (error: any) {
      setErrorMessage("Erreur d'inscription GitHub : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de validation (identique au modèle avec une logique de sécurité)
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

  // Logique d'inscription avec redirection intelligente
  const handleSignup = async () => {
    if (validateForm()) {
      setLoading(true); // Active l'indicateur de chargement
      try {
        // Appel de la méthode de création de compte Firebase
        const user = await signUp(email, password);
        
        if (user) {
          // Si l'utilisateur est inscrit -> Redirection automatique vers Profil
          // On utilise .replace pour réinitialiser la pile de navigation
          router.replace('/profile');
        }
      } catch (error: any) {
        // L'erreur est déjà notifiée par le Toast dans auth_signup.js
        console.error("Erreur d'inscription:", error.message);
      } finally {
        setLoading(false); // Désactive le chargement
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      {/* Affichage de l'erreur de validation si elle existe */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Text>Email</Text>
      <TextInput
        style={[styles.input, errorMessage.includes("email") && styles.inputError]}
        onChangeText={onChangeEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <Text>Mot de passe</Text>
      <TextInput
        style={[styles.input, errorMessage.includes("passe") && styles.inputError]}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
        editable={!loading}
      />

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <Button title="S'inscrire" onPress={handleSignup} color="#2196F3" />
        )}
      </View>

      {/* Lien pour retourner à la connexion */}
      <TouchableOpacity onPress={() => router.push('/login')} style={{ marginTop: 20 }}>
        <Text style={styles.linkText}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Button 
          disabled={loading}
          title="S'inscrire avec GitHub" 
          onPress={handleGithubSignup} 
          color="#333" 
        />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
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
    minHeight: 45,
    justifyContent: 'center'
  },
  linkText: {
    color: "#2196F3",
    textDecorationLine: "underline",
  },
});