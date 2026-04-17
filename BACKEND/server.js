import './config/env.js'
import express, {json} from 'express'
import supplierRoutes from './Routes/supplierRoutes.js'
import categoriesRoutes from './Routes/categoryRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(cors({
    origin: 'https://stock-eta-opal.vercel.app/',
    credentials: true
}));
app.use(json())
app.use('/api/products', productRoutes)
app.use('/api/suppliers', supplierRoutes)
app.use('/api/categories', categoriesRoutes)


app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})