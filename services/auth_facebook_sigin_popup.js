import {getAuth, signInWithPopup, FacebookAuthProvider} from "firebase/auth";
import {provider} from "./auth_facebook_provider_create";

const auth = getAuth();

export const signinWithFacebook = () => {
    console.log("signinWithFacebook");
    return signInWithPopup(auth,provider)
    .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("signin success with facebook");
        return user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        throw error;
    })
}