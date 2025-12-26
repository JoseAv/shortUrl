import express from 'express'
import type { Request, Response } from 'express'
import { ComprobationUrl } from './schema/comprobateionSchema.js'
import { getOriginalUrl, shortUrl } from './repositories/shorUrl.js'
import { envData } from './config/const/env.js'
import { convert62, decode } from './config/base/base32.js'

const app = express()
const Port = 3000
app.use(express.json())


app.post('/', async (req: Request, res: Response) => {
    try {
        const url = req.body.url
        const parseUrl = await ComprobationUrl({ url })
        const result = await shortUrl({ url: parseUrl })
        const code = convert62(+result)
        const createNewUrl = envData.baseUrl + code

        res.status(200).json({ message: 'Creado con existo', url: createNewUrl })
    } catch (error) {
        res.status(400).json({ message: 'FIN DE LA URL', error })
    }
})

app.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const newId = decode(String(id))
        const response = await getOriginalUrl({ id: String(newId) })
        res.status(200).json({ message: 'Creado con existo', url: response })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'FIN DE LA URL', error })
    }

})



app.listen(Port, () => {
    console.log('Listen on port 3000')
})