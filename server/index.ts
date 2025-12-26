import express from 'express'
import type { Request, Response } from 'express'
import { ComprobationUrl } from './schema/comprobateionSchema.js'
import { shortUrl } from './repositories/shorUrl.js'
import { envData } from './config/const/env.js'

const app = express()
const Port = 3000
app.use(express.json())


app.post('/', async (req: Request, res: Response) => {
    try {
        const url = req.body.url
        const parseUrl = await ComprobationUrl({ url })
        const responseDB = await shortUrl({ url: parseUrl })
        const createNewUrl = envData.baseUrl + responseDB
        res.status(200).json({ message: 'Creado con existo', url: createNewUrl })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'FIN DE LA URL' })
    }
})



app.listen(Port, () => {
    console.log('Listen on port 3000')
})