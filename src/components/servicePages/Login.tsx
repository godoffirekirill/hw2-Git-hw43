import {SignInCard} from "../templates/SignInCard.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {LoginData, Paths} from "../../utils/types-bakery-shop.ts";
import {login} from "../../features/authSlice.ts";
import {loginFirebase} from "../../firebase/fireStoreAuthService.ts";


const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const submitFn=(loginData:LoginData)=>{
    //     if (!loginData)
    //         return;
    //
    //     dispatch(login(loginData.email));
    //
    //     navigate("/");
    // }
const submitFnFirebase=async (loginData:LoginData)=>{
       try {
           const email = await loginFirebase(loginData);
           dispatch(login(email));
           navigate(Paths.HOME);

       }catch (e: unknown) {
           if (e instanceof Error) {


               let errorMessage = e.message;

               // Обрабатываем код ошибки Firebase
               if (
                   errorMessage.includes("auth/user-not-found") ||
                   errorMessage.includes("auth/wrong-password") ||
                   errorMessage.includes("auth/invalid-credential")
               ) {
                   errorMessage = "Incorrect email or password. Please try again.";
               }

               alert(errorMessage); // Выводим только одно сообщение об ошибке
           } else {

               alert("An unexpected error occurred.");
           }
       }
}
    return (
       <SignInCard submitFn={submitFnFirebase}/>
    );
};

export default Login;