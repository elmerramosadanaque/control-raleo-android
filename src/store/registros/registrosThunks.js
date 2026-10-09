import { getRegistrosService } from "../../services/offline/registros";
import { okListar, onListar} from "./registrosSlice";

export const startingListar = ({idUsuario})=>{
    return async ( dispatch )=>{
        dispatch( onListar() );
        try {
            const response = await getRegistrosService({id_contador: idUsuario});

            dispatch( okListar(response));
        } catch (error) {
            console.error({error});
        }
    }
};