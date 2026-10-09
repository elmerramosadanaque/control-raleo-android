import { database as db } from "../../data";

export const logIn = async ( { usuario }) => {
    const data = await db.contadores
                        .where("usuario")
                        .equals(usuario)
                        .toArray();
    return data;
};
