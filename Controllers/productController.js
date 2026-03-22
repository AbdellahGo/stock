import pool from "../config/db.js";

const getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                p.id,
                p.name,
                p.price,
                p.quantity,
                p.category_id,
                p.supplier_id,
                c.name AS category_name,
                s.name AS supplier_name,
                pd.description,
                pd.image_url,
                pd.created_at
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN suppliers s ON p.supplier_id = s.id
                LEFT JOIN product_details pd ON p.id = pd.id
                ORDER BY p.id DESC
            `)
        res.json(rows)
    } catch (err) {
        console.error('getAllProducts error:', err)
        res.status(500).json({ message: 'Failde to fetch products.' })
    }
}


const createProduct = async (req, res) => {
    const { name, price, quantity, category_id, supplier_id, description, image_url } = req.body

    if (!name || price === undefined || quantity === undefined) {
        return res.status(400).json({ message: 'name, price, and quantity are required.' })
    }

    const connection = await pool.getConnection()
    try {
        await connection.beginTransaction();
        const [productResult] = await connection.query(`
                INSERT INTO products (name, price, quantity, category_id, supplier_id) VALUES (?, ?, ?, ?, ?)`,
            [name, price, quantity, category_id || 1, supplier_id || 1]
        )
        const newProductId = productResult.insertId

        await connection.query(`
                INSERT INTO product_details (product_id, description, image_url) VALUES (?,?,?)`,
            [newProductId, description || null, image_url || null]
        )

        await connection.commit()

        res.status(201).json({ message: 'Product created', id: newProductId })
    } catch (err) {
        await connection.rollback()
        console.error('createProcut error:', err)
        res.status(500).json({ message: 'Failde to create product.' })
    } finally {
        connection.release()
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, price, quantity, category_id, supplier_id, description, image_url } = req.body
    // ! start: problime if user update somting else not the three importat one code breacks
    // if (!name || price === undefined || quantity === undefined) {
    //     return res.status(400).json({ message: 'name, price, and quantity are required.' })
    // }
    // ! end: problime if user update somting else not the three importat one code breacks

    const connection = await pool.getConnection()
    try {
        await connection.beginTransaction()

        await connection.query(`
                UPDATE products SET name = ?, price = ?, quantity = ?, category_id = ?, supplier_id = ?
                WHERE id = ?
            `, [name, price, quantity, category_id || 1, supplier_id || 1, id]
        )

        await connection.query(`
                INSERT INTO product_details (product_id, description, image_url)
                VALUES (?,?,?)
                ON DUPLICATE KEY UPDATE
                    description = VALUES(description),
                    image_url = VALUES(image_url)
            `, [id, description || null, image_url || null]
        )

        await connection.commit()
        res.status(201).json({ message: 'Product updated.' })
    } catch (err) {
        await connection.rollback()
        console.error('updateProduct error:', err);
        res.status(500).json({ message: 'Failde to update product' })
    } finally {
        connection.release()
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        const [result] = await pool.query(`
                DELETE FROM products
                WHERE id = ?
            `, [id]
        )

        if (result.effectedRows === 0) {
            return res.status(404).json({message: 'product not found'})
        }

        res.status(204).send()
    } catch (err) {
        console.error('deleteProduct error:', err);
        res.status(500).json({ message: 'Failde to delete product' })
    }
}

export { getAllProducts, createProduct, updateProduct, deleteProduct}