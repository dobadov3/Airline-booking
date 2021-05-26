module.exports = function(req, res, next) {
    if (!req.signedCookies.userID) {
        res.redirect('/authentication')
    } else {
        next()
    }
}