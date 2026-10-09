export const databaseStores = [
    { storeName: "contadores",  sincronizeAsk: true, definition: "++id,id_contador, descripcion, usuario, clave" },
    { storeName: "supervisores", sincronizeAsk: true,  definition: "++id,id_supervisor, descripcion, usuario, clave" },
    { storeName: "colaboradores",  sincronizeAsk: true, definition: "++id,id_colaborador, descripcion, usuario, clave" },
    { storeName: "lotes", sincronizeAsk: true,  definition: "++id,id_lote, area, cc, id_fundo" },
    { storeName: "fundos",  sincronizeAsk: true, definition: "++id,id_fundo, descripcion" },
    { storeName: "registro_raleos",  sincronizeAsk: false, 
            definition: "++id,id_supervisor,id_fundo,id_colaborador,id_lote,id_contador,fecha_registro,hora_registro,detalle_plantas,estado_envio,observaciones",
            indexes : ["[id_supervisor+id_fundo+id_colaborador+id_lote+id_contador+fecha_registro]", 
                        "[id_contador+id_colaborador]", 
                        "[id_contador+estado_envio]"]
    }
];