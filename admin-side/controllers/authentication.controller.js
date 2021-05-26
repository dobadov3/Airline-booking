module.exports.getLogin = function(req, res){
    res.render('./authentication/login')
}

module.exports.postLogin = function(req, res){
    res.redirect('/')
}