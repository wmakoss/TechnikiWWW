var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

router.get('/', function(req, res, next)
{
    if(req.userid == 0)
    {
        res.redirect("/");
    }
    else
    {
        var db = new sqlite3.Database('database.db');
        db.all("select * from games inner join bought on bought.gameid = games.id where bought.userid = " + req.userid + ";", function(err, row)
        {
            res.render('mygames', { userid: req.userid, userlogin: req.userlogin, gamesarray: row });
            db.close();
        });
    }
});

module.exports = router;
