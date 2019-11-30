

module.exports = {
    formHandler: function(req, res, next){
        var sess=req.session;
        if(sess.username!=null && sess.password!=null)
        {
            next();
        }
        else{
            res.redirect('/');
        }
    }
}

