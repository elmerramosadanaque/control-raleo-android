import { database as db } from "../../data";

export const getLotesService = async ({idFundo}) => {
    const data = await db.lotes
                            .where("id_fundo")
                            .equals(idFundo)
                            .toArray();
    return data;
};
