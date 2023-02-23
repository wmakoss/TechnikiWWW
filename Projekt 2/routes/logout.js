var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

router.get('/', function(req, res, next)
{
    var db = new sqlite3.Database('database.db');
    db.run("update sessions set userid = 0 where cookie = '" + req.cookies["session"] + "';");
    res.redirect("/");
    db.close();
});

module.exports = router;
