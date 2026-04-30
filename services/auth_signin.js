import "../firebaseConfig";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Toast from 'react-native-toast-message';

const auth = getAuth();

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    Toast.show({
      type: 'success',
      text1: 'Connexion réussie',
      text2: 'Content de vous revoir !'
    });

    return userCredential.user;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Échec de connexion',
      text2: 'Vérifiez vos identifiants.'
    });
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erreur de déconnexion", error);
  }
};