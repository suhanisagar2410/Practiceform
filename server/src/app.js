import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import studentRoute from './routes/studentRoute.js'
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);
console.log("Dir name",__dirname);


dotenv.config();

const app = express()
app.use(express.json())

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  }));

const PORT =  process.env.PORT || 3000

app.use('/images', express.static(path.join(__dirname, 'images')));



mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connected to MongoDb"))
.catch((err)=>console.log(err))


app.use('/api/user', userRoute)
app.use('/api/student',studentRoute)

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>console.log(`LIstening on port ${PORT}`)
)