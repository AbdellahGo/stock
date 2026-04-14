import pool from "../config/db.js";

const getAllCategories = async (req , res) => {
    try {
        const [rows] = await pool.query('SELECT id, name FROM categories ORDER BY name ASC');
        res.json(rows)
    } catch (err) {
        console.error('getAllCategories error:', err);
        res.status(500).json({message: 'Failed to fetch categories.'})
    }
}

export default getAllCategories