import jwt from "jsonwebtoken"


const verifyToken = (req, res, next) => {
    const token = req.cookies.auth_token

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' })
    }

    try {
        // Token validation using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Add the encrypted user data to the request so that we can use it later
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: 'The token is invalid or expired.' });
    }
}

export default verifyToken;