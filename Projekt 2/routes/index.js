var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

router.get('/', function(req, res, next)
{
    var db = new sqlite3.Database('database.db');
    db.all("select * from games;", function(err, row)
    {
        res.render('index', { userid: req.userid, userlogin: req.userlogin, gamesarray: row });
        db.close();
    });
});

module.exports = router;
