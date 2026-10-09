import { database as db } from "../../data";

export const getFundosService = async () => {
    const data = await db.fundos.toArray();
    return data;
};
