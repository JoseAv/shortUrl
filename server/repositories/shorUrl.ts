import { QueryTypes } from "sequelize";
import { postgres } from "../config/postgres/db.js";
import type { typeUrl } from "../interfaces/schema.js";
type resulDb = {
    result: string
}


export const shortUrl = async ({ url }: { url: typeUrl }) => {

    try {

        const responseDB: resulDb[] = await postgres.query('select fn_create_url(:url) as result', {
            replacements: { url: url.url },
            type: QueryTypes.SELECT,
        })

        if (!responseDB || !responseDB[0] || !(responseDB[0].result)) {
            throw new Error('No se genero el codigo')
        }
        return responseDB[0].result
    } catch (Err) {
        console.log(Err)
        throw new Error('Fallo la creacion de la url')
    }

}