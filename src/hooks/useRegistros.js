import { useDispatch, useSelector } from "react-redux";
import { startingListar } from "../store/registros/registrosThunks";

export const useRegistros = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state=>state.auth);
    const { lista, cargandoLista } = useSelector(state=>state.registros);

    const onListar = () => {
        dispatch( startingListar({idUsuario: user.id}));
    };

    return {
        //* Propiedades
        lista, cargandoLista,
        //* Métodos
        onListar
    }
}