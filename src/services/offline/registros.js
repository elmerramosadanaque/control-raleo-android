import { database as db } from "../../data";

export const getRegistrosService = async ({id_contador}) => {
    const data = await db.registro_raleos
                        .where("id_contador")
                        .equals(id_contador)
                        .toArray();


    const resultSet = [];
    for (let index = 0; index < data.length; index++) {
        const { id, fecha_registro, id_colaborador, id_contador, id_supervisor, id_lote, id_fundo, detalle_plantas, estado_envio, observaciones} = data[index];
        const { descripcion : colaborador } = await db.colaboradores.get({id_colaborador});
        const { descripcion : contador } = await db.contadores.get({id_contador});
        const { descripcion : supervisor } = await db.supervisores.get({id_supervisor});
        const { cc : lote } = await db.lotes.get({id_lote});
        const { descripcion : fundo } = await db.fundos.get({id_fundo});

        const infoDetallePlantas = JSON.parse(detalle_plantas);

        resultSet.push({
            id,
            fecha_registro,
            colaborador,
            contador,
            supervisor,
            lote,
            fundo,
            observaciones,
            total_plantas : infoDetallePlantas.length,
            total_racimos : infoDetallePlantas.reduce((acum, item)=>{return acum + parseInt(item.cantidad)}, 0),
            estado_envio
        });
    }
    return resultSet.toReversed();
};

export const getRegistrosColaboradorService = async ({id_contador, id_supervisor, id_fundo, id_lote, id_colaborador, fecha_registro}) => {
    const data = await db.registro_raleos
                        .where(["id_supervisor", "id_fundo", "id_colaborador", "id_lote", "id_contador", "fecha_registro"])
                        .equals([id_supervisor, id_fundo, id_colaborador, id_lote, id_contador, fecha_registro])
                        .toArray();
    return data;
};

export const upsertRegistroColaborador = async ({id_contador, id_supervisor, id_lote, id_fundo,
                                                    id_colaborador, fecha_registro, observaciones,
                                                    detalle_plantas}) => {
    const items = await db.registro_raleos
                        .where(["id_supervisor", "id_fundo", "id_colaborador", "id_lote", "id_contador", "fecha_registro"])
                        .equals([id_supervisor, id_fundo, id_colaborador, id_lote, id_contador, fecha_registro])
                        .toArray();

    if (items.length > 0){
        const [{ id }] = items;
        const resultSet = await db.registro_raleos.update(id, {
            detalle_plantas: JSON.stringify(detalle_plantas)
        });
        return resultSet;
    }

    const resultSet = await db.registro_raleos.add({
        id_supervisor: id_supervisor.toString(),
        id_fundo: id_fundo.toString(),
        id_colaborador:  id_colaborador.toString(),
        id_lote:  id_lote.toString(),
        id_contador: id_contador.toString(),
        fecha_registro,
        detalle_plantas: JSON.stringify(detalle_plantas),
        observaciones,
        estado_envio: 0,
    });

    return resultSet;
};

