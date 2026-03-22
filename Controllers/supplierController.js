import pool from '../config/db.js'

const getAllSuppliers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, phone, email FROM suppliers ORDER BY name ASC');
        res.json(rows);
    } catch (err) {
        console.error('getAllSuppliers error:', err);
        res.status(500).json({message: 'Failed to fetch suppliers.'});
    }
}

export default getAllSuppliers;