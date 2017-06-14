var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: 'xxx'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('views'));

var sess;
var port = 90;
var currentDB = "teacherscamp";
var currentHost = "localhost";
var dbuser = "root";
var dbpass = "";
var mysql = require('mysql');

// assign port
app.listen(port, function() {
    console.log("App Started on PORT " + port);
});

function submitToDB(post, dbName, tableName) {
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect(function(err) {
        // in case of error
        if (err) {
            console.log(err);
        }
    });
    // submit the data
    connection.query('INSERT INTO ' + tableName + ' SET ?', post, function(err, result) {
        if (err) {
            console.log("Insert error: " + err);
        }
    });
    // the connection has been closed
    connection.end(function() {});
}

function queryDB(query) {
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect(function(err) {
        if (err) {
            console.log(err);
        }
    });
    connection.query(query, function(err, rows, fields) {});
    connection.end(function() {});
}


// login | Home page
app.get('/home', function(req, res) {
    sess = req.session;
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var action = params.action;

    if (sess.username && action != "logout") { // already logged in
        res.render("index.html");
        res.end();

    } else if (action == "logout") {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Logged out!");
                res.redirect('/home');
            }
        });
    } else {
        res.render("login.html");
        res.end();
        return false;  
    }

});



app.get('/currentmonthreservations', function(req, res) {
    var connection = mysql.createConnection({
        host: currentHost, user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`select * from reservations 
        where status != 'request'
        order by arrival asc`, function(err, rows, fields) {
            
                if(rows.length != 0) {
                   for(i = 0; i < rows.length; i++){

                      var d = new Date(rows[i].arrival);
                      var month = new Array();
                        month[0] = "January";
                        month[1] = "February";
                        month[2] = "March";
                        month[3] = "April";
                        month[4] = "May";
                        month[5] = "June";
                        month[6] = "July";
                        month[7] = "August";
                        month[8] = "September";
                        month[9] = "October";
                        month[10] = "November";
                        month[11] = "December";
                      var n = month[d.getMonth()];
                      var k = month[(new Date()).getMonth()];

                      if(k == n) {
                          res.write(`
                                    <tr>
                                        <td>`+new String(rows[i].arrival).slice(0, 15)+`</td>
                                        <td>`+new String(rows[i].departure).slice(0, 15)+`</td>
                                        <td>`+rows[i].name+`</td>
                                        <td>`+rows[i].activity+`</td>
                                        <td>`+rows[i].status+`</td>
                                        <td>`+rows[i].contact_no+`</td>
                                     </tr>
                            `);
                          }
                      }
                } else {
                    res.write(`<tr>
                                        <td colspan="6"> No reservations found. </td>
                                     </tr>`);
                }

           res.end();
        });
    connection.end();
});



app.get('/dailyarrivals', function(req, res) {
    var connection = mysql.createConnection({
        host: currentHost, user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`select * from reservations 
        where status != 'request'
        order by arrival asc`, function(err, rows, fields) {
            var item = 0;
                if(rows.length != 0) {
                   for(i = 0; i < rows.length; i++){

                      var d = new String(new Date(rows[i].arrival)).slice(0, 15);
                      var k = new String(new Date()).slice(0, 15);

                      if(k == d) {
                          item++;
                          res.write(`
                                    <tr>
                                        <td>`+rows[i].name+`</td>
                                        <td>`+rows[i].activity+`</td>
                                        <td>`+rows[i].status+`</td>
                                        <td>`+rows[i].contact_no+`</td>
                                     </tr>
                            `);
                          }
                    }
                    if(item == 0) {
                        res.write(`<tr> <td colspan="6"> No reservations found. </td> </tr>`);
                    }
                } else {
                    res.write(`<tr> <td colspan="6"> No reservations found. </td> </tr>`);
                }
           res.end();
        });
    connection.end();
});


// login Submission
app.post('/login', function(req, res) {

    sess = req.session;
    sess.username = req.body.username;
    sess.password = req.body.password;

    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });

    connection.connect(function(err) {if (err) {console.log(err);}});
    connection.query("SELECT * from employees where (username='" + sess.username + "' and password='" + sess.password + "')",
        function(err, rows, fields) {
            if (err) {
                console.log(err);
                return;
            }
            if (rows.length == 1) { // match
                sess = req.session;
                sess.username = req.body.username;
                sess.cid = rows[0].clientno;
                //res.end("done"); // logged in
                //res.redirect("/home");
                res.render("logged-in.html");
            } else {
                req.session.destroy(function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Failed login!");
                        res.render("logged-in-failed.html");
                    }
                });
                return false;
            }
        });
    connection.end(function() {});

});