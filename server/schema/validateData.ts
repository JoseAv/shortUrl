import * as z from "zod";
import type { typeUrl } from "../interfaces/schema.js";

export const validateUrl = z.object({
    url: z.url().refine((url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return { message: 'Url debe de ser http o https' }
        }
    })
})



export const ValidationUrl = async ({ url }: { url: typeUrl }) => {
    return validateUrl.safeParse({ url })
}
