import { useEffect, useState } from "react";
import { getSupervisoresService } from "../services/offline/supervisores";

export const useSupervisor = ({ load = false }) => {
    const [lista, setLista] = useState(null);
    const [cargandoLista, setCargandoLista] = useState(false);

    const onListar = async () => {
        setCargandoLista(true);

        try {
            const data = await getSupervisoresService();
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