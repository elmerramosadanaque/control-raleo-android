import { useDispatch, useSelector } from "react-redux";
import { onLogout, startingLogin } from "../store/auth";
import md5 from 'js-md5';
import sha1 from "sha-1";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { message, status, user } = useSelector(state=>state.auth);

    const logIn = ({username, password}) => {
        const usernameCase = username.trim();
        const passwordCoded = sha1(md5(password.trim()));

        dispatch( startingLogin({usuario: usernameCase, password: passwordCoded}));
    };

    const logOut = ()=>{
        dispatch( onLogout() );
    };

    return {
        //* Propiedades
        user,
        isLoggedIn  : Boolean(user),
        isLoginLoading : status === "checking",
        errorLogin: message,
        //* Métodos
        logIn, logOut
    }
}