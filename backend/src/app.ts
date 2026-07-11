import express from 'express'
import cors from 'cors'
import unidadeRoutes from './routes/unidade.routes'
import {authRoutes} from './routes/auth.routes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
})); 

app.use(cookieParser()); 
app.use('/unidades',unidadeRoutes);
app.use('/auth',authRoutes);

export {app};