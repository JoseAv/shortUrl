import { QueryTypes } from "sequelize";
import { postgres } from "../config/postgres/db.js";
import type { typeUrl } from "../interfaces/schema.js";
import type { number } from "zod";
import { Json } from "sequelize/lib/utils";
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


export const getOriginalUrl = async ({ id }: { id: string }) => {
    try {
        const responseDB: resulDb[] = await postgres.query(' select fn_get_url(:id) as result ', {
            replacements: { id: +id },
            type: QueryTypes.SELECT
        })

        if (!responseDB || !responseDB[0] || !(responseDB[0].result)) {
            throw new Error('No se recibio codigo')
        }
        return responseDB[0].result


    } catch (error) {
        console.log(error)
        throw new Error('Code no encontrado o no valido')


    }


}