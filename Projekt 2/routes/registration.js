var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');
var md5 = require('md5');

router.get('/', function(req, res, next)
{
    if(req.userid > 0)
    {
        res.redirect("/");
    }
    else
    {
        res.render('registration', {userid: req.userid, userlogin: req.userlogin});
    }
});

router.post('/', function(req, res, next)
{
    //registration

    if(req.body.login == undefined || req.body.mail == undefined || req.body.password == undefined)
    {
        res.redirect("/");
    }
    else
    {
        var db = new sqlite3.Database('database.db');
        var errormessage = "";

        if(req.body.login.length < 3 || req.body.login.length > 20)
        {
            errormessage = "Login musi posiadac od 3 do 20 znakow!";
        }
        
        if(req.body.password.length < 5 || req.body.password.length > 50)
        {
            errormessage = "Haslo musi posiadac od 5 do 50 znakow!";
        }

        db.all("select id from users where login = '" + req.body.login + "' or mail = '" + req.body.mail + "';", function(err, row)
        {
            if(row.length > 0)
            {
                errormessage = "Podany login lub adres e-mail jest już zajęty!";
            }

            if(errormessage == "")
            {
                db.run("insert into users (login, password, mail) values('" + req.body.login + "', '" + md5(req.body.password) + "', '" + req.body.mail + "');");
                res.render('welcome', {userid: req.userid, userlogin: req.userlogin});
            }
            else
            {
                res.render('registration', {userid: req.userid, userlogin: req.userlogin, error: errormessage});
            }
    
            db.close();
        });

    }

});

module.exports = router;
