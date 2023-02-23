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
        res.render('login', {userid: req.userid, userlogin: req.userlogin});
    }
});

router.post('/', function(req, res, next)
{
    if(req.body.login == undefined || req.body.password == undefined)
    {
        res.redirect("/");
    }
    else
    {
        var db = new sqlite3.Database('database.db');
        db.all("select id, login from users where login='" + req.body.login + "' and password='" + md5(req.body.password) + "';", function(err, row)
        {
            if(row.length == 1)
            {
                db.run("update sessions set userid = " + row[0].id + " where cookie = '" + req.cookies["session"] + "';");
                res.redirect("/");
            }
            else
            {
                res.render('login', { userid: req.userid, userlogin: req.userlogin, error: "Niepoprawny login lub haslo!" });
            }

            db.close();
        });
    }
});

module.exports = router;
