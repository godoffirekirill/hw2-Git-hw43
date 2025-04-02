import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { login, logout } from "../../features/authSlice";

import { registerFirebase } from "../../firebase/fireStoreAuthService.ts";
import { LoginData, Paths, UserDataType } from "../../utils/types-bakery-shop.ts";
import { SignUpCard } from "../templates/SignUpCard.tsx";
import { addUser } from "../../firebase/firebaseUserDataService.ts";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const signUpFirebaseUserStorage = async (data: UserDataType) => {
        const setUpData: LoginData = {
            email: data.email,
            password: data.password as string,
        };

        try {
            const email = await registerFirebase(setUpData);
            dispatch(login(email));




            // Добавляем пользователя в Firestore
            await addUser({
                ...data,
                registeredAt: new Date().toISOString(), // фиксируем дату регистрации
                phone: "",
                address: "",
                notes: "",
            });

            navigate(Paths.HOME);
        } catch (e: unknown) {
            dispatch(logout());

            if (e instanceof Error) {
                console.error("❌ Sign up error:", e.message);
                alert(e.message);
            } else {
                console.error("❌ Unknown error occurred:", e);
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <div>
            <SignUpCard signUpFn={signUpFirebaseUserStorage} />
            <button onClick={() => navigate(Paths.HOME)}>To main page</button>
        </div>
    );
};

export default SignUp;
