import { useState } from "react";
import { getLotesService } from "../services/offline/lotes";

export const useLotes = () => {
    const [lista, setLista] = useState(null);
    const [cargandoLista, setCargandoLista] = useState(false);

    const onListar = async ({idFundo}) => {
        setCargandoLista(true);
        setLista([]);

        try {
            const data = await getLotesService({idFundo});
            if (data){
                setLista(data);
            }
        } catch (error) {
            console.error({error});
        } finally {
            setCargandoLista(false);
        }
    };

    return {
        //* Propiedades
        lista, cargandoLista,
        //* Métodos
        onListar
    }
}