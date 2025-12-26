import type { typeUrl } from "../interfaces/schema.js";
import { ValidationUrl } from "./validateData.js";

export const ComprobationUrl = async ({ url }: { url: typeUrl }) => {
    try {
        const valid = await ValidationUrl({ url })
        console.log(valid)
        if (!valid.success) {
            throw new Error('No es una url Valida')
        }

        return valid.data

    } catch (err) {
        throw new Error('No es una url Valida')
    }


}