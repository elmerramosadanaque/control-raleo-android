import { useEffect, useState } from "react";
import { getColaboradoresService } from "../services/offline/colaboradores";

export const useColaborador = ({ load = false }) => {
    const [lista, setLista] = useState(null);
    const [cargandoLista, setCargandoLista] = useState(false);

    const onListar = async () => {
        setCargandoLista(true);

        try {
            const data = await getColaboradoresService();
            if (data){
                setLista(data);
            }
        } catch (error) {
            console.error({error});
        } finally {
            setCargandoLista(false);
        }
    };

    useEffect(() => {
      if (load === true){
        onListar();
      }
    }, [load])
    
    return {
        //* Propiedades
        lista, cargandoLista,
        //* Métodos
        onListar
    }
}