import { logIn as loginService } from "../../services/offline";
import { onChecking, onLogin, onLogout, onErrorLogin } from "./authSlice";

export const startingLogin = ({usuario, password})=>{
    return async ( dispatch )=>{
        dispatch( onChecking() );
        try {
            const response = await loginService({usuario});

            if (!response.length){
                throw("No existe este usuario");
            }

            const usuarioFound  = response[0];
            if (usuarioFound.clave !== password){
                throw("Clave incorrecta");
            }

            dispatch( onLogin({
                id: usuarioFound.id_contador,
                usuario : usuarioFound.usuario,
                nombres : usuarioFound.descripcion
            }));

        } catch (error) {
            console.error({error});
            dispatch(onErrorLogin(typeof error === 'string' ? error : JSON.stringify(error)));
            setTimeout(()=>{
                dispatch(onLogout());
            }, 3000);
        }
    }
};