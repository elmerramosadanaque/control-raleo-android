import { database as db } from '../../data/database';

export const registrarMasivo = async ( { data, storeName }) => {
    const res = await db[storeName].bulkAdd(data);
    return res;
};

export const clearMasivo = async ( { storeName }) =>{
    const res = await db[storeName].clear();
    return res;
}

export const getRegistrosParaEnvio = async ({id_contador}) => {
    const estado_envio = 0;
    const res = await db.registro_raleos.where([
                    "id_contador",
                    "estado_envio"
                ]).equals([
                    id_contador,
                    estado_envio
                ]).toArray();
    return res;
};

export const marcarRegistrosEnviados = async ({id_contador}) => {
    const preResults = await db.registro_raleos.where([
                            "id_contador", "estado_envio"
                        ]).equals([
                            id_contador, 0
                        ]).toArray();

    let resultsToUpdate = preResults.map((o)=>{
        return {...o, estado_envio: 1};
    });
                
    db.registro_raleos.bulkPut(resultsToUpdate);
};