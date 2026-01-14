// middleware/auth.js

/**
 * Middleware to check if user is authenticated
 * Redirects to login page if not authenticated
 */
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/user_login');
}

/**
 * Middleware to add user info to all views
 * Makes `user` and `isAuthenticated` available in all EJS templates
 */
function addUserToViews(req, res, next) {
    res.locals.user = req.session.user || null;
    res.locals.isAuthenticated = !!(req.session && req.session.userId);
    next();
}

module.exports = {
    requireAuth,
    addUserToViews
};
