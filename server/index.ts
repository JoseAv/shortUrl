import express from 'express'
import type { Request, Response } from 'express'
import { ComprobationUrl } from './schema/comprobateionSchema.js'
import { shortUrl } from './repositories/shorUrl.js'

const app = express()
const Port = 3000
app.use(express.json())


app.post('/', async (req: Request, res: Response) => {
    try {
        const url = req.body.url
        const parseUrl = await ComprobationUrl({ url })
        await shortUrl({ url: parseUrl })


        res.status(200).json({ message: 'Creado con existo' })

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Error en crear la url' })
    }
})



app.listen(Port, () => {
    console.log('Listen on port 3000')
})