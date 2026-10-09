import { useEffect, useState } from "react";
import { databaseStores } from "../data/databaseStores";
import { sincronizeSendService} from "../services/online/sincronizeData";
import { getRegistrosParaEnvio, marcarRegistrosEnviados } from "../services/offline/sincronizeData";
import { useSelector } from "react-redux";

export const useSincronizeSend = () => {
    const { user } = useSelector(state=>state.auth);
    const [isLoadingProcessing, setIsLoadingProcessing] = useState(false)
    const [isLoadingSincroSend, setIsLoadingSincroSend] = useState(false);
    const [errorLocal, setErrorLocal] = useState(null);
    const [errorServer, setErrorServer] = useState(null)
    const [mensajeResultado, setMensajeResultado] = useState(null)

    const sincronizeGetToSend = async () => {
        setIsLoadingProcessing(true);

        try {
            const resultSet = await getRegistrosParaEnvio({id_contador: user.id});
            if (resultSet.length <= 0){
                setMensajeResultado("No hay registros para enviar.");
                setTimeout(()=>{
                    setMensajeResultado(null);
                }, 1000);
                return;
            }

            sincronizeSend(procesarDataParaEnviar(resultSet));
            
        } catch (error) {
            setErrorLocal(error);
        } finally {
            setIsLoadingProcessing(false);
        }
    };

    const sincronizeSend = async (resultSetProcesado) => {
        setIsLoadingSincroSend(true);

        try {
            const data  = await sincronizeSendService({data:resultSetProcesado});
            await marcarRegistrosEnviados({id_contador: user.id});
            setMensajeResultado(`${data.msj}: ${data.numero_registros} registros enviados.`);
            setTimeout(()=>{
                setMensajeResultado(null);
            }, 1000);
        } catch (error) {
            setErrorServer(error);
        } finally {
            setIsLoadingSincroSend(false);
        }
    };

    const procesarDataParaEnviar = (data)=>{
        return data;
    };

    const limpiarErrores = () => {
        setErrorLocal(null);
        setErrorServer(null);
    };

    return {
        isLoadingProcessing,
        isLoadingSincroSend,
        errorLocal,
        errorServer,
        mensajeResultado,
        sincronizeGetToSend,
        limpiarErrores
    }
}