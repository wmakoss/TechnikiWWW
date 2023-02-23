var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

router.get('/', function(req, res, next)
{
    var db = new sqlite3.Database('database.db');
    
    if(!("id" in req.query))
    {
        res.redirect("/");
    }
    else
    {
        db.all("select id from bought where userid = " + req.userid + " and gameid = " + req.query.id + ";", function(err, row)
        {
            if(row.length > 0) // user has game
            {
                db.all("select * from games where id = " + req.query.id + ";", function(err, row)
                {
                    if(row.length == 0)
                    {
                        res.redirect("/");
                    }
                    else
                    {
                        res.render('game', { userid: req.userid, userlogin: req.userlogin, gameinfo: row[0], mygame: true });
                    }
                    db.close();
                });
            }
            else // user does not have the game
            {
                db.all("select * from games where id = " + req.query.id + ";", function(err, row)
                {
                    if(row.length == 0)
                    {
                        res.redirect("/");
                    }
                    else
                    {
                        res.render('game', { userid: req.userid, userlogin: req.userlogin, gameinfo: row[0], mygame: false });
                    }
                    db.close();
                });
            }
        });
    }

});

module.exports = router;
