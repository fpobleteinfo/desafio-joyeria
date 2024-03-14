import express from "express";
import cors from 'cors'
import 'dotenv/config.js';
import joyasRouter from "./routes/joyas.routes.js"
import { logger } from "logger-express";

const PORT = process.env.PORT || 3300;


const app = express();
app.use(cors());
app.use(express.json()); // middleware
app.use(logger());
app.use(joyasRouter);


//routers
app.use('/joyas', joyasRouter)

app.listen(PORT, console.log(`¡Servidor encendido! http://localhost:${PORT}`));