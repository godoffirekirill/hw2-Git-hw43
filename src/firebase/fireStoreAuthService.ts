import {
    signOut,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider
} from 'firebase/auth';
import { LoginData } from "../utils/types-bakery-shop.ts";
import { auth } from "../components/configurations/firebase-config.ts";

// Вход с Email и паролем
const loginWithEmail = async (data: LoginData) => {
    try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        return data.email;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error("❌ Login error:", e.message);
            throw new Error(e.message); // Прокидываем дальше в понятном формате
        }
        throw new Error("An unexpected error occurred during login.");
    }
};

// Вход через Google
const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user.email;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error("❌ Google login error:", e.message);
            throw new Error(e.message);
        }
        throw new Error("An unexpected error occurred during Google login.");
    }
};

// Универсальная функция логина (Email / Google)
export const loginFirebase = async (data: LoginData) => {
    return data.email === "GOOGLE" ? loginWithGoogle() : loginWithEmail(data);
};

// Выход из аккаунта
export const signoutFirebase = async () => {
    try {
        await signOut(auth);
        console.log("✅ Successfully signed out");
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error("❌ Sign out error:", e.message);
            throw new Error(e.message);
        }
        throw new Error("An unexpected error occurred during sign-out.");
    }
};

// Регистрация через Email и пароль
export const registerWithEmail = async (data: LoginData) => {
    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        return data.email;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error("❌ Registration error:", e.message);
            throw new Error(e.message);
        }
        throw new Error("An unexpected error occurred during registration.");
    }
};

// Универсальная функция регистрации (Email / Google)
export const registerFirebase = async (data: LoginData) => {
    return data.email === "GOOGLE" ? loginWithGoogle() : registerWithEmail(data);
};
