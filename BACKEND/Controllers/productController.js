import pool from "../config/db.js";

const getAllProducts = async (req, res) => {
    const id_user = Number(req.user.id)
    if (!id_user) {
        return res.status(401).json({ message: 'User id not found: unauthorized user ' })
    }
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
                LEFT JOIN product_details pd ON p.id = pd.product_id
                WHERE p.id_user = ? 
                ORDER BY p.id DESC
            `, [id_user])

        return res.status(200).json(rows);
    } catch (err) {
        console.error('getAllProducts error:', err)
        return res.status(500).json({
            message: 'Failed to fetch products. Please try again later.'
        });
    }
}


const createProduct = async (req, res) => {
    const { name, price, quantity, category_id, supplier_id, description, image_url } = req.body

    const id_user = Number(req.user.id)

    if (!id_user) {
        return res.status(401).json({ message: 'User id not found: unauthorized user ' })
    }

    let connection;
    try {
        connection = await pool.getConnection()
        await connection.beginTransaction();

        const [productResult] = await connection.query(`
                INSERT INTO products (name, price, quantity, category_id, supplier_id, id_user) VALUES (?, ?, ?, ?, ?, ?)`,
            [name, price, quantity, category_id || 1, supplier_id || 1, id_user]
        )

        const newProductId = productResult.insertId

        await connection.query(`
                INSERT INTO product_details (product_id, description, image_url) VALUES (?,?,?)`,
            [newProductId, description || null, image_url || null]
        )

        await connection.commit()

        return res.status(201).json({ message: 'Product created successfully', id: newProductId })
    } catch (err) {
        if (connection) await connection.rollback()
        console.error('createProcut error:', err)
        return res.status(500).json({ message: 'Internal Server Error: Failed to create product.' })
    } finally {
        if (connection) connection.release()
    }
}



const updateProduct = async (req, res) => {
    const { name, price, quantity, category_id, supplier_id, description, image_url } = req.body

    const { id: productId } = req.params
    const id_user = Number(req.user.id)

    if (!id_user) {
        return res.status(401).json({ message: 'User id not found: unauthorized user ' })
    }
    
    let connection;
    try {
        connection = await pool.getConnection()
        await connection.beginTransaction()

        const [result] = await connection.query(`
                UPDATE products SET name = ?, price = ?, quantity = ?, category_id = ?, supplier_id = ?
                WHERE id = ?
                AND id_user = ?
            `, [name, price, quantity, category_id || 1, supplier_id || 1, productId, id_user]
        )

        if (result.warningStatus === 0 && result.affectedRows === 0) {
            return res.status(404).json({ message: `product not found: No product with the id:${productId} is available for this user.` })
        }

        await connection.query(`
                INSERT INTO product_details (product_id, description, image_url)
                VALUES (?,?,?)
                ON DUPLICATE KEY UPDATE
                    description = VALUES(description),
                    image_url = VALUES(image_url)
            `, [productId, description || null, image_url || null]
        )

        await connection.commit()
        res.status(201).json({ message: 'Product updated successfully.' })
    } catch (err) {
        if (connection) await connection.rollback()
        console.error('updateProduct error:', err);
        res.status(500).json({ message: 'Internal Server Error: Failde to update product' })
    } finally {
        if (connection) connection.release()
    }
}

const deleteProduct = async (req, res) => {
    const { id: productId } = req.params
    const id_user = Number(req.user.id)

    if (!id_user) {
        return res.status(401).json({ message: 'User id not found: unauthorized user ' })
    }

    try {
        const [result] = await pool.query(`
                DELETE FROM products
                WHERE id = ?
                AND id_user = ?
            `, [productId, id_user]
        )

        if (result.warningStatus === 0 && result.affectedRows === 0) {
            return res.status(404).json({ message: `product not found: No product with the id:${productId} is available for you` })
        }

        return res.status(200).json({ message: 'Product was successfully deleted.' })
    } catch (err) {
        console.error('deleteProduct error:', err);
        return res.status(500).json({ message: 'Internal Server Error: Failde to delete product' })
    }
}

export { getAllProducts, createProduct, updateProduct, deleteProduct }