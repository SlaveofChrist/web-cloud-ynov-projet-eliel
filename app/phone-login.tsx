import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../firebaseConfig';
import { sendPhoneCode, verifyPhoneCode } from '../services/auth_phone';

export default function PhoneLoginScreen() {
  const router = useRouter();
  const recaptchaVerifier = useRef(null);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendCode = async () => {
    if (!phoneNumber) {
      setErrorMessage("Veuillez entrer un numéro de téléphone valide.");
      return;
    }
    
    setLoading(true);
    setErrorMessage("");
    try {
      const result = await sendPhoneCode(phoneNumber, recaptchaVerifier.current);
      setConfirmationResult(result);
      Toast.show({
        type: 'success',
        text1: 'SMS envoyé',
        text2: 'Veuillez vérifier vos messages.'
      });
    } catch (error: any) {
      setErrorMessage("Erreur lors de l'envoi du SMS : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || !confirmationResult) {
      setErrorMessage("Veuillez entrer le code de vérification.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      const user = await verifyPhoneCode(confirmationResult, verificationCode);
      if (user) {
        Toast.show({
          type: 'success',
          text1: 'Connexion réussie',
          text2: 'Bienvenue !'
        });
        router.replace('/profile');
      }
    } catch (error: any) {
      setErrorMessage("Code invalide : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />
      
      <Text style={styles.title}>Connexion par téléphone</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {!confirmationResult ? (
        <>
          <Text>Numéro de téléphone (ex: +33612345678)</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            keyboardType="phone-pad"
            autoCapitalize="none"
            editable={!loading}
            placeholder="+33 6 12 34 56 78"
          />
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#4CAF50" />
            ) : (
              <Button title="Envoyer le code" onPress={handleSendCode} color="#4CAF50" />
            )}
          </View>
        </>
      ) : (
        <>
          <Text>Code de vérification</Text>
          <TextInput
            style={styles.input}
            onChangeText={setVerificationCode}
            value={verificationCode}
            keyboardType="number-pad"
            editable={!loading}
            placeholder="123456"
          />
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#4CAF50" />
            ) : (
              <Button title="Vérifier le code" onPress={handleVerifyCode} color="#4CAF50" />
            )}
          </View>
          <View style={styles.linkContainer}>
            <Button title="Changer de numéro" onPress={() => setConfirmationResult(null)} color="gray" />
          </View>
        </>
      )}

      <View style={styles.linkContainer}>
        <Button title="Retour à la connexion Email" onPress={() => router.back()} color="#2196F3" />
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
  linkContainer: {
    marginTop: 15,
    width: "100%",
    maxWidth: 300,
  }
});
