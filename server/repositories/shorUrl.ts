import { QueryTypes } from "sequelize";
import { postgres } from "../config/postgres/db.js";
import type { typeUrl } from "../interfaces/schema.js";

export const shortUrl = async ({ url }: { url: typeUrl }) => {

    try {

        return await postgres.query('call p_create_url(:url)', {
            replacements: { url },
            type: QueryTypes.SELECT,
        })

    } catch (Err) {
        throw new Error('Fallo la creacion de la url')
    }

}