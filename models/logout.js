var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res){
    req.session.destroy(err){
        if (err) {
            console.error('error will destroying session', err);
        }
    };
    res.clearCookies('authToken');
    res.redirect('/signup');
});