import { useEffect, useState } from "react";
import { databaseStores } from "../data/databaseStores";
import { sincronizeAskService} from "../services/online/sincronizeData";
import { registrarMasivo, clearMasivo } from "../services/offline/sincronizeData";

export const useSincronizeAsk = () => {
    const [ isLoadingSincroAsk, setIsLoadingSincroAsk ] = useState(false);
    const [ registrosTotales, setRegistrosTotales ] = useState(0);
    const [ registrosActuales, setRegistrosActuales ] = useState(0);
    const [ isOpenDialog, setIsOpenDialog ] = useState(false);
    const TIEMPO_TRAS_COMPLETAR = 2; //segundos

    useEffect(() => {
        let timer;
        if (registrosActuales >= registrosTotales){
            timer = setTimeout(()=>{
                setIsOpenDialog(false);
            }, TIEMPO_TRAS_COMPLETAR * 1000);
        }

        return ()=>{
            if (timer){
                clearInterval(timer);
            }
        };
    }, [registrosTotales, registrosActuales]);

    const sincronizeAsk = () => {
        setRegistrosTotales(0);
        setRegistrosActuales(0);
        setIsOpenDialog(true);
        setIsLoadingSincroAsk(true);
        sincronizeAskService()
            .then(response => {
                setRegistrosTotales(response?._contador);
                databaseStores.forEach((o,i)=>{
                    if (o.sincronizeAsk === false){
                        return;
                    }
                    const data = response[o.storeName];
                    clearMasivo( { storeName: o.storeName })
                        .then(function(){
                            if (data && data.length){
                                const cantidadRegistros = data.length;
                                registrarMasivo({ data: data, storeName: o.storeName })
                                    .then(function(){
                                        setRegistrosActuales( (prev)=>{
                                            return prev + cantidadRegistros;
                                        })                                        
                                    })
                                    .catch(function(e){
                                        console.error(e);
                                    });    
                            }
                        })
                        .catch(function(e){
                            console.error("Error al limpiar store. ", e);
                        })
                });

            })
            .catch(err => {
                console.error(err);
            })
            .finally(()=>{
                setIsLoadingSincroAsk(false);
            });
    };

    return {
        isLoadingSincroAsk,
        isOpenDialog,
        registrosTotales,
        registrosActuales,
        sincronizeAsk
    }
}