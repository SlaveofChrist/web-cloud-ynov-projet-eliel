import "../firebaseConfig";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth();

/**
 * Envoie un code de vérification par SMS au numéro de téléphone spécifié.
 * @param {string} phoneNumber - Le numéro de téléphone au format international (ex: +33612345678).
 * @param {object} recaptchaVerifier - L'instance du vérificateur ReCaptcha.
 * @returns {Promise<any>} Le résultat de la confirmation (confirmationResult).
 */
export const sendPhoneCode = async (phoneNumber, recaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error("Erreur lors de l'envoi du code SMS:", error);
    throw error;
  }
};

/**
 * Vérifie le code SMS saisi par l'utilisateur.
 * @param {object} confirmationResult - L'objet retourné par sendPhoneCode.
 * @param {string} code - Le code reçu par SMS.
 * @returns {Promise<any>} L'utilisateur connecté.
 */
export const verifyPhoneCode = async (confirmationResult, code) => {
  try {
    const result = await confirmationResult.confirm(code);
    return result.user;
  } catch (error) {
    console.error("Erreur lors de la vérification du code SMS:", error);
    throw error;
  }
};
