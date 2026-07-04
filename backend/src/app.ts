import express from 'express'
import cors from 'cors'
import { unidadeRoutes } from './routes/unidade.routes'


const app = express()

app.use(express.json())
app.use(cors())

app.use('/unidades', unidadeRoutes)

export {app}