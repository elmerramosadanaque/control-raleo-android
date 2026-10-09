import { database as db } from "../../data";

export const getColaboradoresService = async () => {
    const data = await db.colaboradores.toArray();
    return data;
};
