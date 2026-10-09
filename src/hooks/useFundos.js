import { useEffect, useState } from "react";
import { getFundosService } from "../services/offline/fundos";

export const useFundos = ({ load = false }) => {
    const [lista, setLista] = useState(null);
    const [cargandoLista, setCargandoLista] = useState(false);

    const onListar = async () => {
        setCargandoLista(true);

        try {
            const data = await getFundosService();
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