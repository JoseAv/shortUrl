import express from 'express'
import type { Request, Response } from 'express'

const app = express()
const Port = 3000


app.post('/', (req: Request, res: Response) => {
    console.log(req.body)
    res.send('hola')

})



app.listen(Port, () => {
    console.log('Listen on port 3000')
})