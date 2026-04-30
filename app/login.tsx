import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message'; 
// Importation de votre méthode expert
import { signIn } from '../services/auth_signin';

export default function LoginScreen() {
  const router = useRouter();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

      <View style={{ marginTop: 20 }}>
        <Button 
          title="Se connecter avec un numéro de téléphone" 
          onPress={() => router.push('/phone-login')} 
          color="#2196F3" 
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
});