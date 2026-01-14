// controllers/user.js
const { UserData } = require('../models/user.js');

class UserController {

    constructor() {
        this.userModel = new UserData();
    }

    /**
     * Render login page
     */
    async showLoginPage(req, res) {
        const error = req.session.loginError || null;
        delete req.session.loginError;

        res.render('user_login', {
            title: 'Login',
            error: error
        });
    }

    /**
     * Handle login form submission
     */
    async handleLogin(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            req.session.loginError = 'Username and password are required';
            return res.redirect('/user_login');
        }

        try {
            const user = await this.userModel.findByUsername(username);

            if (!user) {
                req.session.loginError = 'Invalid username or password';
                return res.redirect('/user_login');
            }

            const isValid = await this.userModel.verifyPassword(password, user.password_hash);

            if (!isValid) {
                req.session.loginError = 'Invalid username or password';
                return res.redirect('/user_login');
            }

            req.session.userId = user.id;
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            const returnTo = req.session.returnTo || '/input';
            delete req.session.returnTo;
            res.redirect(returnTo);

        } catch (error) {
            console.error('Login error:', error);
            req.session.loginError = 'An error occurred. Please try again.';
            res.redirect('/user_login');
        }
    }

    /**
     * Handle logout
     */
    async handleLogout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Logout error:', err);
            }
            res.redirect('/');
        });
    }
}

module.exports = {
    UserController
};