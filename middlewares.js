

module.exports = {
    formHandler: function(req, res, next){
        var sess=req.session;
        if(sess.name!=null && sess.pass!=null)
        {
            next();
        }
        else{
            res.redirect('/');
        }
    }
}

module.exports = {
    formHandler: function(req, res, next){
        var sess=req.session;
        if(sess.name!=null && sess.pass!=null)
        {
            next();
        }
        else{
            res.redirect('/');
        }
    }
}