import express from "express"
import dotenv from "dotenv"
import path from 'path'
import connectDB from "./connection/db.js"
import productroute from "./routes/productroute.js"
import userroute from "./routes/userroute.js"
import orderroute from "./routes/orderroute.js"
import bodyParser from "body-parser"
import cors from "cors"

dotenv.config();
const __dirname = path.resolve()
const app = express();
app.use(cors())
connectDB();
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/products',productroute);
app.use('/api/products/:id',productroute);
app.use('/api/user',userroute);
app.use('/api/user/:id',userroute);
app.use('/api/order/:id',orderroute);
app.use('/api/order',orderroute);
app.listen(5000,console.log("running"));
app.use(express.static(path.join(__dirname, '/frontend/build')))

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
)