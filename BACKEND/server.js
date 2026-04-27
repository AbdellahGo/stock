import './config/env.js'
import express, { json } from 'express'
// routes
import supplierRoutes from './Routes/supplierRoutes.js'
import categoriesRoutes from './Routes/categoryRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import autheRoutes from './Routes/autheRoutes.js'
import authoRoutes from './Routes/authoRoutes.js'

// middleware
import verifyToken from './middleware/auth.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()
const PORT = process.env.PORT || 8080

// Middleware
//? production
app.use(cors({
    origin: 'https://stock-eta-opal.vercel.app',
    credentials: true
}));
//? dev
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

app.use(json())
app.use(cookieParser());


// todo: to delete this after finiching
app.use('/api/products', verifyToken, productRoutes)
app.use('/api/suppliers', verifyToken, supplierRoutes)
app.use('/api/categories', verifyToken, categoriesRoutes)
app.use('/api/authe', autheRoutes)
app.use('/api/autho', verifyToken, authoRoutes)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})