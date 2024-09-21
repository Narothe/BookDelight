const jwt = require('jsonwebtoken');
const client = require('../config/db');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token is required.' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const session = await client.query('SELECT * FROM bookdelight.Sessions WHERE jwt_token = $1', [token]);

        if (session.rows.length === 0) {
            return res.status(403).json({ error: 'Session expired.' });
        }

        const expiresAt = session.rows[0].expires_at;
        if (new Date(expiresAt) < new Date()) {
            return res.status(403).json({ error: 'Session expired - Invalid token.' });
        }

        req.user = payload;
        req.token = token;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(403).json({ error: 'Invalid token.' });
    }
};


module.exports = { authenticateToken };
