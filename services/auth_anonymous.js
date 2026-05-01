import { getAuth, signInAnonymously } from "firebase/auth";

const auth = getAuth();

export const signinAnonymouslyUser = () => {
    console.log("signinAnonymously");
    return signInAnonymously(auth)
        .then((result) => {
            const user = result.user;
            console.log("signin success anonymously");
            return user;
        })
        .catch((error) => {
            console.error("Error signing in anonymously:", error);
            throw error;
        });
};
