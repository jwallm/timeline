// models/user.js
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

class UserData {

    /**
     * Find user by username
     * @param {string} username
     * @returns {Promise<Object|null>}
     */
    async findByUsername(username) {
        const sql = "SELECT * FROM users WHERE username = ? AND is_active = 1";
        const results = await Database.runQuery(sql, [username]);
        return results.length > 0 ? results[0] : null;
    }

    /**
     * Find user by ID
     * @param {number} id
     * @returns {Promise<Object|null>}
     */
    async findById(id) {
        const sql = "SELECT id, username, email, created_at FROM users WHERE id = ? AND is_active = 1";
        const results = await Database.runQuery(sql, [id]);
        return results.length > 0 ? results[0] : null;
    }

    /**
     * Verify password against stored hash
     * @param {string} password - Plain text password
     * @param {string} hash - Stored bcrypt hash
     * @returns {Promise<boolean>}
     */
    async verifyPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }

    /**
     * Create new user
     * @param {string} username
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Object>}
     */
    async createUser(username, email, password) {
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
        const result = await Database.runQuery(sql, [username, email, passwordHash]);
        return { id: result.insertId, username, email };
    }
}

module.exports = {
    UserData
};