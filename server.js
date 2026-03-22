import './config/env.js'
import express, {json} from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import supplierRoutes from './Routes/supplierRoutes.js'
import categoriesRoutes from './Routes/categoryRoutes.js'
import productRoutes from './Routes/productRoutes.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(json())

app.use('/api/products', productRoutes)
app.use('/api/suppliers', supplierRoutes)
app.use('/api/categories', categoriesRoutes)


app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})