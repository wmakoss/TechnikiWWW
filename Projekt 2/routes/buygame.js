var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

router.get('/', function(req, res, next)
{
    if(req.userid > 0 && ("id" in req.query))
    {
        var db = new sqlite3.Database('database.db');

        db.all("select id from bought where userid = " + req.userid + " and gameid = " + req.query.id + ";", function(err, row)
        {
            if(row.length == 0)
            {
                db.run("insert into bought (userid, gameid) values (" + req.userid + ", " + req.query.id + ");");
            }

            res.redirect("/mygames");
            db.close();
        });

    }
    else
    {
        res.redirect("/");
    }
});

module.exports = router;
