import pool from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const createUser = async (req, res) => {
    const saltRounds = 10
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'username, email and password are required' })
        }

        const hash = await bcrypt.hash(password, saltRounds)

        const [result] = await pool.query(`
                INSERT INTO user (username, email, password) 
                VALUES (?,?,?)
                `, [username, email, hash]
        )
        const token = jwt.sign(
            { id: result.insertId, email, username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // Prevents sending cookies to other websites (CSRF protection)
            maxAge: 24 * 60 * 60 * 1000 // Expires after one day
        })
        return res.status(201).json({
            message: "user created successfully",
            user: { id: result.insertId, email: email, username: username }
        })

    } catch (err) {
        console.error('createUser:', err);
        // Email Already Exists)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'This email address is already registered.' });
        }

        res.status(500).json({ message: 'Failde to create user.' })
    }
}

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required' })
        }

        const [rows] = await pool.query(`
                SELECT id_user, email, username, password
                FROM user
                WHERE email = ?                
            `, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid email address" })
        }

        const user = rows[0];

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (verifyPassword) {
            const token = jwt.sign(
                { id: user.id_user, email: user.email, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict', // Prevents sending cookies to other websites (CSRF protection)
                maxAge: 24 * 60 * 60 * 1000 // Expires after one day
            })

            return res.status(200).json({
                message: "Login successful",
                user: { id: user.id_user, email: user.email, username: user.username }
            })
        } else {
            return res.status(401).json({ message: "Incorrect password" })
        }
    } catch (err) {
        console.error('logInUser:', err);
        res.status(500).json({ message: 'Failde to log in user.' })
    }
}

export { createUser, logInUser }