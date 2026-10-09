import { database as db } from "../../data";

export const getSupervisoresService = async () => {
    const data = await db.supervisores.toArray();
    return data;
};
