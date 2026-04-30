import "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Toast from 'react-native-toast-message';

const auth = getAuth();

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    Toast.show({
      type: 'success',
      text1: 'Inscription réussie !',
      text2: 'Bienvenue sur votre espace Profil 👋'
    });

    return userCredential.user;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erreur d\'inscription',
      text2: error.message
    });
    throw error;
  }
};