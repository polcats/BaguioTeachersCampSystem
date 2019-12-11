// NOTE: OTHER CODES FROM btc6 - copy.js NOT ADDED YET

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
var currentHost = "127.0.0.1";
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
        }
    });
    connection.query(query, function(err, res, rows, fields) {  });
    connection.end(function() {});
}

app.get('/pages', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.render("notif-3_not-logged-in.html");
        res.end();
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;


    if(id == "" || !id || id == undefined) {
        res.render("notif-4_page-error.html");
    } else if(id == "1") {
        res.render("notif-1_logged-in.html");
    } else if(id == "2") {
        res.render("notif-2_log-in-failed.html");
    } else if(id == "3") {
        res.render("notif-3_not-logged-in.html");
    } else if(id == "4") {
        res.render("notif-4_page-error.html");
    } else if(id == "5") {
        res.render("notif-5_reservation-saved.html");
    } else if(id == "6") {
        res.render("notif-6_reservation-updated.html");
    } else if(id == "7") {
        res.render("notif-7_reservation-failed.html");
    } else if(id == "8") {
        res.render("notif-8_registration-saved.html");
    } else if(id == "9") {
        res.render("notif-9_registration-updated.html");
    } else if(id == "10") {
        res.render("notif-10_registration-failed.html");
    } else if(id == "11") {
        res.render("notif-11_facilitiy-saved.html");
    } else if(id == "12") {
        res.render("notif-12_facilitiy-updated.html");
    } else if(id == "13") {
        res.render("notif-13_facilitiy-delete.html");
    } else if(id == "14") {
        res.render("notif-14_employee-saved.html");
    } else if(id == "15") {
        res.render("notif-15_employee-updated.html");
    } else if(id == "16") {
        res.render("notif-16_employee-deleted.html");
    } else if(id == "17") {
        res.render("notif-17_no-permission.html");
    }
});

// index
app.get('/', function(req, res) {
    res.redirect("/home");
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

    connection.connect();
    connection.query("SELECT * from employees where (username='" + sess.username + "' and password='" + sess.password + "')",
        function(err, rows, fields) {
            if (err) {
                return;
            }
            if (rows.length == 1) { // match
                sess = req.session;
                sess.username = req.body.username;
                sess.userFullName = rows[0].first_name+" "+rows[0].last_name;
                sess.rank = rows[0].rank;
                res.redirect("/home");

            } else {
                req.session.destroy(function(err) {
                    if (err) {
                    } else {
                        res.redirect("/pages?id=2");
                        return false;
                    }
                });
                return false;
            }
        });
    connection.end(function() {});

});

// login | Home page
app.get('/home', function(req, res) {
    sess = req.session;
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var action = params.action;

    if (sess.username && action != "logout") { // already logged in
        res.render("home.html");
        res.end();
    } else if (action == "logout") {
        req.session.destroy(function(err) {
            if (err) {} else {
                res.redirect('/home');
            }
        });
    } else {
        res.render("login.html");
        res.end();
        return false;
    }

});

// Dashboard
app.get('/currentmonthreservations', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth()+1;
    var currentYear = currentDate.getFullYear();

    connection.connect();
    connection.query(`select * from reservations where year(arrival) = "`+currentYear+`" and month(arrival) = "`+currentMonth+`" order by arrival asc, departure asc`, function(err, rows, fields) {

        if (rows.length > 0) {
            for (i = 0; i < rows.length; i++) {
                res.write(`
                                <tr>
                                    <td>` + new String(rows[i].arrival).slice(3, 15) + `</td>
                                    <td>` + new String(rows[i].departure).slice(3, 15) + `</td>
                                    <td>` + rows[i].name + `</td>
                                    <td>` + rows[i].activity + `</td>
                                    <td width="15%">` + new String(rows[i].status).replace("unconfirmed","pencil") + `</td>
                                    <td><a type="submit" class="btn btn-info btn-sm btn-fill pull-left" href="/viewDetails?id=`+rows[i].id+`">View Details</a></td>
                                </tr>
                 `);
            }
        } else {
            res.write(`<tr> <td colspan="6"> No reservations this month. </td> </tr>`);
        }
        res.end();
    });
    connection.end();
});

// Dashboard
app.get('/dailyarrivals', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });

    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth()+1;
    var currentYear = currentDate.getFullYear();

    connection.connect();
    connection.query(`select * from reservations where 
    year(arrival) = "`+currentYear+`" and 
    month(arrival) = "`+currentMonth+`" and
    day(arrival) = "`+currentDay+`" and 
    status = "confirmed"
    order by arrival asc`, function(err, rows, fields) {
        var item = 0;
        if (rows.length != 0) {
            for (i = 0; i < rows.length; i++) {
                    res.write(`
                                    <tr>
                                        <td>` + rows[i].name + `</td>
                                        <td>` + rows[i].activity + `</td>
                                        <td>` + new String(rows[i].status).replace("unconfirmed","pencil") + `</td>
                                        <td>` + rows[i].contact_no1 + `</td>
                                        <td>` + rows[i].contact_no2 + `</td>
                                        <td><a type="submit" class="btn btn-info btn-sm btn-fill pull-left" href="/viewDetails?id=`+rows[i].id+`">View Details</a></td>
                               
                                     </tr>
                            `);
            }
        } else {
            res.write(`<tr> <td colspan="6"> No reservations today. </td> </tr>`);
        }
        res.end();
    });
    connection.end();
});


// Dashboard Calendar
app.get('/calendar', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
    } else {
        res.render("calendar.html");
    }
});


app.get('/calendarData', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`SELECT * FROM reservations where status != "cancelled" order by arrival`, function(err, rows, fields) {
        if (rows.length != 0) {

            res.write(`var events = [ `)
            for (i = 0; i < rows.length; i++) {
                var arrive = new Date(rows[i].arrival);
                var arriveFormat = new Date(arrive.getFullYear(), arrive.getMonth(), arrive.getDate());
                var departs = new Date(rows[i].departure);
                var departsDay = departs.getDate()+1; 
                var arriveDay = arrive.getDate();
                var departsMonth = departs.getMonth();
                var arriveMonth = arrive.getMonth();
                var name = rows[i].name;

                if(i == rows.length-1) {
                    if(arriveMonth < departsMonth){
                        while(arriveDay > departsDay && arriveDay < 32) {
                            if(arriveDay == departsDay-1){
                                res.write(`
                                            {'Date': new Date(` + arrive.getFullYear() + `, ` + arriveMonth + `, ` + arriveDay + `), 'Title':"` + name + `", 'Link':'/viewDetails?id=`+ rows[i].id + `'}
                                        `);
                                arriveDay++;
                            } else {
                                res.write(`
                                            {'Date': new Date(` + arrive.getFullYear() + `, ` + arriveMonth + `, ` + arriveDay + `), 'Title':"` + name + `", 'Link':'/viewDetails?id=`+ rows[i].id + `'},
                                        `);
                                arriveDay++;
                            }
                        }
                        arriveDay = 1;
                        arriveMonth++;
                        while(arriveDay < departsDay) {
                            if(arriveDay == departsDay-1){
                                res.write(`
                                            {'Date': new Date(` + arrive.getFullYear() + `, ` + arriveMonth + `, ` + arriveDay + `), 'Title':"` + name + `", 'Link':'/viewDetails?id=`+ rows[i].id + `'}
                                        `);
                                arriveDay++;
                            } else {
                                res.write(`
                                            {'Date': new Date(` + arrive.getFullYear() + `, ` + arriveMonth + `, ` + arriveDay + `), 'Title':"` + name + `", 'Link':'/viewDetails?id=`+ rows[i].id + `'},
                                        `);
                                arriveDay++;
                            }
                        }  
                    } else {
                        while(arriveDay < departsDay) {
                            if(arriveDay == departsDay-1) {
                                res.write(`
                                            {'Date': new Date(` + arrive.getFullYear() + `, ` + arriveMonth + `, ` + arriveDay + `), 'Title':"` + name + `", 'Link':'/viewDetails?id=`+ rows[i].id + `'}
                                        `);
                                arriveDay++;
                            } else {
                                res.write(`
                                            {'Date': new Date(` + arrive.getFullYear() + `, ` + arriveMonth + `, ` + arriveDay + `), 'Title':"` + name + `", 'Link':'/viewDetails?id=`+ rows[i].id + `'},
                                        `);
                                arriveDay++;
                            }
                        }  
                    }
                } else {
                    if(arriveMonth < departsMonth) {
                        while(arriveDay > departsDay && arriveDay < 32) {
                            res.write(`
                                        {'Date': new Date(` + arrive.getFullYear() + `, ` + arriveMonth + `, ` + arriveDay + `), 'Title':"` + name + `", 'Link':'/viewDetails?id=`+ rows[i].id + `'},
                                    `);
                            arriveDay++;
                        }
                        arriveDay=1;
                        arriveMonth++;
                        while(arriveDay < departsDay) {
                            res.write(`
                                        {'Date': new Date(` + arrive.getFullYear() + `, ` + arriveMonth + `, ` + arriveDay + `), 'Title':"` + name + `", 'Link':'/viewDetails?id=`+ rows[i].id + `'},
                                    `);
                            arriveDay++;
                        }  
                    } else {
                        while(arriveDay < departsDay) {
                            res.write(`
                                        {'Date': new Date(` + arrive.getFullYear() + `, ` + arriveMonth + `, ` + arriveDay + `), 'Title':"` + name + `", 'Link':'/viewDetails?id=`+ rows[i].id + `'},
                                    `);
                            arriveDay++;
                        }  
                    }
                }
            }
            res.write(`
                    ];
                    var settings = {};
                    var element = document.getElementById('caleandar');
                    caleandar(element, events, settings);
                            `);
        }
        res.end();
    });
    connection.end();
});


// Check Available Facilities
app.get('/checkavailable', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    res.render("facility-checker.html");
});



app.get('/getavailable', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var type = params.type;
    var arriv = params.arrival;
    var dep = params.departure;

    if (type == "halls") {
        var que = `select * from conference_halls WHERE
                        conference_halls.id not in(SELECT conference_halls.id FROM reservations
                        inner join facilities_used on facilities_used.reservation_id = reservations.id
                        inner join conference_halls on conference_halls.id = facilities_used.fac_id
                        where (
                                ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or /*within*/
                                ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or /*enclosing*/
                                ('` + arriv + `' >= arrival and '` + arriv + `' <= departure) or /*arrival within*/
                                ('` + dep + `' >= arrival and '` + dep + `' <= departure) /*departure within*/
                              )
                        and fac_type = "conference_halls")
                        and status = "available" order by name asc`;
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        var connection = mysql.createConnection({
            host: currentHost,
            user: dbuser,
            password: dbpass,
            database: currentDB,
        });
        connection.connect();
        connection.query(que, function(err, rows, fields) {
            res.write(`<div class="header"><h4 class="title">`+rows.length+` Available Halls (from ` + arriv + ` to ` + dep + `)</h4></div>`);
            res.write(`<div class="content" id="availability"><table class="table table-hover table-striped">
                              <thead>
                                 <tr><th>Name of Hall</th>
                                  <th>In-DepEd</th>
                                  <th>In-NonDeped</th>
                                  <th>Out-DepEd</th>
                                  <th>Out-NonDeped</th>
                                  <th>Capacity</th></tr>
                                  </thead>
                                 <tbody id="">`);

            if (rows.length != 0) {
                for (i = 0; i < rows.length; i++) {
                    res.write(`<tr><td>` + rows[i].name + `</td>
                              <td>` + rows[i].in_deped + `</td>
                              <td>` + rows[i].in_nondeped + `</td>
                              <td>` + rows[i].out_deped + `</td>
                              <td>` + rows[i].out_nondeped + `</td>
                             <td>` + rows[i].capacity + `</td></tr>`);
                }
            } else {
                res.write(` <tr><td>No halls are available.</td></tr>`);
            }
            res.write(`</tbody>
                           </table></div>`);
            res.end();
        });
        connection.end();
    } else if (type == "cottages") {
        var que = `select * from cottages_guesthouses WHERE
                cottages_guesthouses.id not in(SELECT cottages_guesthouses.id FROM reservations
                inner join facilities_used on facilities_used.reservation_id = reservations.id
                inner join cottages_guesthouses on cottages_guesthouses.id = facilities_used.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or 
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or 
                        ('` + arriv + `' >= arrival and '` + arriv + `' <= departure) or 
                        ('` + dep + `' >= arrival and '` + dep + `' <= departure) 
                      )                     
                and fac_type = "cottages_guesthouses")
                and type = "cottage"
                and status = "available"
                order by name asc`;
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        var connection = mysql.createConnection({
            host: currentHost,
            user: dbuser,
            password: dbpass,
            database: currentDB,
        });
        connection.connect();
        connection.query(que, function(err, rows, fields) {
            res.write(`<div class="header"><h4 class="title">`+rows.length+` Available Cottages (from ` + arriv + ` to ` + dep + `)</h4></div>`);
            res.write(`<div class="content" id="availability"><table class="table table-hover table-striped">
                               <thead>
                                <tr><th>Name of Cottage</th>
                                <th>No. of Bedrooms</th>
                                <th>No. of Beds</th>
                                <th>DepEd</th>
                                <th>Government</th>
                                <th>Private</th></tr></thead>
                                 <tbody id="">`);

            if (rows.length != 0) {
                for (i = 0; i < rows.length; i++) {
                    res.write(`<tr><td>Cottage ` + rows[i].name + `</td>
                                <td>` + rows[i].bdrms + `</td>
                                <td>` + rows[i].beds + `</td>
                                <td>` + rows[i].deped + `</td>
                                <td>` + rows[i].govt + `</td>
                                <td>` + rows[i].private+ `</td></tr>`);
                }
            } else {
                res.write(` <tr><td>No cottages are available.</td></tr>`);
            }
            res.write(`</tbody>
                           </table></div>`);
            res.end();
        });
        connection.end();
    } else if (type == "guesthouses") {
        var que = `select * from cottages_guesthouses WHERE
                cottages_guesthouses.id not in(SELECT cottages_guesthouses.id FROM reservations
                inner join facilities_used on facilities_used.reservation_id = reservations.id
                inner join cottages_guesthouses on cottages_guesthouses.id = facilities_used.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or 
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or 
                        ('` + arriv + `' >= arrival and '` + arriv + `' <= departure) or 
                        ('` + dep + `' >= arrival and '` + dep + `' <= departure) 
                      )                     
                and fac_type = "cottages_guesthouses")
                and type = "guesthouse"
                and status = "available"
                order by name asc`;
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        var connection = mysql.createConnection({
            host: currentHost,
            user: dbuser,
            password: dbpass,
            database: currentDB,
        });
        connection.connect();
        connection.query(que, function(err, rows, fields) {
            res.write(`<div class="header"><h4 class="title">`+rows.length+` Available GuestHouses (from ` + arriv + ` to ` + dep + `)</h4></div>`);
            res.write(`<div class="content" id="availability"><table class="table table-hover table-striped">
                              <thead>
                                 <tr><th>Name of GuestHouse</th>
                                <th>No. of Bedrooms</th>
                                <th>No. of Beds</th>
                                <th>DepEd</th>
                                <th>Government</th>
                                <th>Private</th></tr></thead>
                                 <tbody id="">`);

            if (rows.length != 0) {
                for (i = 0; i < rows.length; i++) {
                    res.write(` <tr><td>GuestHouse ` + rows[i].name + `</td>
                                <td>` + rows[i].bdrms + `</td>
                                <td>` + rows[i].beds + `</td>
                                <td>` + rows[i].deped + `</td>
                                <td>` + rows[i].govt + `</td>
                                <td>` + rows[i].private+ `</td></tr>`);
                }
            } else {
                res.write(` <tr><td>No guesthouses are available.</td></tr>`);
            }
            res.write(`</tbody>
                           </table></div>`);
            res.end();
        });
        connection.end();
    } else if (type == "dormitories") {
        var que = `select * from dormitories WHERE
                dormitories.id not in(SELECT dormitories.id FROM reservations
                inner join facilities_used on facilities_used.reservation_id = reservations.id
                inner join dormitories on dormitories.id = facilities_used.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or 
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or 
                        ('` + arriv + `' >= arrival and '` + arriv + `' <= departure) or 
                        ('` + dep + `' >= arrival and '` + dep + `' <= departure) 
                      )                     
                and fac_type = "dormitories")
                and status = "available"
                order by name asc`;
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        var connection = mysql.createConnection({
            host: currentHost,
            user: dbuser,
            password: dbpass,
            database: currentDB,
        });
        connection.connect();
        connection.query(que, function(err, rows, fields) {
            res.write(`<div class="header"><h4 class="title">`+rows.length+` Available Dormitories (from ` + arriv + ` to ` + dep + `)</h4></div>`);
            res.write(`<div class="content" id="availability"><table class="table table-hover table-striped">
                              <thead>
                                 <tr><th>Name of Dormitory</th>
                                <th>DepEd</th>
                                <th>Government</th>
                                <th>Private</th>
                                <th>Capacity</th></tr></thead>
                                 <tbody id="">`);

            if (rows.length != 0) {
                for (i = 0; i < rows.length; i++) {
                    res.write(` <tr><td>` + rows[i].name + `</td>
                                <td>` + rows[i].deped + `</td>
                                <td>` + rows[i].govt + `</td>
                                <td>` + rows[i].private + `</td>
                                <td>` + rows[i].capacity + `</td></tr>`);
                }
            } else {
                res.write(` <tr><td>No dormitories are available.</td></tr>`);
            }
            res.write(`</tbody>
                           </table></div>`);
            res.end();
        });
        connection.end();
    } else if (type == "dinings") {
        var que = `select * from dining_kitchen WHERE
                dining_kitchen.id not in(SELECT dining_kitchen.id FROM reservations
                inner join facilities_used on facilities_used.reservation_id = reservations.id
                inner join dining_kitchen on dining_kitchen.id = facilities_used.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or 
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or 
                        ('` + arriv + `' >= arrival and '` + arriv + `' <= departure) or 
                        ('` + dep + `' >= arrival and '` + dep + `' <= departure) 
                      )                     
                and fac_type = "dining_kitchen")
                and status = "available"
                order by name asc`;
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        var connection = mysql.createConnection({
            host: currentHost,
            user: dbuser,
            password: dbpass,
            database: currentDB,
        });
        connection.connect();
        connection.query(que, function(err, rows, fields) {
            res.write(`<div class="header"><h4 class="title">`+rows.length+` Available Dining Areas/Kitchen (from ` + arriv + ` to ` + dep + `)</h4></div>`);
            res.write(`<div class="content" id="availability"><table class="table table-hover table-striped">
                              <thead>
                                 <tr><th>Name</th>
                                <th>Live-In</th>
                                <th>Live-Out</th>
                                <th>Capacity</th></tr></thead>
                                 <tbody id="">`);

            if (rows.length != 0) {
                for (i = 0; i < rows.length; i++) {
                    res.write(` <tr><td>` + rows[i].name + `</td>
                                <td>` + rows[i].in + `</td>
                                <td>` + rows[i].out + `</td>
                                <td>` + rows[i].capacity + `</td></tr>`);
                }
            } else {
                res.write(` <tr><td>No dining area/kitchen are available.</td></tr>`);
            }
            res.write(`</tbody>
                           </table></div>`);
            res.end();
        });
        connection.end();
    } else if (type == "others") {
        var que = `select * from other_services WHERE
                other_services.id not in(SELECT other_services.id FROM reservations
                inner join facilities_used on facilities_used.reservation_id = reservations.id
                inner join other_services on other_services.id = facilities_used.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or 
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or 
                        ('` + arriv + `' >= arrival and '` + arriv + `' <= departure) or 
                        ('` + dep + `' >= arrival and '` + dep + `' <= departure) 
                      )                     
                and fac_type = "other_services"
                )
                and status = "available"
                and reservable = "yes"
                order by name asc`;
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        var connection = mysql.createConnection({
            host: currentHost,
            user: dbuser,
            password: dbpass,
            database: currentDB,
        });
        connection.connect();
        connection.query(que, function(err, rows, fields) {
            res.write(`<div class="header"><h4 class="title">`+rows.length+` Available Rentables (from ` + arriv + ` to ` + dep + `)</h4></div>`);
            res.write(`<div class="content" id="availability"><table class="table table-hover table-striped">
                              <thead>
                                 <tr><th>Name</th>
                                <th>Charge per</th>
                                <th>Price</th></tr></thead>
                                 <tbody id="">`);

            if (rows.length != 0) {
                for (i = 0; i < rows.length; i++) {
                    res.write(` <tr><td>` + rows[i].name + `</td>
                                <td>` + rows[i].charging_type + `</td>
                                <td>` + rows[i].price + `</td></tr>`);
                }
            } else {
                res.write(` <tr><td>No facilities and/or services are currently available..</td></tr>`);
            }
            res.write(`</tbody>
                           </table></div>`);
            res.end();
        });
        connection.end();
    } else if (type == undefined || arriv == undefined || dep == undefined) {
        res.redirect("/pages?id=4");
        return false;
    }

});


// New Reservation
app.get('/newreservation', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
    } else if(sess.rank != "registration staff"){
        res.render("new-reservation.html");
    } else {
        res.redirect("/pages?id=17");
    }
});

app.get('/savereservation', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var details = params.details;

    if(details == undefined || details == "") {
        res.redirect("/pages?dep=4");
        return false;
    }

    details = JSON.parse(details);
    

    var post = {
        "name" : details.name,
        "affiliation" : details.affi,
        "contact_person" : details.cp,
        "address" : details.address,
        "contact_no1" : details.c1,
        "contact_no2" : details.c2,
        "email" : details.email,
        "category" : details.gtype,
        "no_persons" : details.no,
        "adults" : details.adults,
        "seniors_pwd" : details.seniors,
        "children" : details.children,
        "activity" : details.act,
        "lodging" : details.lodging,
        "arrival" : details.arriv,
        "departure" : details.dep,
        "remarks" : details.remarks,
        "encoder": sess.userFullName,
    }; 
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`INSERT INTO reservations SET ?`, post, function(err, result) {
            if(err) {
                console.log(err);
            }
            var halls = details.facs.halls;
            var cots = details.facs.cottages;
            var ghouses = details.facs.guesthouses;
            var dorms = details.facs.dormitories;
            var dinings = details.facs.dining_kitchen;
            var rents = details.facs.rentables;

            var reservation_id = result.insertId;

            if(halls.length != 0) {
                for(i = 0; i < halls.length; i++) {
                    var newData = {reservation_id: result.insertId, fac_id: halls[i], fac_type:"conference_halls"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }


            if(cots.length != 0) {
                for(i = 0; i < cots.length; i++) {
                    var newData = {reservation_id: reservation_id, fac_id: cots[i], fac_type:"cottages_guesthouses"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }

            if(ghouses.length != 0) {
                for(i = 0; i < ghouses.length; i++) {
                    var newData = {reservation_id: reservation_id, fac_id: ghouses[i], fac_type:"cottages_guesthouses"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }

            if(dorms.length != 0) {
                for(i = 0; i < dorms.length; i++) {
                    var newData = {reservation_id: reservation_id, fac_id: dorms[i], fac_type:"dormitories"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }

            if(dinings.length != 0) {
                for(i = 0; i < dinings.length; i++) {
                    var newData = {reservation_id: reservation_id, fac_id: dinings[i], fac_type:"dining_kitchen"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }

            if(rents.length != 0) {
                for(i = 0; i < rents.length; i++) {
                    var newData = {reservation_id: reservation_id, fac_id: rents[i], fac_type:"other_services"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }

        res.write("");
        res.end("done");
    });
    connection.end();
});

app.get('/reservehall', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var arriv = params.arrival;
    var dep = params.departure;

    if(arriv == undefined || arriv == "" || dep == undefined || dep == "") {
        res.redirect("/pages?dep=4");
        return false;
    }

    var que = `select conference_halls.id, conference_halls.name from conference_halls WHERE
                conference_halls.id not in(
                SELECT conference_halls.id FROM reservations
                inner join facilities_used on facilities_used.reservation_id = reservations.id
                inner join conference_halls on conference_halls.id = facilities_used.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or /*within*/
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or /*enclosing*/
                        ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or /*arrival within*/
                        ('` + dep + `' > arrival and '` + dep + `' <= departure) /*departure within*/
                      )
                and fac_type = "conference_halls" and reservations.status != "cancelled"
                
                union

                SELECT conference_halls.id from registrations
                inner join registered_facilities on registered_facilities.registration_id = registrations.id
                inner join conference_halls on conference_halls.id = registered_facilities.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or /*within*/
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or /*enclosing*/
                        ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or /*arrival within*/
                        ('` + dep + `' > arrival and '` + dep + `' <= departure) /*departure within*/
                      )
                and fac_type = "conference_halls" and registrations.status = "checked-in"

                )
                and status = "available"
                order by id asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if (rows.length != 0 || !err) {

            //res.write("<div class='alert alert-info'>" + rows.length +  " Facilities Available.</div>"); //
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;"> 
                       <select class="form-control" id="hall" onchange="HallList.showDetails();">`);
            res.write(`<option value="def">` + rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">` + rows[i].name + `</option>`);
            }
            res.write(`  </select>            
                <span class="input-group-btn">
                    <button title="Add Facility" onclick="HallList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>`);


        } else {
            res.write(`No Facilities Available.`);
        }
        res.end();
    });
    connection.end();
});

app.get('/reservecottage', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var arriv = params.arrival;
    var dep = params.departure;
    var vip = params.vip;
    var concat = "";
    if(vip == "true") {
        concat = `or type = "vip"`;
    }

    if(arriv == undefined || arriv == "" || dep == undefined || dep == "") {
        res.redirect("/pages?dep=4");
        return false;
    }

    var que = `select cottages_guesthouses.id, cottages_guesthouses.name from cottages_guesthouses WHERE
                cottages_guesthouses.id not in(
                SELECT cottages_guesthouses.id FROM reservations
                inner join facilities_used on facilities_used.reservation_id = reservations.id
                inner join cottages_guesthouses on cottages_guesthouses.id = facilities_used.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or 
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or 
                        ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or 
                        ('` + dep + `' > arrival and '` + dep + `' <= departure) 
                      )                     
                and fac_type = "cottages_guesthouses" and reservations.status != "cancelled"
                
                union

                SELECT cottages_guesthouses.id from registrations
                inner join registered_facilities on registered_facilities.registration_id = registrations.id
                inner join cottages_guesthouses on cottages_guesthouses.id = registered_facilities.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or /*within*/
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or /*enclosing*/
                        ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or /*arrival within*/
                        ('` + dep + `' > arrival and '` + dep + `' <= departure) /*departure within*/
                      )
                and fac_type = "cottages_guesthouses" and registrations.status = "checked-in"
                )
                and type = "cottage" ` + concat + `
                and status = "available"
                order by name asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if (rows.length != 0) {
            //res.write("<div class='alert alert-info'>" + rows.length + " Facilities Available</div>");
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                       <select id="cottage" class="form-control" onchange="CottageList.showDetails()">`);
            res.write(`<option value="def">` + rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">Cottage ` + rows[i].name + `</option>`);
            }
            res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="CottageList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>`);

        } else {
            res.write(`No Facilities Available.`);
        }
        res.end();
    });
    connection.end();
});


app.get('/reserveguesthouse', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var arriv = params.arrival;
    var dep = params.departure;

    if(arriv == undefined || arriv == "" || dep == undefined || dep == "") {
        res.redirect("/pages?dep=4");
        return false;
    }

    var que = `select cottages_guesthouses.id, cottages_guesthouses.name from cottages_guesthouses WHERE
                cottages_guesthouses.id not in(SELECT cottages_guesthouses.id FROM reservations
                inner join facilities_used on facilities_used.reservation_id = reservations.id
                inner join cottages_guesthouses on cottages_guesthouses.id = facilities_used.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or 
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or 
                        ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or 
                        ('` + dep + `' > arrival and '` + dep + `' <= departure) 
                      )                     
                and fac_type = "cottages_guesthouses" and reservations.status != "cancelled"                
                
                union

                SELECT cottages_guesthouses.id from registrations
                inner join registered_facilities on registered_facilities.registration_id = registrations.id
                inner join cottages_guesthouses on cottages_guesthouses.id = registered_facilities.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or /*within*/
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or /*enclosing*/
                        ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or /*arrival within*/
                        ('` + dep + `' > arrival and '` + dep + `' <= departure) /*departure within*/
                      )
                and fac_type = "cottages_guesthouses" and registrations.status = "checked-in"
                )
                and type = "guesthouse" or type = "textbookhouse"
                and status = "available"
                order by name asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if (rows.length != 0) {
            //res.write("<div class='alert alert-info'>" + rows.length + " Facilities Available.</div>");
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                       <select id="guesthouse" class="form-control" onchange="GuestHouseList.showDetails()">`);
            res.write(`<option value="def">` + rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">Guesthouse ` + rows[i].name + `</option>`);
            }
            res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="GuestHouseList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>`);

        } else {
            res.write(`No Facilities Available.`);
        }
        res.end();
    });
    connection.end();
});


app.get('/reservedormroom', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var arriv = params.arrival;
    var dep = params.departure;

    if(arriv == undefined || arriv == "" || dep == undefined || dep == "") {
        res.redirect("/pages?dep=4");
        return false;
    }

    var que = ` select dorm_rooms.dorm_id, dormitories.name, dorm_rooms.room_no from dorm_rooms
                inner join dormitories on dormitories.id = dorm_rooms.dorm_id
                where dorm_rooms.dorm_id in
                (
                select dormitories.id from dormitories WHERE
                dormitories.id not in(
                    SELECT dormitories.id FROM reservations
                    inner join facilities_used on facilities_used.reservation_id = reservations.id
                    inner join dormitories on dormitories.id = facilities_used.fac_id
                    where (
                            ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or 
                            ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or 
                            ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or 
                            ('` + dep + `' > arrival and '` + dep + `' <= departure) 
                          )                     
                    and fac_type = "dormitories" and reservations.status != "cancelled"

                    union

                    SELECT dormitories.id from registrations
                    inner join registered_facilities on registered_facilities.registration_id = registrations.id
                    inner join dormitories on dormitories.id = registered_facilities.fac_id
                    where (
                            ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or /*within*/
                            ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or /*enclosing*/
                            ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or /*arrival within*/
                            ('` + dep + `' > arrival and '` + dep + `' <= departure) /*departure within*/
                          )
                    and fac_type = "dormitories" and registrations.status = "checked-in"

                    ) and status = "available"
                )
                order by dorm_rooms.id asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {

        if (rows.length != 0) {

            //res.write(rows.length + " dormitories are available during the schedule you provided.");
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                           <select class="form-control" id="dormitory"  onchange="DormitoryList.showDetails()">`);
            res.write(`<option value="def">` + rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].dorm_id + `">` + rows[i].name + ` ` + rows[i].room_no +  ` </option>`);
            }
             res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="DormitoryList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                       </button>
                  </span>
          </div>`);
            
        } else {
            res.write(`No Facilities Available.`);
        }
        res.end();
    });
    connection.end();
});

app.get('/reservedormitory', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var arriv = params.arrival;
    var dep = params.departure;

    if(arriv == undefined || arriv == "" || dep == undefined || dep == "") {
        res.redirect("/pages?dep=4");
        return false;
    }

    var que = `select dormitories.id, dormitories.name from dormitories WHERE
                dormitories.id not in (
                SELECT dormitories.id from registrations
                inner join registered_facilities on registered_facilities.registration_id = registrations.id
                inner join dormitories on dormitories.id = registered_facilities.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or /*within*/
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or /*enclosing*/
                        ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or /*arrival within*/
                        ('` + dep + `' > arrival and '` + dep + `' <= departure) /*departure within*/
                      )
                and fac_type = "dormitories" and registrations.status = "checked-in"
                )
                and status = "available"
                order by name asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {

        if (rows.length != 0) {


            res.write(`<br><div class="alert alert-danger">Note: Dormitories that are reserved by others still appear here.</div>`);
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                           <select class="form-control" id="dormitory"  onchange="DormitoryList.showDetails()">`);
            res.write(`<option value="def">` + rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">` + rows[i].name + `</option>`);
            }
             res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="DormitoryList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                       </button>
                  </span>
          </div>`);
            
        } else {
            res.write(`No Facilities Available.`);
        }
        res.end();
    });
    connection.end();
});

app.get('/reservedining', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var arriv = params.arrival;
    var dep = params.departure;

    if(arriv == undefined || arriv == "" || dep == undefined || dep == "") {
        res.redirect("/pages?dep=4");
        return false;
    }

    var que = `select dining_kitchen.id, dining_kitchen.name from dining_kitchen WHERE
                dining_kitchen.id not in(
                SELECT dining_kitchen.id FROM reservations
                inner join facilities_used on facilities_used.reservation_id = reservations.id
                inner join dining_kitchen on dining_kitchen.id = facilities_used.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or 
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or 
                        ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or 
                        ('` + dep + `' > arrival and '` + dep + `' <= departure) 
                      )                     
                and fac_type = "dining_kitchen" and reservations.status != "cancelled"

                union

                SELECT dining_kitchen.id from registrations
                inner join registered_facilities on registered_facilities.registration_id = registrations.id
                inner join dining_kitchen on dining_kitchen.id = registered_facilities.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or /*within*/
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or /*enclosing*/
                        ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or /*arrival within*/
                        ('` + dep + `' > arrival and '` + dep + `' <= departure) /*departure within*/
                      )
                and fac_type = "dining_kitchen" and registrations.status = "checked-in"
                )

                and status = "available"
                order by name asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if (rows.length != 0) {
            //res.write("<div class='alert alert-info'>" + rows.length + " Facilities Available</div>");
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                       <select id="dining_kitchen" class="form-control" onchange="DiningsList.showDetails()">`);
            res.write(`<option value="def">` + rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">` + rows[i].name + `</option>`);
            }
            res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="DiningsList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>`);

        } else {
            res.write(`No Facilities Available.`);
        }
        res.end();
    });
    connection.end();
});

app.get('/reserverentables', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var arriv = params.arrival;
    var dep = params.departure;

    if(arriv == undefined || arriv == "" || dep == undefined || dep == "") {
        res.redirect("/pages?dep=4");
        return false;
    }

    var que = `select other_services.id, other_services.name from other_services WHERE
                other_services.id not in(
                SELECT other_services.id FROM reservations
                inner join facilities_used on facilities_used.reservation_id = reservations.id
                inner join other_services on other_services.id = facilities_used.fac_id
                where (
                        ('` + arriv + `' >= arrival and '` + dep + `' <= departure) or 
                        ('` + arriv + `' <= arrival and '` + dep + `' >= departure) or 
                        ('` + arriv + `' >= arrival and '` + arriv + `' < departure) or 
                        ('` + dep + `' > arrival and '` + dep + `' <= departure) 
                      )                     
                      and fac_type = "other_services" and reservations.status != "cancelled"
                )
                and status = "available"
                and reservable = "yes"
                order by name asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if (rows.length != 0) {
            //res.write("<div class='alert alert-info'>);
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                       <select id="rentable" class="form-control" onchange="RentableList.showDetails()">`);
            res.write(`<option value="def">` + rows.length + ` Facilities Available</div></option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">` + rows[i].name + `</option>`);
            }
            res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="RentableList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>`);

        } else {
            res.write(`No Facilities Available.`);
        }
        res.end();
    });
    connection.end();
});

app.get('/allreserves', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var arriv = params.arrival;
    var dep = params.departure;
    var total = params.total;
    var gtype = params.gtype;
    var affi = params.affiliation;
    var lodging = params.lodging;
    var action = params.action;
    var src = params.src;


    if (arriv == undefined || dep == undefined) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write("<h5>Please provide an arrival and departure date.</h5>");
        res.end();
    }

    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.write(`
        <script src="facility_reservation.js"></script>
    `);
    res.write(`
        <script type="text/javascript">
            var _arrival = "` + arriv + `";
            var _departure = "` + dep + `";
            var _total = "` + total + `";
            var _gtype = " ` + gtype + `";
            var _affiliation = "` + affi + `";
            var _lodging = "` + lodging + `";
            var _src = "` + src + `";

            function resetDetails() {
                $("#facilities_details").html("");  
            }
        </script>
        <br>                    
         <div class="alert alert-info">
            	Note: Facilities that appear here are the only ones that are available during the provided period of time.
         </div>

        
        <div class="content" id="fac_content">

        <ul class="nav nav-tabs">
          <li class="active"><a onclick="resetDetails()" data-toggle="tab" href="#tab1">Conference Halls</a></li>
          <li><a onclick="resetDetails()" data-toggle="tab" href="#tab2">Cottages</a></li>
          <li><a onclick="resetDetails()" data-toggle="tab" href="#tab3">GuestHouses</a></li>
          <li><a onclick="resetDetails()" data-toggle="tab" href="#tab4">Dormitories</a></li>
          <li><a onclick="resetDetails()" data-toggle="tab" href="#tab5">Dining Area and Kitchen</a></li>
          <li><a onclick="resetDetails()" data-toggle="tab" href="#tab6">Rentables</a></li>
        </ul>
        <div class="tab-content">
          <div id="tab1" class="tab-pane fade in active">
                <div id="halls_wrap"> </div>
          </div>
          <div id="tab2" class="tab-pane fade">
                <div id="cottages_wrap"> </div>
          </div>
          <div id="tab3" class="tab-pane fade">
                 <div id="guesthouses_wrap"></div>
          </div>
          <div id="tab4" class="tab-pane fade">
                <div id="dormitories_wrap"> </div>
          </div>
          <div id="tab5" class="tab-pane fade">
                <div id="dinings_wrap"> </div>
          </div>
          <div id="tab6" class="tab-pane fade">
                <div id="rentables_wrap"> </div>
          </div>
        </div>

        <div id="facilities_details">

        </div>


        <h4>Chosen Facilities</h4>
        <table id="facilities_wrap" class="table table-hover table-striped table-bordered">
        <thead>
            <tr>
                <th width="30%">Type</th>
                <th width="55%">Name</th>
                <th width="15%" style="text-align: center">Remove</th>
            </tr>            
            <tr id="facempty">
            	<td colspan="3" style="text-align: center;">No Facilities Chosen.</td>
            </tr>
        </thead>
        <tbody id="facilities_table">

        </tbody>
        </table> <hr/>`);


                    if(action == undefined) {
                        res.write(`<div class="row">
                              <div class="col-md-2">
                                    <a class="btn btn-info btn-fill pull-left" onclick="goBack();">Back</a>
                                 </div>
                                 <div class="col-md-8">
                                    
                                 </div>
                                 <div class="col-md-2">
                                    <a class="btn btn-info btn-fill pull-right" onclick="showSummary();">Next</a>
                                 </div>
                              </div>`);
                    } else {
                        res.write(`<div class="row">
                              <div class="col-md-2">
                                    <a class="btn btn-danger btn-fill pull-left" onclick="cancelAdding();">Cancel</a>
                                 </div>
                                 <div class="col-md-8">
                                    
                                 </div>
                                 <div class="col-md-2">
                                    <a class="btn btn-info btn-fill pull-right" onclick="saveAdded();">Save</a>
                                 </div>
                              </div>`);
                    }
                            

        res.write(`</div>

        <script type="text/javascript">
        $(document).ready(function() {

            $.get("/reservehall?arrival="+_arrival+"&departure="+_departure+"&lodging="+_lodging+"&affiliation="+_affiliation,{},function(data){
              if(data)  { $("#halls_wrap").html(data); }
            });

            if(_lodging == "in") {
                var concat = "";
                if(_affiliation == "vip") {
                    concat = "&vip=true";
                }
                $.get("/reservecottage?arrival="+_arrival+"&departure="+_departure+""+concat,{},function(data){
                  if(data)  { $("#cottages_wrap").html(data); }
                });
            } else {
                  $("#cottages_wrap").html("<br> <div class='alert alert-danger'>Cottages are only available for Live-ins.</div>");
            }

            if(_lodging == "in") {
                $.get("/reserveguesthouse?arrival="+_arrival+"&departure="+_departure,{},function(data){
                  if(data)  { $("#guesthouses_wrap").html(data); }
                });
            } else {
                  $("#guesthouses_wrap").html("<br> <div class='alert alert-danger'>GuestHouses are only available for Live-ins.</div>");
            }

            if(_lodging == "in") {
                $.get("/reservedormitory?arrival="+_arrival+"&departure="+_departure+"&src="+_src,{},function(data){
                  if(data)  { $("#dormitories_wrap").html(data); }
                });
            } else {
                  $("#dormitories_wrap").html("<br> <div class='alert alert-danger'>Dormitories are only available for Live-ins.</div>");
            }

            $.get("/reservedining?arrival="+_arrival+"&departure="+_departure,{},function(data){
              if(data)  { $("#dinings_wrap").html(data); }
            });

            $.get("/reserverentables?arrival="+_arrival+"&departure="+_departure,{},function(data){
              if(data)  { $("#rentables_wrap").html(data); }
            });

        });
        </script>
    `);
    res.end();
});

app.get('/fac_details', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var type = params.type;
    var id = params.id;
    var affi = params.affiliation;
    var lodging = params.lodging;

    if  (id == undefined || id == "" || 
        type == undefined || type == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    console.log(type +  " "  + id +  " "  +affi +  " "  +lodging);

    var que = "";
    if(type == "hall") {
        if(lodging == "in" && affi == "deped") {
            que = `Select concat("Capacity: ", capacity) as details, in_deped as price from conference_halls where id = ` + id;
        } else if(lodging == "in" && affi != "deped") {
            que = `Select concat("Capacity: ", capacity) as details, in_nondeped as price from conference_halls where id = ` + id;
        } else if(lodging == "out" && affi == "deped") {
            que = `Select concat("Capacity: ", capacity) as details, out_deped as price from conference_halls where id = ` + id;
        } else if(lodging == "out" && affi != "deped") {
            que = `Select concat("Capacity: ", capacity) as details, out_nondeped as price from conference_halls where id = ` + id;
        }
    } else if(type == "cottage") {
        if(affi == "deped" || affi == "vip") {
            que = `Select concat(bdrms, " Rooms and ", beds, " Beds") as details, deped as price from cottages_guesthouses where id = ` + id;
        } else if(affi == "govt") {
            que = `Select concat(bdrms, " Rooms and ", beds, " Beds") as details, govt as price from cottages_guesthouses where id = ` + id;
        } else if(affi == "private") {
            que = `Select concat(bdrms, " Rooms and ", beds, " Beds") as details, private as price from cottages_guesthouses where id = ` + id;
        }
    } else if(type == "guesthouse") {
        if(affi == "deped" || affi == "vip") {
            que = `Select concat(bdrms, " Rooms and ", beds, " Beds") as details, deped as price from cottages_guesthouses where id = ` + id;
        } else if(affi == "govt") {
            que = `Select concat(bdrms, " Rooms and ", beds, " Beds") as details, govt as price from cottages_guesthouses where id = ` + id;
        } else if(affi == "private") {
            que = `Select concat(bdrms, " Rooms and ", beds, " Beds") as details, private as price from cottages_guesthouses where id = ` + id;
        }
    } else if(type == "dormitory") {
        if(affi == "deped" || affi == "vip") {
            que = `Select concat("Capacity: ", capacity) as details, deped as price from dormitories where id = ` + id;
        } else if(affi == "govt") {
            que = `Select concat("Capacity: ", capacity) as details, govt as price from dormitories where id = ` + id;
        } else if(affi == "private") {
            que = `Select concat("Capacity: ", capacity) as details, private as price from dormitories where id = ` + id;
        }
    } else if(type == "dorm_room") {
        if(affi == "deped" || affi == "vip") {
            que = `Select 
                    concat("Capacity: ", dorm_rooms.room_capacity) as details, 
                    dormitories.deped as price from dorm_rooms
                    inner join dormitories on dormitories.id = dorm_rooms.dorm_id
                    where dorm_rooms.id = ` + id;
        } else if(affi == "govt") {
            que = `Select 
                    concat("Capacity: ", dorm_rooms.room_capacity) as details, 
                    dormitories.govt as price from dorm_rooms
                    inner join dormitories on dormitories.id = dorm_rooms.dorm_id
                    where dorm_rooms.id = ` + id;
        } else if(affi == "private") {
            que = `Select 
                    concat("Capacity: ", dorm_rooms.room_capacity) as details, 
                    dormitories.private as price from dorm_rooms
                    inner join dormitories on dormitories.id = dorm_rooms.dorm_id
                    where dorm_rooms.id = ` + id;
        }
    } else if(type == "dinings") {
        if(lodging == "in") {
            que = `Select concat("Capacity: ", capacity) as details, dining_kitchen.in as price from dining_kitchen where id = ` + id;
        } else if(lodging == "out") {
            que = `Select concat("Capacity: ", capacity) as details, dining_kitchen.out as price from dining_kitchen where id = ` + id;
        }
    } else if(type == "other") {
        que = `Select concat("Charging Type: ", " Per-", charging_type) as details, price from other_services where id = ` + id;
    }

    connection.connect();
    connection.query(que, function(err, rows, fields) {
        res.write(`
        	<br>
            <div class="input-group col-md-8" style="margin: 0 auto;">
            <table class="table table-hover table-striped table-bordered">
            <thead>
            <tr>
                <th width="30%">Price</th>
                <th width="70%">Details</th>
            </tr>
            </thead>`);
        res.write(`
                        <tbody>
                        <tr>
                        <td>`+rows[0].price+`</td>
                        <td>`+rows[0].details+`</td>
                        </tr>
                        </tbody></table></div>`);
        res.end();
    });
    connection.end();

});


// View Reservation Details
app.get('/viewdetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    res.render("view-details.html");
});

app.get('/getdetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var type = params.type;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    connection.connect();
    connection.query(`select *, reservations.id as waka from reservations 
        left join facilities_used on facilities_used.reservation_id = reservations.id
        where reservations.id = ` + id, function(err, rows, fields) {
        if(rows.length != 0) {
            var details = {};
                details.id = rows[0].waka;
                details.name = rows[0].name;
                details.affiliation = rows[0].affiliation;//.replace("govt", "Government").replace("deped", "DepEd").replace("private","Private").replace("vip", "VIP");
                details.contact_person = rows[0].contact_person;
                details.address = rows[0].address;
                details.contact_no1 = rows[0].contact_no1;
                details.contact_no2 = rows[0].contact_no2;
                details.email = rows[0].email;
                details.gtype = rows[0].category;
                details.total = rows[0].no_persons;
                details.adults = rows[0].adults;
                details.seniors = rows[0].seniors_pwd;
                details.children = rows[0].children;
                details.activity = rows[0].activity;
                details.lodging = rows[0].lodging;//.replace("in", "Live-In").replace("out", "Live-Out");
                details.arrival = rows[0].arrival;
                details.departure = rows[0].departure;
                details.remarks = rows[0].remarks;
                details.status = rows[0].status;
                details.encoder = rows[0].encoder;
                details.date_created = rows[0].date_created;
                details.confirmation_date = rows[0].confirmation_date;
                details.cancellation_date = rows[0].cancellation_date;
                details.confirmed_by = rows[0].confirmed_by;
                details.cancelled_by = rows[0].cancelled_by;
                details.userrank = sess.rank;
                details.facs = {
                    halls: new Array(),
                    cottages_guesthouses: new Array(),
                    dinings: new Array(),
                    dorms: new Array(),
                    others: new Array(),
                };

                for(i = 0; i < rows.length; i++) {
                    if(rows[i].fac_type == "conference_halls") {
                        details.facs.halls.push(rows[i].fac_id);
                    } else if(rows[i].fac_type == "cottages_guesthouses") {
                        details.facs.cottages_guesthouses.push(rows[i].fac_id);
                    } else if(rows[i].fac_type == "dining_kitchen") {
                        details.facs.dinings.push(rows[i].fac_id);
                    } else if(rows[i].fac_type == "dormitories") {
                        details.facs.dorms.push(rows[i].fac_id);
                    } else if(rows[i].fac_type == "other_services") {
                        details.facs.others.push(rows[i].fac_id);
                    }
                }

                var y = details.id;
                res.write(`var _details = ` + JSON.stringify(details) + `;`);
                if(type == undefined) {
                    res.write(`
                        function getFacs(table, type) {
                                $.get("/getfacdet?id=`+y+`&table="+table+"&type="+type, {}, function(data){
                                  if(data) {
                                     $("#_facs_requested").append(data);
                                  }
                                });
                        }
                        function loadFacs() {
                            var empty = true;

                            if(_details.facs.halls.length > 0) {
                                getFacs("conference_halls", "Conference Hall");
                                empty = false;
                            }
                            if(_details.facs.cottages_guesthouses.length > 0) {
                                getFacs("cottages_guesthouses", "Cottage / GuestHouse");
                                empty = false;
                            }
                            if(_details.facs.dinings.length > 0) {
                                getFacs("dining_kitchen", "Dining Area / Kitchen");
                                empty = false;
                            }
                            if(_details.facs.dorms.length > 0) {
                                getFacs("dormitories", "Dormitory");
                                empty = false;
                            }
                            if(_details.facs.others.length > 0) {
                                getFacs("other_services", "Other");
                                empty = false;
                            }
                            if(empty) {
                                $("#_facs_requested").append("<tr><td colspan='2'>No Facilities Requested.</td></tr>");
                            }
                        }
                        function changeStatus() {
                            var stat = $("#_status_select").val();
                            if(stat == "def") {
                                alert("This is the same as the previous status.");
                            } else if(stat == "confirm") {
                                var q = confirm("CONFIRMATION: Are you sure you want to confirm this reservation?");
                                if(q) {
                                    window.location.href="/updatereservation?type=confirm&id=`+y+`";
                                } else {
                                    return false;
                                }
                            } else if(stat == "cancel") {
                                var q = confirm("CANCELLATION: Are you sure you want to cancel this reservation?");
                                if(q) {
                                    window.location.href="/updatereservation?type=cancel&id=`+y+`";
                                } else {
                                    return false;
                                }
                            }
                        }
                        function slic(text) {
                            return (new String(new Date(text)).slice(3, 15));
                        }
                        function ins(txt, id) {
                            if(txt == "" || txt == null || txt == "0") {
                                txt = "None";
                                $("#_"+id).attr("disabled", true);
                            }
                            $("#_"+id).html(txt);
                        }
                        $(document).ready(function(){
                            $("#_dcreated").html(slic(_details.date_created));
                            $("#_encoder").html(_details.encoder);

                            if(_details.confirmed_by != null) {
                                $("#_dconfirmed").html(slic(_details.confirmation_date));
                                $("#_confirmer").html(_details.confirmed_by);
                            } else {
                                $("#_condata").hide();
                            }

                            if(_details.cancelled_by != null) {
                                $("#_dcancelled").html(slic(_details.cancellation_date));
                                $("#_canceler").html(_details.cancelled_by);
                            } else {
                                $("#_candata").hide();
                            }

                            ins(new String(_details.status).replace("unconfirmed","pencil"), "status");
                            ins(_details.name, "name");
                            ins(_details.affiliation, "affi");
                            ins(_details.contact_person, "cp");
                            ins(_details.address, "address");
                            ins(_details.contact_no1, "c1");
                            ins(_details.contact_no2, "c2");
                            ins(_details.email, "email");
                            ins(_details.gtype, "gtype");
                            ins(_details.adults, "adults");
                            ins(_details.seniors, "seniors");
                            ins(_details.children, "children");
                            ins(_details.total, "total");
                            ins(_details.activity, "act");
                            ins(_details.lodging, "lodging");
                            ins(slic(_details.arrival), "arrival");
                            ins(slic(_details.departure), "dep");
                            ins(_details.remarks, "remarks");

                            if(_details.status == "cancelled" || _details.userrank == "registration staff") {
                                $("#_change_status").hide();
                            } else if(_details.status == "unconfirmed"){
                                $("#_status_select").append("<option value='def'>Pencil</option><option value='confirm'>Confirm</option><option value='cancel'>Cancel</option>");
                            } if(_details.status == "confirmed"){
                                $("#_status_select").append("<option value='def'>Confirmed</option><option value='cancel'>Cancel</option>");
                            }

                            if(_details.status != "cancelled" && _details.userrank != "registration staff") {
                                $("#_edit").html('<a title="Edit Details" href="/editdetails?id='+_id+'"><span class="glyphicon glyphicon-edit pull-right" aria-hidden="true"></span></a>');
                                $("#_add").html('<a title="Add Facilities" onclick="addFaci(this)" href="javascript:;" name="/allreserves?id='+_id+'&arrival='+new String(_details.arrival).slice(0,10)+'&departure='+new String(_details.departure).slice(0,10)+'&total='+_details.total+'&gtype='+_details.gtype+'&affiliation='+_details.affiliation+'&lodging='+_details.lodging+'"><span class="glyphicon glyphicon-plus pull-right" aria-hidden="true"></span>                               </a>');
                            }

                            loadFacs();

                        });
                    `);
                } else {
                    res.write(`
                        $(document).ready(function(){
                            $("#form_name").val(_details.name);
                            $("#form_affiliation").val(_details.affiliation).change();
                            $("#cp").val(_details.contact_person);
                            $("#address").val(_details.address);
                            $("#form_contact1").val(_details.contact_no1);
                            $("#form_contact2").val(_details.contact_no2);
                            $("#email").val(_details.email);
                            $("#form_gtype").val(_details.gtype).change();
                            $("#adults").val(_details.adults);
                            $("#seniors").val(_details.seniors);
                            $("#children").val(_details.children);
                            $("#form_number").val(_details.total);
                            $("#form_activity").val(_details.activity);
                            $("#lodging").val(_details.lodging).change();
                            $("#form_arrival").val(new String(_details.arrival).slice(0, 10));
                            $("#form_departure").val(new String(_details.departure).slice(0, 10));
                            $("#form_remarks").val(_details.remarks);
                        });
                    `);
                }
                res.end();
        }
    });
    connection.end();
});

app.get('/getfacdet', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var table = params.table;
    var type = params.type;

    if(id == undefined || id == "" || table == undefined || table == "" || type == undefined || type == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    var que = `select *,
        ` + table + `.name as truename,
        facilities_used.id as waka, 
        reservations.status as res_status, 
        reservations.id as kappa 
        from facilities_used
        inner join ` + table + ` on ` + table + `.id = facilities_used.fac_id
        inner join reservations on reservations.id = facilities_used.reservation_id
        where facilities_used.reservation_id = `+id+`
        and facilities_used.fac_type = "` + table + `"`;

    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if(rows.length != 0) {
            for(i = 0; i < rows.length; i++) {

                var edit = "";

                if(rows[0].res_status != "cancelled") {
                        edit = `<a title="Delete" onclick="confirmDelete(`+rows[i].waka+`,`+rows[0].kappa+`);" href="#" class="btn btn-danger btn-fill">
                                            <span class="glyphicon glyphicon-trash" aria-hidden="true">
                                            </span></a>`;
                }
                if(sess.rank == "registration staff") {
                        edit = ``;
                }

                res.write(`
                                 <tr>
                                    <td width="40%">` + type + `</td>
                                    <td width="50%">` + rows[i].truename + `</td>
                                    <td width="10%">
                                        ` + edit + `                                        
                                    </td>
                                 </tr>
                `);
            }
            res.end();
        }
    });
    connection.end();
});

app.get('/editdetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    res.render("edit-reservation.html");
});


app.get('/addfacilities', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var resid = params.resid;
    var facs = params.fac;

    if(resid == undefined || resid == "" || facs == undefined || facs == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    facs = JSON.parse(facs);
    

            var halls = facs.halls;
            var cots = facs.cottages;
            var ghouses = facs.guesthouses;
            var dorms = facs.dormitories;
            var dinings = facs.dining_kitchen;
            var rents = facs.rentables;

            if(halls.length != 0) {
                for(i = 0; i < halls.length; i++) {
                    var newData = {reservation_id: resid, fac_id: halls[i], fac_type:"conference_halls"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }

            if(cots.length != 0) {
                for(i = 0; i < cots.length; i++) {
                    var newData = {reservation_id: resid,fac_id: cots[i], fac_type:"cottages_guesthouses"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }

            if(ghouses.length != 0) {
                for(i = 0; i < ghouses.length; i++) {
                    var newData = {reservation_id: resid,fac_id: ghouses[i], fac_type:"cottages_guesthouses"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }

            if(dorms.length != 0) {
                for(i = 0; i < dorms.length; i++) {
                    var newData = {reservation_id: resid,fac_id: dorms[i], fac_type:"dormitories"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }

            if(dinings.length != 0) {
                for(i = 0; i < dinings.length; i++) {
                    var newData = {reservation_id: resid,fac_id: dinings[i], fac_type:"dining_kitchen"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }

            if(rents.length != 0) {
                for(i = 0; i < rents.length; i++) {
                    var newData = {reservation_id: resid,fac_id: rents[i], fac_type:"other_services"};
                    submitToDB(newData, currentDB, "facilities_used");
                }
            }
    res.end("done");
});

app.get('/removefacility', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var resid = params.resid;

    if(id == undefined || id == "" || resid == undefined || resid == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    try {
        queryDB("DELETE from facilities_used where id = " + id);
    } catch(e) {
    }
    res.redirect("/viewdetails?id="+resid);

});

app.get('/updatereservation', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var type = params.type;
    var id = params.id;
    var dets = params.details;


    if(type == undefined || type == "" || id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    if(type == "confirm") {
        queryDB(`update reservations set status = 'confirmed', confirmation_date = NOW(), confirmed_by = '`+sess.userFullName+`' WHERE id = "`+id+`"`);
        res.redirect("/updatedredirector?id="+id);
    } else if(type == "cancel") {
        queryDB(`update reservations set status = 'cancelled', cancellation_date = NOW(), cancelled_by = '`+sess.userFullName+`' WHERE id = "`+id+`"`);
        res.redirect("/updatedredirector?id="+id);
    } else if(type == "edit") {

        if(dets != undefined) {
            dets = JSON.parse(dets);
        } else {
            res.redirect("/pages?id=4");
            return false;
        }

        queryDB(`update reservations set 
            name = "`+dets.name+`",
            contact_person = "`+dets.cp+`",
            affiliation = "`+dets.affi+`",
            address = "`+dets.address+`",
            contact_person = "`+dets.cp+`",
            contact_no1 = "`+dets.c1+`",
            contact_no2 = "`+dets.c2+`",
            email = "`+dets.email+`",
            category = "`+dets.gtype+`",
            adults = "`+dets.adults+`",
            seniors_pwd = "`+dets.seniors+`",
            children = "`+dets.children+`",
            no_persons = "`+dets.no+`",
            activity = "`+dets.act+`",
            remarks = "`+dets.remarks+`"
         WHERE id = "`+id+`"`);
        res.redirect("/updatedredirector?id="+id);
    }
});

app.get('/updatedredirector', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=3");
        return false;
    }

    res.write(`
        <!doctype html>
        <html lang="en">
        <head>
           <meta charset="utf-8" />
           <link rel="icon" type="image/png" href="assets/img/logo.png">
           <title>Baguio Teacher's Camp</title>
           <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
           <meta name="viewport" content="width=device-width" />
           <link href="assets/css/boot/bootstrap.min.css" rel="stylesheet" />
           <link href="assets/css/animate.min.css" rel="stylesheet" />
           <link href="assets/css/light-bootstrap-dashboard.css" rel="stylesheet" />
           <link href='assets/fonts/Roboto.ttf' rel='stylesheet' type='text/css'>
           <link href="assets/css/pe-icon-7-stroke.css" rel="stylesheet" />

        </head>
        <body>
              <br> <br>
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                     <div class="col-md-6">
                     <div class="card card-user">
                        <div class="image">
                           <img src="assets/img/green.png" alt="..." />
                        </div>
                        <div class="content">
                           <div class="author">
                              <a href="#">
                                 <img class="avatar border-gray" src="assets/img/logo1.png" alt="..." />
                                 <h4 class="title">Reservation Updated!<br/>
                                    <small>Changes have been made</small>
                                </h4>
                              </a>

                              <a href="/viewdetails?id=`+id+`">
                                 <h4 class="title"><br/>
                                    <small>Proceed</small>
                                </h4>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
            </div>
        </div>
        </body>
           <script src="assets/js/jquery-1.10.2.js" type="text/javascript"></script>
            <script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
            <script src="assets/js/bootstrap-checkbox-radio-switch.js"></script>
            <script src="assets/js/chartist.min.js"></script>
            <script src="assets/js/bootstrap-notify.js"></script>
            <script src="assets/js/light-bootstrap-dashboard.js"></script>
        </html>
    `)
    res.end();
});

// Reservations
app.get('/reservations', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    } else {
        res.render("list-reservation.html");
    }
});

app.get('/reservationsList', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`select * from reservations order by arrival asc`, function(err, rows, fields) {
        if (rows.length != 0) {
            for (i = 0; i < rows.length; i++) {
                res.write(`
                                    <tr>
                                        <td>` + new String(rows[i].arrival).slice(3, 15) + `</td>
                                        <td>` + new String(rows[i].departure).slice(3, 15) + `</td>
                                        <td>` + rows[i].name + `</td>
                                        <td>` + rows[i].activity + `</td>
                                        <td>` + rows[i].status + `</td>
                                        <td>` + rows[i].contact_no1 + `</td>
                                        <td><a type="submit" class="btn btn-info btn-sm btn-fill pull-left" href="/viewDetails?id=` + rows[i].id + `">View Details</a>
                                       </td>
                                     </tr>
                            `);

            }
        }
        res.end();
    });
    connection.end();
});

// New Reservation
app.get('/newregistration', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    } else if(sess.rank != "reservation staff"){
        res.render("new-guest.html");
    } else {
        res.redirect("/pages?id=17");
    }
});

app.get('/filteredsearch',function(req,res){
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;

    var arriv = params.arrival;
    var dep = params.departure;
    var name = params.name;
    var affi = params.affiliation;
    var status  = params.status;
    var deft = params.default;

    var query = "select * from reservations";
    var where = new Array();
    if(arriv.length > 0) { // theres an arriv
        where.push(`arrival = "`+arriv+`"`);
    }
    if(dep.length > 0) { // theres a dep
        where.push(`departure = "`+dep+`"`);
    }
    if(name.length > 0) { // theres a name
        where.push(`name like "%`+name+`%"`);
    }
    if(affi.length > 0) { // theres an affi
        where.push(`affiliation = "`+affi+`"`);
    }
    if(status.length > 0) { // theres a status
        where.push(`status = "`+status+`"`);
    }
    var conditions = "";
    for(y = 0; y < where.length; y++) {
        if(y == 0) {
            conditions += " where " + where[y];
        } else {
            conditions += " and " + where[y];
        }
    }
    var updatedQuery = query + conditions + " order by arrival asc, departure asc";
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(updatedQuery, function(err, rows, fields) {
        
        var result = "";
        if(rows.length > 1) {
            result = "results";
        } else {
            result = "result";
        }

        if(deft != "true" && result == "results") {
            res.write(`<tr><td colspan="9">`+rows.length+` `+result+` found.</td></tr>`);
        }

        if(where.length > 0) {
            res.write(`<tr><td colspan="9"><b>Filters:</b> `+ conditions
                .replace(/where/g,"")
                .replace(/ and/g,", ")
                .replace(/like/g,":")
                .replace(/%/g,"")
                .replace(/=/g, ":")+`</td></tr>`);
        }
        if (rows.length !=0) {
            for (i=0; i<rows.length; i++){

                res.write(`
                    <tr>
                        <td>` + new String(rows[i].status).replace("unconfirmed","pencil") + `</td>
                        <td>` + new String(rows[i].arrival).slice(3, 15) + `</td>
                        <td>` + new String(rows[i].departure).slice(3,15) + `</td>
                        <td>` + rows[i].name + `</td>
                        <td>` + rows[i].affiliation + `</td>
                        <td>` + rows[i].activity + `</td>
                        <td>` + rows[i].contact_no1 + `</td>
                        <td><a type="submit" class="btn btn-info btn-sm btn-fill pull-left" href="/viewDetails?id=` + rows[i].id +
                         `">View Details</a></td>
                     </tr>
                `);
            }
        } else {
            res.write(`<tr><td colspan="9">No results found.</td></tr>`);
        }
        res.end();
    });
    connection.end();
});

app.get('/filteredsearch_date',function(req,res){
        if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var name = params.name;
    var year = params.year;
    var month = params.month;
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    var query = "select * from reservations";
    var where = new Array();
    if(year.length > 0) { // theres year
        where.push(`year(arrival) = "`+year+`"`);
    }

    if(month.length > 0) { // theres a month
        where.push(`month(arrival) = "`+month+`"`);
    }
    var conditions = "";
    for(y = 0; y < where.length; y++) {
        if(y == 0) {
            conditions += " where " + where[y];
        } else {
            conditions += " and " + where[y];
        }
    }
    var updatedQuery = query + conditions + " order by arrival asc, departure asc";

    var monthN = new Array();
    monthN[0] = "January";
    monthN[1] = "February";
    monthN[2] = "March";
    monthN[3] = "April";
    monthN[4] = "May";
    monthN[5] = "June";
    monthN[6] = "July";
    monthN[7] = "August";
    monthN[8] = "September";
    monthN[9] = "October";
    monthN[10] = "November";
    monthN[11] = "December";

    var monthNa = "";
    if(month.length > 0) {
        monthNa = `"`+monthN[parseInt(month)-1]+`"`;
    }
    

    connection.connect();
    connection.query(updatedQuery, function(err, rows, fields) {
        var result = "";
        if(res.length > 1) {
            result = "results";
        } else {
            result = "result";
        }
        if (rows.length !=0) {
            res.write(`<tr><td colspan="9">`+rows.length+` `+result+` found.</td></tr>`);
            if(where.length > 0) {
                res.write(`<tr><td colspan="9"><b>Filters:</b> `+ conditions.replace(/year\(arrival\)/g,"Year")
                .replace(/ and/g,", ")
                .replace(/ where/g," ")
                .replace(/month\(arrival\)/g,"Month")
                .replace(/=/g, ":")
                .replace("\""+month+"\"", "") +` `+ monthNa +`</td></tr>`);
             }
            for (i=0; i<rows.length; i++){
                res.write(`
                    <tr>
                        <td>` + new String(rows[i].status).replace("unconfirmed","pencil") + `</td>
                        <td>` + new String(rows[i].arrival).slice(3, 15) + `</td>
                        <td>` + new String(rows[i].departure).slice(3,15) + `</td>
                        <td>` + rows[i].name + `</td>
                        <td>` + rows[i].affiliation + `</td>
                        <td>` + rows[i].activity + `</td>
                        <td>` + rows[i].contact_no1 + `</td>
                        <td><a type="submit" class="btn btn-info btn-sm btn-fill pull-left" href="/viewDetails?id=` + rows[i].id +
                         `">View Details</a></td>
                     </tr>
                `);
            }
        } else {
            if(where.length > 0) {
                res.write(`<tr><td colspan="9"><b>Filters:</b> `+ conditions.replace(/year\(arrival\)/g,"Year")
                .replace(/ and/g,", ")
                .replace(/ where/g," ")
                .replace(/month\(arrival\)/g,"Month")
                .replace(/=/g, ":")
                .replace("\""+month+"\"", "") +` `+ monthNa +`</td></tr>`);
            }
            res.write(`<tr><td colspan="9">No results found.</td></tr>`);
        }
        res.end();
    });
    connection.end();
});


// All Facilities

app.get('/tables_facilities', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    } else {
        res.render("list-facilities.html");
    }
});




app.get('/cottageList', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    }); 

    connection.connect();
    connection.query(`select * from cottages_guesthouses where (type="cottage" or type = "vip") order by name asc`, function(err, rows, fields) {
        if (rows.length != 0) {

            var add = ``;

            if(sess.rank == "admin" || sess.rank == "assistant admin") {
                add = `
                <span id="_add">
                <a title="New Cottage" href="/addfacility?type=cottages_guesthouses">
                <span class="glyphicon glyphicon-plus pull-right" aria-hidden="true">
                </span>
                </a>`;
            }


            res.write(`<div class="header">
                              <h4 class="title">Cottages `+add+`</span></h4>
                           </div>
                           <div class="content table-responsive table-full-width">
                              <table class="table table-hover table-striped">
                                 <thead>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Vacant</th>
                                    <th>Deped</th>
                                    <th>Gov't</th>
                                    <th>Private</th>
                                    <th>Bedrooms</th>
                                    <th>Beds</th>
                                 </thead>
                                 <tbody>`);


            for (i = 0; i < rows.length; i++) {

                var functions = `<td width=5%;><a button type="submit" class="btn btn-info btn-fill" href="/editfacilitydetails?id=` + rows[i].id + `&type=cottages_guesthouses"><span class="glyphicon glyphicon-edit pull-right"></span></a>
                                 </td>
                                 <td><a button type="submit" class="btn btn-danger btn-fill" href="/deletefacilitydetails?id=` + rows[i].id + `&type=cottages_guesthouses"><span class="glyphicon glyphicon-trash pull-left" aria-hidden="true"></span></a>
                                 </td>`; 
                if(sess.rank != "admin") {
                    functions = ``;
                } 

                res.write(`
                                    <tr>
                                        <td>` + (i+1) + `. ` + new String(rows[i].type).replace(/cottage/g, "Cottage ") + rows[i].name + `</td>
                                        <td>` + new String(rows[i].status).replace("_", " ") + `</td>
                                        <td>` + rows[i].vacant + `</td>
                                        <td>` + rows[i].deped + `</td>
                                        <td>` + rows[i].govt + `</td>
                                        <td>` + rows[i].private + `</td>
                                        <td>` + rows[i].bdrms + `</td>
                                        <td>` + rows[i].beds + `</td>

                                        `+functions+`

                                     </tr>
                            `);
            }

            res.write(`                                    
                                 </tbody>
                              </table>`);




        }
        res.end();
    });
    connection.end();
});


app.get('/guesthouseList', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`select * from cottages_guesthouses  where (type = "guesthouse" or type = "textbookhouse") order by name asc`, function(err, rows, fields) {
        if (rows.length != 0) {



            var add = ``;

            if(sess.rank == "admin" || sess.rank == "assistant admin") {
                add = `
                <span id="_add">
                <a title="New Guesthouse" href="/addfacility?type=cottages_guesthouses">
                <span class="glyphicon glyphicon-plus pull-right" aria-hidden="true">
                </span>
                </a>`;
            }


            res.write(`<div class="header">
                              <h4 class="title">GuestHouses `+add+`</span></h4>
                           </div>
                           <div class="content table-responsive table-full-width">
                              <table class="table table-hover table-striped">
                                 <thead>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Vacant</th>
                                    <th>Deped</th>
                                    <th>Gov't</th>
                                    <th>Private</th>
                                    <th>Bedrooms</th>
                                    <th>Beds</th>
                                 </thead>
                                 <tbody>`);

            for (i = 0; i < rows.length; i++){
                var name = rows[i].type;
                if(name=="textbookhouse"){
                    name = new String(rows[i].type).replace(/textbookhouse/g, "TextBookHouse ");
                }if(name=="guesthouse"){
                    name = new String(rows[i].type).replace(/guesthouse/g, "GuestHouse ");
                }


                var functions = `<td width=5%;><a button type="submit" class="btn btn-info btn-fill" href="/editfacilitydetails?id=` + rows[i].id + `&type=cottages_guesthouses"><span class="glyphicon glyphicon-edit pull-right"></span></a>
                                 </td>
                                 <td><a button type="submit" class="btn btn-danger btn-fill" href="/deletefacilitydetails?id=` + rows[i].id + `&type=cottages_guesthouses"><span class="glyphicon glyphicon-trash pull-left" aria-hidden="true"></span></a>
                                 </td>`; 
                if(sess.rank != "admin") {
                    functions = ``;
                }

                res.write(`
                                    <tr>
                                        <td>` + (i+1) + `. ` + name + " " + rows[i].name + `</td>
                                        <td>` + new String(rows[i].status).replace("_", " ") + `</td>
                                        <td>` + rows[i].vacant + `</td>
                                        <td>` + rows[i].deped + `</td>
                                        <td>` + rows[i].govt + `</td>
                                        <td>` + rows[i].private + `</td>
                                        <td>` + rows[i].bdrms + `</td>
                                        <td>` + rows[i].beds + `</td>
                                        `+functions+`
                                     </tr>
                            `);
            }
            res.write(`</tbody></table>`);
        }
        res.end();
    });
    connection.end();
});


app.get('/conference-hallList', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`select * from conference_halls order by name asc`, function(err, rows, fields) {
        if (rows.length != 0) {

            var add = ``;

            if(sess.rank == "admin" || sess.rank == "assistant admin") {
                add = `
                <span id="_add">
                <a title="New Conference Hall" href="/addfacility?type=conference_halls">
                <span class="glyphicon glyphicon-plus pull-right" aria-hidden="true">
                </span>
                </a>`;
            }

            res.write(`<div class="header">
                              <h4 class="title">Conference Halls `+add+`</span></h4>
                           </div>
                           <div class="content table-responsive table-full-width">
                              <table class="table table-hover table-striped">
                                 <thead>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Vacant</th>
                                    <th>Deped</th>
                                    <th>Private</th>
                                    <th>Deped (LO)</th>
                                    <th>Private (LI)</th>
                                    <th>Capacity</th>
                                 </thead>
                                 <tbody>`);

            for (i = 0; i < rows.length; i++) {

                var functions = `<td width=5%;><a button type="submit" class="btn btn-info btn-fill" href="/editfacilitydetails?id=` + rows[i].id + `&type=conference_halls"><span class="glyphicon glyphicon-edit pull-right"></span></a>
                                 </td>
                                 <td><a button type="submit" class="btn btn-danger btn-fill" href="/deletefacilitydetails?id=` + rows[i].id + `&type=conference_halls"><span class="glyphicon glyphicon-trash pull-left" aria-hidden="true"></span></a>
                                 </td>`; 

                if(sess.rank != "admin") {
                    functions = ``;
                } 

                res.write(`
                                    <tr>
                                        <td>` + (i+1) + `. ` + rows[i].name + `</td>
                                        <td>` + new String(rows[i].status).replace("_", " ") + `</td>
                                        <td>` + rows[i].vacant + `</td>
                                        <td>` + rows[i].in_deped + `</td>
                                        <td>` + rows[i].in_nondeped + `</td>
                                        <td>` + rows[i].out_deped + `</td>
                                        <td>` + rows[i].out_nondeped + `</td>
                                        <td>` + rows[i].capacity + `</td>
                                        `+functions+`
                                        </tr>
                            `);

            }
            res.write(`</tbody></table>`);
        }
        res.end();
    });
    connection.end();
});


app.get('/dormroomslist', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });

        connection.connect();
        connection.query(`SELECT dorm_rooms.vacant as vac, dorm_rooms.id, dormitories.name, room_no, dorm_rooms.status, room_capacity from dorm_rooms 
                            inner join dormitories on 
                            dormitories.id = dorm_rooms.dorm_id 
                            order by name asc`, function(err, rows, fields) {
            if(rows.length != 0) {

            var add = ``;

            if(sess.rank == "admin" || sess.rank == "assistant admin") {
                add = `
                <span id="_add">
                <a title="New Dormitory Room" href="/addfacility?type=dorm_rooms">
                <span class="glyphicon glyphicon-plus pull-right" aria-hidden="true">
                </span>
                </a>`;
            }

            res.write(`<div class="header">
                              <h4 class="title">Dormitory Rooms `+add+`</span></h4>
                           </div>
                           <div class="content table-responsive table-full-width">
                              <table class="table table-hover table-striped">
                                 <thead>
                                    <th>Dormitory</th>
                                    <th>Status</th>
                                    <th>Vacant</th>
                                    <th>Room No.</th>
                                    <th>Capacity</th>
                                 </thead>
                                 <tbody>`);

                for (i = 0; i < rows.length; i++) {

                var functions = `<td width=5%;><a button type="submit" class="btn btn-info btn-fill" href="/editfacilitydetails?id=` + rows[i].id + `&type=dorm_rooms"><span class="glyphicon glyphicon-edit pull-right"></span></a>
                                 </td>
                                 <td><a button type="submit" class="btn btn-danger btn-fill" href="/deletefacilitydetails?id=` + rows[i].id + `&type=dorm_rooms"><span class="glyphicon glyphicon-trash pull-left" aria-hidden="true"></span></a>
                                 </td>`; 

                if(sess.rank != "admin") {
                    functions = ``;
                } 

                    res.write(`
                                        <tr>
                                            <td>` + (i+1) + `. ` + rows[i].name + `</td>
                                            <td>` + rows[i].status.replace("_", " ") + `</td>
                                        	<td>` + rows[i].vac + `</td>
                                            <td>` + rows[i].room_no + `</td>
                                            <td>` + rows[i].room_capacity + `</td>
                                            ` + functions + `
                                            </tr>
                                `);
                }
                res.write(`</tbody></table>`);
            }
            res.end();
        });
        connection.end();
});

app.get('/dormitoriesList', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });

        connection.connect();
        connection.query(`SELECT * from dormitories order by name asc`, function(err, rows, fields) {
            if(rows.length != 0) {

            var add = ``;

            if(sess.rank == "admin" || sess.rank == "assistant admin") {
                add = `
                <span id="_add">
                <a title="New Dormitory" href="/addfacility?type=dormitories">
                <span class="glyphicon glyphicon-plus pull-right" aria-hidden="true">
                </span>
                </a>`;
            }

            res.write(`<div class="header">
                              <h4 class="title">Dormitories `+add+`</span></h4>
                           </div>
                           <div class="content table-responsive table-full-width">
                              <table class="table table-hover table-striped">
                                 <thead>
                                          <th>Name</th>
                                          <th>Status</th>
                                          <th>Deped</th>
                                          <th>Gov't</th>
                                          <th>Private</th>
                                          <th>Capacity</th>
                                 </thead>
                                 <tbody>`);

                for (i = 0; i < rows.length; i++) {

                    var functions = `<td width=5%;><a button type="submit" class="btn btn-info btn-fill" href="/editfacilitydetails?id=` + rows[i].id + `&type=dormitories"><span class="glyphicon glyphicon-edit pull-right"></span></a>
                                     </td>
                                     <td><a button type="submit" class="btn btn-danger btn-fill" href="/deletefacilitydetails?id=` + rows[i].id + `&type=dormitories"><span class="glyphicon glyphicon-trash pull-left" aria-hidden="true"></span></a>
                                     </td>`; 

                    if(sess.rank != "admin") {
                        functions = ``;
                    } 

                    res.write(`
                                        <tr>
                                            <td>` + (i+1) + `. ` + rows[i].name + `</td>
                                            <td>` + rows[i].status.replace("_", " ") + `</td>
                                            <td>` + rows[i].deped + `</td>
                                            <td>` + rows[i].govt + `</td>
                                            <td>` + rows[i].private + `</td>
                                            <td>` + rows[i].capacity + `</td>
                                            ` + functions + `
                                            </tr>
                                `);
                }
                res.write(`</tbody></table>`);
            }
            res.end();
        });
        connection.end();
});


app.get('/diningList', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`SELECT * FROM dining_kitchen order by name asc`, function(err, rows, fields) {
        if (rows.length != 0) {

            var add = ``;

            if(sess.rank == "admin" || sess.rank == "assistant admin") {
                add = `
                <span id="_add">
                <a title="New Dining Area/Kitchen" href="/addfacility?type=dining_kitchen">
                <span class="glyphicon glyphicon-plus pull-right" aria-hidden="true">
                </span>
                </a>`;
            }

            res.write(`<div class="header">
                              <h4 class="title">Dinnig Areas / Kitchen `+add+`</span></h4>
                           </div>
                           <div class="content table-responsive table-full-width">
                              <table class="table table-hover table-striped">
                                 <thead>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Vacant</th>
                                    <th>Live-in</th>
                                    <th>Live-out</th>
                                    <th>Capacity</th>
                                 </thead>
                                 <tbody>`);

            for (i = 0; i < rows.length; i++) {

                var functions = `<td width=5%;><a button type="submit" class="btn btn-info btn-fill" href="/editfacilitydetails?id=` + rows[i].id + `&type=dining_kitchen"><span class="glyphicon glyphicon-edit pull-right"></span></a>
                                 </td>
                                 <td><a button type="submit" class="btn btn-danger btn-fill" href="/deletefacilitydetails?id=` + rows[i].id + `&type=dining_kitchen"><span class="glyphicon glyphicon-trash pull-left" aria-hidden="true"></span></a>
                                 </td>`; 

                if(sess.rank != "admin") {
                    functions = ``;
                } 

                res.write(`
                                    <tr>
                                        <td>` + (i+1) + `. ` + rows[i].name + `</td>
                                        <td>` + new String(rows[i].status).replace("_", " ") + `</td>
                                        <td>` + rows[i].vacant + `</td>
                                        <td>` + rows[i].in + `</td>
                                        <td>` + rows[i].out + `</td>
                                        <td>` + rows[i].capacity + `</td>
                                        `+functions+` 
                                        </tr>
                            `);

            }
            res.write(`</tbody></table>`);
        }
        res.end();
    });
    connection.end();
});

app.get('/otherServicesList', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`SELECT * FROM other_services order by name asc`, function(err, rows, fields) {
        if (rows.length != 0) {

            var add = ``;

            if(sess.rank == "admin" || sess.rank == "assistant admin") {
                add = `
                <span id="_add">
                <a title="New Extra Service" href="/addfacility?type=other_services">
                <span class="glyphicon glyphicon-plus pull-right" aria-hidden="true">
                </span>
                </a>`;
            }

            res.write(`<div class="header">
                              <h4 class="title">Dormitories `+add+`</span></h4>
                           </div>
                           <div class="content table-responsive table-full-width">
                              <table class="table table-hover table-striped">
                                 <thead>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Price</th>
                                    <th>Charging Type</th>
                                    <th>Reservable</th>
                                 </thead>
                                 <tbody>`);

            for (i = 0; i < rows.length; i++) {

                var functions = `<td width=5%;><a button type="submit" class="btn btn-info btn-fill" href="/editfacilitydetails?id=` + rows[i].id + `&type=other_services"><span class="glyphicon glyphicon-edit pull-right"></span></a>
                                 </td>
                                 <td><a button type="submit" class="btn btn-danger btn-fill" href="/deletefacilitydetails?id=` + rows[i].id + `&type=other_services"><span class="glyphicon glyphicon-trash pull-left" aria-hidden="true"></span></a>
                                 </td>`; 

                if(sess.rank != "admin") {
                    functions = ``;
                } 

                res.write(`
                                    <tr>
                                        <td>` + (i+1) + `. ` + rows[i].name + `</td>
                                        <td>` + new String(rows[i].status).replace("_", " ") + `</td>
                                        <td>` + rows[i].price + `</td>
                                        <td>` + rows[i].charging_type + `</td>
                                        <td>` + rows[i].reservable + `</td>
                                        `+functions+` 
                                        </tr>
                            `);

            }
            res.write(`</tbody></table>`);
        }
        res.end();
    });
    connection.end();
});



// Facility Editing
app.get('/getfacilitydetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var type = params.type;

    if(type == undefined || type == "" || id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    connection.connect();
    connection.query(`select * from `+type+`
        where id = ` + id, function(err, rows, fields) {
        if(rows.length != 0) {
            var details = {};
        if(type == 'dormitories') {
                details.id = rows[0].id;
                details.category = rows[0].category;
                details.name = rows[0].name;
                details.status = rows[0].status;
                details.deped = rows[0].deped;
                details.govt = rows[0].govt;
                details.private = rows[0].private;
                details.capacity = rows[0].capacity;
        } else if(type == 'cottages_guesthouses') {
                details.id = rows[0].id;
                details.type = rows[0].type;
                details.name = rows[0].name;
                details.bdrms = rows[0].bdrms;
                details.beds = rows[0].beds;
                details.status = rows[0].status;
                details.deped = rows[0].deped;
                details.govt = rows[0].govt;
                details.private = rows[0].private;

        } else if(type == 'conference_halls') {
                details.id = rows[0].id;
                details.name = rows[0].name;              
                details.status = rows[0].status;
                details.in_deped = rows[0].in_deped;
                details.in_nondeped = rows[0].in_nondeped;
                details.out_deped = rows[0].out_deped;
                details.out_nondeped = rows[0].out_nondeped;
                details.capacity = rows[0].capacity;
        } else if(type == 'dining_kitchen') {
                details.id = rows[0].id;
                details.name = rows[0].name;              
                details.status = rows[0].status;
                details.in2 = rows[0].in;
                details.out = rows[0].out;
                details.capacity = rows[0].capacity;
        } else if(type == 'other_services') {
                details.id = rows[0].id;
                details.name = rows[0].name;              
                details.status = rows[0].status;
                details.price = rows[0].price;
                details.charging_type = rows[0].charging_type;
                details.reservable = rows[0].reservable;               
        } else if(type == 'dorm_rooms') {
                details.id = rows[0].id;
                details.dorm_id = rows[0].dorm_id;              
                details.room_no = rows[0].room_no;
                details.room_capacity = rows[0].room_capacity;
                details.unit = rows[0].unit;
                details.status = rows[0].status;               
        }
                var y = details.id;
                res.write(`var _details = ` + JSON.stringify(details) + `;`);
                if(type == 'dormitories') {
                    res.write(`$(document).ready(function() {
                     $("#_name").val(_details.name);
                     $("#_status").val(_details.status);
                     $("#_category").val(_details.category);
                     $("#_capacity").val(_details.capacity);
                     $("#_deped").val(_details.deped);
                     $("#_govt").val(_details.govt);
                     $("#_private").val(_details.private);
                    })`);
                } else if(type == 'cottages_guesthouses') {
                    res.write(`$(document).ready(function() {
                     $("#_name").val(_details.name);
                     $("#_type").val(_details.type);
                     $("#_bdrms").val(_details.bdrms);
                     $("#_beds").val(_details.beds);
                     $("#_status").val(_details.status);
                     $("#_deped").val(_details.deped);
                     $("#_govt").val(_details.govt);
                     $("#_private").val(_details.private);
                    })`);
                } else if(type == 'conference_halls') {
                    res.write(`$(document).ready(function() {
                     $("#_name").val(_details.name);
                     $("#_status").val(_details.status);
                     $("#_capacity").val(_details.capacity);
                     $("#_in_deped").val(_details.in_deped);
                     $("#_in_nondeped").val(_details.in_nondeped);
                     $("#_out_deped").val(_details.out_deped);
                     $("#_out_nondeped").val(_details.out_nondeped);
                    })`);
                } else if(type == 'dining_kitchen') {
                    res.write(`$(document).ready(function() {
                     $("#_name").val(_details.name);
                     $("#_status").val(_details.status);
                     $("#_capacity").val(_details.capacity);
                     $("#_in2").val(_details.in2);
                     $("#_out").val(_details.out);                                         
                    })`);
                } else if(type == 'dorm_rooms') {
                    res.write(`$(document).ready(function() {
                     $("#dorm_name").val(_details.dorm_id);
                     $("#_room_no").val(_details.room_no);
                     $("#_room_capacity").val(_details.room_capacity);
                     $("#_unit").val(_details.unit);
                     $("#_status").val(_details.status);
                    })`);
                } else if(type == 'other_services') {
                    res.write(`$(document).ready(function() {
                     $("#_name").val(_details.name);
                     $("#_status").val(_details.status);
                     $("#_price").val(_details.price);
                     $("#_charging_type").val(_details.charging_type);
                     $("#_reservable").val(_details.reservable);                    
                    })`);
                }
            
                res.end();
        }
    });
    connection.end();
});

//add Facility
app.get('/addfacility', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var type = params.type;

    if(type == undefined || type == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    if(type == 'dormitories') {
        res.render("add-dormitory.html");
    } else if(type == 'cottages_guesthouses') {
        res.render("add-cottageguestHouse.html");
    } else if(type == 'conference_halls') {
        res.render("add-conference.html");
    } else if(type == 'dining_kitchen') {
        res.render("add-dining.html");
    } else if(type == 'dorm_rooms') {
        res.render("add-dormroom.html");
    } else if(type == 'other_services') {
        res.render("add-otherservice.html");
    }
});

app.get('/addfacilitydetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var type = params.type;
    var id = params.id;
    var details = params.details;

    if(type == undefined || type == "" || details == "" || details == undefined) {
        res.redirect("/pages?id=4");
        return false;
    }

    details = JSON.parse(details);

    if(type == "dormitories") {
        queryDB(`INSERT INTO dormitories(category, dormitories.name, status, deped, govt, private, capacity) VALUES( '`+details.category+`', '`+details.name+`', '`+details.status+`', '`+details.deped+`', '`+details.govt+`', '`+details.private+`', '`+details.capacity+`')`);
        res.redirect("/pages?id=11");
    } else if(type == "conference_halls") {
        queryDB(`INSERT INTO conference_halls(name, capacity, status, in_deped, in_nondeped, out_deped, out_nondeped) VALUES('`+details.name+`', '`+details.capacity+`', '`+details.status+`', '`+details.in_deped+`', '`+details.in_nondeped+`', '`+details.out_deped+`', '`+details.out_nondeped+`')`);
        res.redirect("/pages?id=11");
    } else if(type == "dining_kitchen") {
        queryDB(`INSERT INTO dining_kitchen(name, capacity, status, dining_kitchen.in, dining_kitchen.out, remaining_capacity) VALUES('`+details.name+`', '`+details.capacity+`', '`+details.status+`', '`+details.in2+`', '`+details.out+`', '`+details.capacity+`')`);
        console.log(details);
        res.redirect("/pages?id=11");
    } else if(type == "other_services") {
        queryDB(`INSERT INTO other_services(name, price, charging_type, reservable, status) VALUES('`+details.name+`', '`+details.price+`', '`+details.charging_type+`', '`+details.reservable+`', '`+details.status+`')`);
        res.redirect("/pages?id=11");
    } else if(type == "dorm_rooms") {
        queryDB(`INSERT INTO dorm_rooms(dorm_id, room_no, room_capacity, unit, status) VALUES('`+details.dorm_name+`', '`+details.room_no+`', '`+details.room_capacity+`', '`+details.unit+`', '`+details.status+`')`);
        res.redirect("/pages?id=11");
    } else if(type == "cottages_guesthouses") {
        queryDB(`INSERT INTO cottages_guesthouses(name, status, deped, govt, private, bdrms, beds) VALUES('`+details.name+`', '`+details.status+`', '`+details.deped+`', '`+details.govt+`', '`+details.private+`', '`+details.bdrms+`', '`+details.beds+`')`);
        res.redirect("/pages?id=11");
    } else {
        res.redirect("/pages?id=4");
    }
});

app.get('/deletefacilitydetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var type = params.type;
    var id = params.id;

    if(type == undefined || type == "" || id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    if(type == "dormitories") {
        queryDB(`DELETE from dormitories where id = '`+id+`'`);
        res.redirect("/pages?id=13");
    } else if(type == "cottages_guesthouses") {
        queryDB(`DELETE from cottages_guesthouses where id = '`+id+`'`);
        res.redirect("/pages?id=13");
    } else if(type == "conference_halls") {
        queryDB(`DELETE from conference_halls where id = '`+id+`'`);
        res.redirect("/pages?id=13");
    } else if(type == "dining_kitchen") {
        queryDB(`DELETE from dining_kitchen where id = '`+id+`'`);
        res.redirect("/pages?id=13");
        res.write("Changes has been saved");
    } else if(type == "other_services") {
        queryDB(`DELETE from other_services where id = '`+id+`'`);
        res.redirect("/pages?id=13");
    } else if(type == "dorm_rooms") {
        queryDB(`DELETE from dorm_rooms where id = '`+id+`'`);
        res.redirect("/pages?id=13");
    } else {
        res.redirect("/pages?id=4");
    }
});

app.get('/editfacilitydetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var type = params.type;

    if(type == undefined || type == "" || id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    if(type == 'dormitories') {
        res.render("edit-dormitories.html");
    } else if(type == 'cottages_guesthouses') {
        res.render("edit-cottageguesthouse.html");
    } else if(type == 'conference_halls') {
        res.render("edit-conference.html");
    } else if(type == 'dining_kitchen') {
        res.render("edit-dining.html");
    } else if(type == 'dorm_rooms') {
        res.render("edit-dormrooms.html");
    } else if(type == 'other_services') {
        res.render("edit-otherservices.html");
    }
});

app.get('/updatefacilitydetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var type = params.type;
    var id = params.id;
    var details = params.details;

    if(type == undefined || type == "" || id == undefined || id == "" || details == "" || details == undefined) {
        res.redirect("/pages?id=4");
        return false;
    }

    details = JSON.parse(details);

    if(type == "dormitories") {
        queryDB(`update dormitories set name = '`+details.name+`', category = '`+details.category+`', status = '`+details.status+`', deped = '`+details.deped+`', govt = '`+details.govt+`',private = '`+details.private+`', capacity = '`+details.capacity+`' WHERE id = "`+id+`"`);
        res.redirect("/pages?id=12");
    } else if(type == "cottages_guesthouses") {
        queryDB(`update cottages_guesthouses set name = '`+details.name+`', type = '`+details.type+`', status = '`+details.status+`', deped = '`+details.deped+`', govt = '`+details.govt+`',private = '`+details.private+`', bdrms = '`+details.bdrms+`', beds = '`+details.beds+`'  WHERE id = "`+id+`"`);
        res.redirect("/pages?id=12");
    } else if(type == "conference_halls") {
        queryDB(`update conference_halls set name = '`+details.name+`', capacity = '`+details.capacity+`', status = '`+details.status+`', in_deped = '`+details.in_deped+`', in_nondeped = '`+details.in_nondeped+`',out_deped = '`+details.out_deped+`', out_nondeped = '`+details.out_nondeped+`' WHERE id = "`+id+`"`);
        res.redirect("/pages?id=12");
    } else if(type == "dining_kitchen") {
        queryDB(`update dining_kitchen set name = '`+details.name+`', capacity = '`+details.capacity+`', status = '`+details.status+`', dining_kitchen.in = '`+details.in2+`', dining_kitchen.out = '`+details.out+`' WHERE id = "`+id+`"`);
        res.redirect("/pages?id=12");
    } else if(type == "other_services") {
        queryDB(`update other_services set name = '`+details.name+`', status = '`+details.status+`', price = '`+details.price+`', charging_type = '`+details.charging_type+`', reservable = '`+details.reservable+`' WHERE id = "`+id+`"`);
        res.redirect("/pages?id=12");
    } else if(type == "dorm_rooms") {
        queryDB(`update dorm_rooms set dorm_id = '`+details.name+`', room_no = '`+details.room_no+`', room_capacity = '`+details.room_capacity+`', unit = '`+details.unit+`', status = '`+details.status+`' WHERE id = "`+id+`"`);
        res.redirect("/pages?id=12");
    } else {
        res.redirect("/pages?id=4");
    }
});

app.get('/getdormName', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`select id, name from dormitories  where status="available" order by name asc`, function(err, rows, fields) {
               res.write(`<option value="def">Choose a Hall</option>`);
               for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">` + rows[i].name + `</option>`);
            }
        
        res.end();
    });
    connection.end();
});

function remove_duplicates_safe(arr) {
    var seen = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return ret_arr;
}

app.get('/getReportData', function(req, res) {/*
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }*/

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var y = params.y;
    var m = params.m;
    var type = params.type;

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    res.writeHead(200, {
            "Content-Type": "text/html"
        });

    var title = "";
    var que = "";
    if(type == "cottages_guesthouses") {
        title = "Schedule of Cottages and GuestHouses";
        que = `
        SELECT concat(type, " ", cottages_guesthouses.name) as facName, reservations.name as userName, reservations.status as stat, reservations.name as name, arrival, departure FROM cottages_guesthouses 
        left join facilities_used on facilities_used.fac_id = cottages_guesthouses.id 
        left join reservations on reservations.id = facilities_used.reservation_id
        where facilities_used.fac_type = "cottages_guesthouses" and month(arrival) = "`+m+`" and year(arrival) = "`+y+`"

        union all

        select concat(type, " ", cottages_guesthouses.name) as facName, null, null, null, null, null from cottages_guesthouses
            where cottages_guesthouses.id not in(
            SELECT cottages_guesthouses.id FROM cottages_guesthouses 
            left join facilities_used on facilities_used.fac_id = cottages_guesthouses.id 
            left join reservations on reservations.id = facilities_used.reservation_id
            where facilities_used.fac_type = "cottages_guesthouses" and month(arrival) = "`+m+`" and year(arrival) = "`+y+`"
        )

        order by facName, arrival
        `;
    } else if(type == "conference_halls") {
        title = "Schedule of Conference Halls";
        que = `SELECT 
        conference_halls.name as facName, 
        reservations.name as userName, 
        reservations.status as stat, 
        reservations.name as name, arrival, departure FROM conference_halls 
        left join facilities_used on facilities_used.fac_id = conference_halls.id 
        left join reservations on reservations.id = facilities_used.reservation_id
        where facilities_used.fac_type = "conference_halls" and month(arrival) = "`+m+`" and year(arrival) = "`+y+`"

        union all

        select name as facName, null, null, null, null, null from conference_halls
            where conference_halls.id not in(
            SELECT conference_halls.id FROM conference_halls 
            left join facilities_used on facilities_used.fac_id = conference_halls.id 
            left join reservations on reservations.id = facilities_used.reservation_id
            where facilities_used.fac_type = "conference_halls" and month(arrival) = "`+m+`" and year(arrival) = "`+y+`"
        )

        order by facName, arrival`;
    } else if(type == "dining_kitchen") {
        title = "Schedule of Dining Areas and Kitchens";
        que = `SELECT 
        dining_kitchen.name as facName, 
        reservations.name as userName, 
        reservations.status as stat, 
        reservations.name as name, arrival, departure FROM dining_kitchen 
        left join facilities_used on facilities_used.fac_id = dining_kitchen.id 
        left join reservations on reservations.id = facilities_used.reservation_id
        where facilities_used.fac_type = "dining_kitchen" and month(arrival) = "`+m+`" and year(arrival) = "`+y+`"

        union all

        select name as facName, null, null, null, null, null from dining_kitchen
            where dining_kitchen.id not in(
            SELECT dining_kitchen.id FROM dining_kitchen 
            left join facilities_used on facilities_used.fac_id = dining_kitchen.id 
            left join reservations on reservations.id = facilities_used.reservation_id
            where facilities_used.fac_type = "dining_kitchen" and month(arrival) = "`+m+`" and year(arrival) = "`+y+`"
        )

        order by facName, arrival`;
    } else if(type == "dormitories") {
        title = "Schedule of Dormitories";
        que = `SELECT 
        dormitories.name as facName, 
        reservations.name as userName, 
        reservations.status as stat, 
        reservations.name as name, arrival, departure FROM dormitories 
        left join facilities_used on facilities_used.fac_id = dormitories.id 
        left join reservations on reservations.id = facilities_used.reservation_id
        where facilities_used.fac_type = "dormitories" and month(arrival) = "`+m+`" and year(arrival) = "`+y+`"

        union all

        select name as facName, null, null, null, null, null from dormitories
            where dormitories.id not in(
            SELECT dormitories.id FROM dormitories 
            left join facilities_used on facilities_used.fac_id = dormitories.id 
            left join reservations on reservations.id = facilities_used.reservation_id
            where facilities_used.fac_type = "dormitories" and month(arrival) = "`+m+`" and year(arrival) = "`+y+`"
        )

        order by facName, arrival`;
    }



    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {

                // used to count the items
                var data = new Array();
                for(i = 0; i < rows.length; i++) {
                    data.push(rows[i].facName);
                }
                data = remove_duplicates_safe(data);

                // to prepare the cottage objects
                var objectData = new Array();
                for(i = 0; i < data.length; i++) {
                    objectData.push({
                        "name": data[i],
                        "reservations": []
                    });
                }

                // to insert reservations
                for(i = 0; i < rows.length; i++) {
                    for(j = 0; j < objectData.length; j++) {

                        var n = rows[i].facName;

                        if(objectData[j].name == n && rows[i].arrival != undefined) {
                            objectData[j].reservations.push({
                                "arrival": rows[i].arrival,
                                "userName": rows[i].userName,
                                "departure": rows[i].departure,
                                "status": rows[i].stat
                            });
                        }
                    }
                }

/*
<div class="content table-responsive table-full-width">
                    </div>
*/

               // res.write("" + JSON.stringify(data) + " " + data.length);
                res.write(`   <!--<link href="assets/css/boot1/bootstrap.min.css" rel="stylesheet" />-->
                <link href="reporting.css" rel="stylesheet" media="print, screen" />
                    <h1>`+title+`</h1>
                    <h3>`+monthNames[m-1]+` `+y+`</h3>
                    <table class="table table-hover table-striped">
                        <thead>
                        <tr id="header">
                        <th>Building</th>
                        </tr>
                        </thead>
                        <tbody id="tbod">

                        </tbody>
                    </table> <br>

                    <script>        
                                    var reps = "<th>Guest Name</th><th>A</th><th>D</th>";
                                    var myPreciousData = ` + JSON.stringify(objectData) + ` 
                                    var maxRows = 0;
                                    for(i = 0; i < myPreciousData.length; i++) {
                                        var currentRow = myPreciousData[i].reservations.length;
                                        if(currentRow > maxRows) {
                                            maxRows = currentRow;
                                        }
                                    }
                                    
                                    function repeat(num) {
                                        for(i = 0; i < num; i++) {
                                            document.getElementById("header").innerHTML+=reps;
                                        }
                                    }
                                    repeat(maxRows);

                                    function createTRs(arr) {
                                        for(i = 0; i < arr.length; i++) {
                                            var tr = document.createElement("tr");
                                            tr.id = arr[i].name;
                                            tr.innerHTML = "<td class='_bname'>" + (i+1) + ". " +arr[i].name+"</td>";
                                            document.getElementById("tbod").appendChild(tr);
                                        }
                                    }
                                    createTRs(myPreciousData);

                                    function insertColumns(arr) {
                                        if(maxRows == 0) {
                                            for(i = 0; i < arr.length; i++) {
                                                document.getElementById(arr[i].name).innerHTML += '<td class="_name disabled" colspan="3">No reservations</td>';
                                            }
                                            repeat(1); //column("None","None","None")
                                            return false;
                                        }
                                        for(i = 0; i < arr.length; i++) {
                                            if(arr[i].reservations.length > 0) { // if there are reservations insert data
                                                
                                                if(arr[i].reservations.length == maxRows) { // reservations are equal to maxRows
                                                    for(y = 0; y < arr[i].reservations.length; y++) {
                                                        document.getElementById(arr[i].name).innerHTML += 
                                                            column(
                                                                    arr[i].reservations[y].userName,
                                                                    new Date(arr[i].reservations[y].arrival).getDate(),
                                                                    new Date(arr[i].reservations[y].departure).getDate(),
                                                                    arr[i].reservations[y].status
                                                            );
                                                    }
                                                } else {
                                                    for(y = 0; y < arr[i].reservations.length; y++) {
                                                        document.getElementById(arr[i].name).innerHTML += 
                                                            column(
                                                                    arr[i].reservations[y].userName,
                                                                    new Date(arr[i].reservations[y].arrival).getDate(),
                                                                    new Date(arr[i].reservations[y].departure).getDate(),
                                                                    arr[i].reservations[y].status
                                                            );
                                                    }
                                                    emptyColumn(arr[i].name, (maxRows-arr[i].reservations.length));
                                                }


                                            } else { // add columns to the empty rows
                                                for(k = 0; k < maxRows; k++) {
                                                    emptyColumn(arr[i].name, maxRows);
                                                }
                                            }

                                        }
                                    }
                                    function emptyColumn(id, times) {
                                        for(k = 0; k < times; k++) {
                                            document.getElementById(id).innerHTML += column("","","");

                                        }
                                    }
                                    function column(n, a, d, s) {
                                        if(s == "cancelled") {
                                            return "<td class='_name disabled'>"+n+"</td><td class='_arriv disabled'>"+a+"</td><td class='_dep disabled'>"+d+"</td>"
                                        } else {
                                            return "<td class='_name'>"+n+"</td><td class='_arriv'>"+a+"</td><td class='_dep'>"+d+"</td>"
                                        }
                                    } 
                                    insertColumns(myPreciousData);

                </script>`);
            
        
        res.end();
    });
    connection.end();
});








// New Employee
app.get('/newemployee', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    } else {
        res.render("new-user.html");
    }
});


app.get('/addemployee', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var details = params.details;

    if(details == "" || details == undefined) {
        res.redirect("/pages?id=4");
        return false;
    }
  


    details = JSON.parse(details);
    queryDB(`INSERT INTO employees(first_name, last_name, username, password, rank) VALUES('`+details.first_name+`', '`+details.last_name+`', '`+details.username+`', '`+details.password1+`', '`+details.rank+`')`);
    res.redirect("/pages?id=14"); //palitan ung id=11 wag kakalimutan
    
});


// Employee Editing
app.get('/getemployeedetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    connection.connect();
    connection.query(`select * from employees
        where id = ` + id, function(err, rows, fields) {
        if(rows.length != 0) {
            var details = {};
       
                details.id = rows[0].id;
                details.first_name = rows[0].first_name;
                details.last_name = rows[0].last_name;
                details.username = rows[0].username;
                details.password1 = rows[0].password1;
                details.password2 = rows[0].password2;
                details.rank = rows[0].rank;
        
                var y = details.id;
                res.write(`var _details = ` + JSON.stringify(details) + `;`);
                
                    res.write(`$(document).ready(function() {
                     $("#first_name").val(_details.first_name);
                     $("#last_name").val(_details.last_name);
                     $("#username").val(_details.username);
                     $("#password1").val(_details.password1);
                     $("#password2").val(_details.password2);
                     $("#rank").val(_details.rank).change();
                    })`);
                
            
                res.end();
        }
    });
    connection.end();
});

app.get('/editemployeedetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }
        res.render("edit-user.html");
    
});

app.get('/updateemployeedetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var details = params.details;

    if(id == undefined || id == "" || details == "" || details == undefined) {
        res.redirect("/pages?id=4");
        return false;
    }

    details = JSON.parse(details);
    console.log(details);
    queryDB(`update employees set first_name = '`+details.first_name+`', last_name = '`+details.last_name+`', username = '`+details.username+`', password = '`+details.password1+`', rank = '`+details.rank+`' WHERE id = "`+id+`"`);
    res.redirect("/pages?id=15");
    
});

//view employees
app.get('/employeelist', function(req, res) {

    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`select * from employees`, function(err, rows, fields) {

        if (rows.length != 0) {

            for (i = 0; i < rows.length; i++) {
                var edit = `
                <td width=5%;>
                <a title="Edit" type="submit" class="btn btn-info btn-fill" href="/editemployeedetails?id=` +rows[i].id+ `">
                <span class="glyphicon glyphicon-edit pull-right"></span></a>
                </td>
                <td><a title="Delete" type="submit" class="btn btn-danger btn-fill" href="/deleteemployeedetails?id=` +rows[i].id+ `">
                <span class="glyphicon glyphicon-trash pull-left" aria-hidden="true"></span></a></td>`;

                if(rows[i].id == "1") {
                    edit = `<td colspan="2"></td>`;
                }
                
                res.write(`
                                    <tr>
                                        <td width="60%">` + rows[i].first_name + ` `+rows[i].last_name+`</td>
                                        <td width="20%">` + rows[i].username + `</td>
                                        <td width="60%">`+rows[i].rank+`</td>
                                        ` + edit + `
                                     </tr>
                            `);

            }
        }
        res.end();
    });
    connection.end();
});

//delete employee
app.get('/deleteemployeedetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    queryDB(`DELETE from employees where id = '`+id+`'`);
    res.redirect("/pages?id=16");
});

app.get('/viewemployees', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    } else if(sess.rank == "admin"){
        res.render("list-users.html");
    } else {
        res.redirect("/pages?id=17");
    }
});


app.get('/saveregistration', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var details = params.details;
    var facs = params.facs;

    if(details == undefined || details == "") {
        res.redirect("/pages?dep=4");
        return false;
    }

    details = JSON.parse(details);
    details.encoder = sess.userFullName;
    
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`INSERT INTO registrations SET ?`, details, function(err, result) {
            
            if(err) {
                console.log(err);
            }
            details.facs = JSON.parse(facs);
            var halls = details.facs.halls;
            var cots = details.facs.cottages;
            var ghouses = details.facs.guesthouses;
            var dorms = details.facs.dorm_rooms;
            var dinings = details.facs.dining_kitchen;

            var reservation_id = result.insertId;

            if(halls.length != 0) {
                for(i = 0; i < halls.length; i++) {
                    var newData = {registration_id: result.insertId, fac_id: halls[i], fac_type:"conference_halls"};
                    submitToDB(newData, currentDB, "registered_facilities");
                }
            }


            if(cots.length != 0) {
                for(i = 0; i < cots.length; i++) {
                    var newData = {registration_id: reservation_id, fac_id: cots[i], fac_type:"cottages_guesthouses"};
                    submitToDB(newData, currentDB, "registered_facilities");
                }
            }

            if(ghouses.length != 0) {
                for(i = 0; i < ghouses.length; i++) {
                    var newData = {registration_id: reservation_id, fac_id: ghouses[i], fac_type:"cottages_guesthouses"};
                    submitToDB(newData, currentDB, "registered_facilities");
                }
            }

            if(dorms.length != 0) {
                for(i = 0; i < dorms.length; i++) {
                    var newData = {registration_id: reservation_id, fac_id: dorms[i], fac_type:"dorm_room"};
                    submitToDB(newData, currentDB, "registered_facilities");
                }
            }
            if(dinings.length != 0) {
                for(i = 0; i < dinings.length; i++) {
                    var newData = {registration_id: reservation_id, fac_id: dinings[i], fac_type:"dining_kitchen"};
                    
                    submitToDB(newData, currentDB, "registered_facilities");
                }
            }

        res.write("");
        res.end("done");
    });
    connection.end();
});



app.get('/registerhall', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var que = `select conference_halls.id, conference_halls.name from conference_halls 
                WHERE
                vacant = "true"
                and status = "available"
                order by name asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if (rows.length != 0 || !err) {

           // res.write(`+ rows.length + " halls are available.");
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                       <select class="form-control" id="hall" onchange="HallList.showDetails();">`);
            res.write(`<option value="def">`+ rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">` + rows[i].name + `</option>`);
            }
            res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="HallList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>`);


        } else {
            res.write(`No halls are available right now.`);
        }
        res.end();
    });
    connection.end();
});


app.get('/registercottage', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var vip = params.vip;
    var concat = "";

    if(vip == "true") {
        concat = `or type = "vip"`;
    }

    var que = `select cottages_guesthouses.id, cottages_guesthouses.name from cottages_guesthouses WHERE
                vacant = "true" 
                and type = "cottage" ` + concat + `
                and status = "available"
                order by name asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if (rows.length != 0) {
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                       <select id="cottage" class="form-control" onchange="CottageList.showDetails()">`);
            res.write(`<option value="def">`+ rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">Cottage ` + rows[i].name + `</option>`);
            }
            res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="CottageList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>`);

        } else {
            res.write(`No cottages are available right now.`);
        }
        res.end();
    });
    connection.end();
});




app.get('/registerguesthouse', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var que = `select cottages_guesthouses.id, cottages_guesthouses.name from cottages_guesthouses WHERE
                vacant = "true"
                and type = "guesthouse" or type = "textbookhouse"
                and status = "available"
                order by name asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if (rows.length != 0) {
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                       <select id="guesthouse" class="form-control" onchange="GuestHouseList.showDetails()">`);
            res.write(`<option value="def">`+ rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">Guesthouse ` + rows[i].name + `</option>`);
            }
            res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="GuestHouseList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>`);

        } else {
            res.write(`No guesthouses are available right now.`);
        }
        res.end();
    });
    connection.end();
});


app.get('/registerdormroom', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var que = ` select dorm_rooms.id, dorm_rooms.dorm_id, dormitories.name, dorm_rooms.room_no from dorm_rooms
                inner join dormitories on dormitories.id = dorm_rooms.dorm_id
                where dorm_rooms.vacant = "true"
                and dorm_rooms.status = "available"
                order by name, room_no asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {

        if (rows.length != 0) {

            //res.write(rows.length + " dormitories are available.");
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                           <select class="form-control" id="dormitory"  onchange="DormRoomList.showDetails()">`);
            res.write(`<option value="def">`+ rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">` + rows[i].name + ` ` + rows[i].room_no +  ` </option>`);
            }
             res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="DormRoomList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                       </button>
                  </span>
          </div>`);
            
        } else {
            res.write(`No dormitory rooms are available right now.`);
        }
        res.end();
    });
    connection.end();
});



app.get('/registerdining', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var que = `select dining_kitchen.id, dining_kitchen.name from dining_kitchen WHERE
                vacant = "true"
                and status = "available"
                order by name asc`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if (rows.length != 0) {
            //res.write(rows.length + " facilities are available.");
            res.write(`<br><div class="input-group col-md-6" style="margin: 0 auto;">
                       <select id="dining_kitchen" class="form-control" onchange="DiningsList.showDetails()">`);
            res.write(`<option value="def">`+ rows.length + ` Facilities Available</option>`);
            for (i = 0; i < rows.length; i++) {

                res.write(`<option value="` + rows[i].id + `">` + rows[i].name + `</option>`);
            }
            res.write(`  </select>            
                <span class="input-group-btn">
                    <button onclick="DiningsList.add()" class="btn btn-success btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>`);

        } else {
            res.write(`No dining areas / kitchens are available right now.`);
        }
        res.end();
    });
    connection.end();
});

app.get('/allregisters', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var arriv = params.arrival;
    var dep = params.departure;
    var total = params.total;
    var gtype = params.gtype;
    var affi = params.affiliation;
    var lodging = params.lodging;
    var action = params.action;
    var src = params.src;


    if (arriv == undefined || dep == undefined) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write("<h5>Please provide an arrival and departure date.</h5>");
        res.end();
    }

    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.write(`
        <script src="facility_reservation.js"></script>
    `);
    res.write(`
        <script type="text/javascript">
            var _arrival = "` + arriv + `";
            var _departure = "` + dep + `";
            var _total = "` + total + `";
            var _gtype = " ` + gtype + `";
            var _affiliation = "` + affi + `";
            var _lodging = "` + lodging + `";
            var _src = "` + src + `";

            function resetDetails() {
                $("#facilities_details").html("");  
            }
        </script>
        <br>                    
         <div class="alert alert-info">
            	Note: Facilities that appear here are the only ones that are available during the provided period of time.
         </div>
        
        <div class="content" id="fac_content">

        <ul class="nav nav-tabs">
          <li class="active"><a onclick="resetDetails()" data-toggle="tab" href="#tab1">Conference Halls</a></li>
          <li><a onclick="resetDetails()" data-toggle="tab" href="#tab2">Cottages</a></li>
          <li><a onclick="resetDetails()" data-toggle="tab" href="#tab3">GuestHouses</a></li>
          <li><a onclick="resetDetails()" data-toggle="tab" href="#tab4">Dormitories</a></li>
          <li><a onclick="resetDetails()" data-toggle="tab" href="#tab5">Dining Area and Kitchen</a></li>
        </ul>
        <div class="tab-content">
          <div id="tab1" class="tab-pane fade in active">
                <div id="halls_wrap"> </div>
          </div>
          <div id="tab2" class="tab-pane fade">
                <div id="cottages_wrap"> </div>
          </div>
          <div id="tab3" class="tab-pane fade">
                 <div id="guesthouses_wrap"></div>
          </div>
          <div id="tab4" class="tab-pane fade">
                <div id="dormitories_wrap"> </div>
          </div>
          <div id="tab5" class="tab-pane fade">
                <div id="dinings_wrap"> </div>
          </div>
        </div>

        <div id="facilities_details">

        </div>

        <h4>Chosen Facilities</h4>
        <table id="facilities_wrap" class="table table-hover table-striped table-bordered">
        <thead>
            <tr>
                <th width="30%">Type</th>
                <th width="55%">Name</th>
                <th width="15%" style="text-align: center">Remove</th>
            </tr>
            <tr id="facempty">
            	<td colspan="3" style="text-align: center;">No Facilities Chosen.</td>
            </tr>
        </thead>
        <tbody id="facilities_table">

        </tbody>
        </table> <hr/>`);


                    if(action == undefined) {
                        res.write(`<div class="row">
                              <div class="col-md-2">
                                    <a class="btn btn-info btn-fill pull-left" onclick="goBack();">Back</a>
                                 </div>
                                 <div class="col-md-8">
                                    
                                 </div>
                                 <div class="col-md-2">
                                    <a class="btn btn-info btn-fill pull-right" onclick="showSummary();">Next</a>
                                 </div>
                              </div>`);
                    } else {
                        res.write(`<div class="row">
                              <div class="col-md-2">
                                    <a class="btn btn-danger btn-fill pull-left" onclick="cancelAdding();">Cancel</a>
                                 </div>
                                 <div class="col-md-8">
                                    
                                 </div>
                                 <div class="col-md-2">
                                    <a class="btn btn-info btn-fill pull-right" onclick="saveAdded();">Save</a>
                                 </div>
                              </div>`);
                    }
                            

        res.write(`</div>

        <script type="text/javascript">
        $(document).ready(function() {

            $.get("/registerhall",{},function(data){
              if(data)  { $("#halls_wrap").html(data); }
            });

            if(_lodging == "in") {
                var concat = "";
                if(_affiliation == "vip") {
                    concat = "?vip=true";
                }
                $.get("/registercottage"+concat,{},function(data){
                  if(data)  { $("#cottages_wrap").html(data); }
                });
            } else {
                  $("#cottages_wrap").html("Cottages are only available for Live-ins.");
            }

            if(_lodging == "in") {
                $.get("/registerguesthouse",{},function(data){
                  if(data)  { $("#guesthouses_wrap").html(data); }
                });
            } else {
                  $("#guesthouses_wrap").html("GuestHouses are only available for Live-ins.");
            }

            if(_lodging == "in") {
                $.get("/registerdormroom",{},function(data){
                    if(data)  { $("#dormitories_wrap").html(data); }
                });
            } else {
                  $("#dormitories_wrap").html("Dormitories are only available for Live-ins.");
            }

            $.get("/registerdining",{},function(data){
              if(data)  { $("#dinings_wrap").html(data); }
            });


        });
        </script>
    `);
    res.end();
});

// Registrations
app.get('/guests', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    } else {
        res.render("list-registration.html");
    }
});

app.get('/viewregdetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    res.render("view-registration.html");
});

app.get('/registrationlist', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(`select * from registrations `, function(err, rows, fields) {
        if (rows.length != 0) {
            for (i = 0; i < rows.length; i++) {
                res.write(`
                                    <tr>
                                        
                                        <td>` + rows[i].id + `</td>
                                        <td>` + rows[i].name + `</td>
                                        <td>` + rows[i].affi + `</td>
                                        <td>` + rows[i].total + `</td>
                                        <td>` + rows[i].lodging + `</td>
                                        <td>` + rows[i].status + `</td>
                                        
                                        <td><a type="submit" class="btn btn-info btn-sm btn-fill pull-left" href="/viewregdetails?id=` + rows[i].id + `">View Details</a>
                                       </td>
                                     </tr>
                            `);

            }
        }
        res.end();
    });
    connection.end();
});

app.get('/getregdetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var type = params.type;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    connection.connect();
    connection.query(`select *, registrations.status as regstat, registrations.id as waka from registrations 
        left join registered_facilities on registered_facilities.registration_id = registrations.id
        where registrations.id = ` + id, function(err, rows, fields) {
        if(rows.length != 0) {
            var details = {};
                details.id = rows[0].waka;
                details.name = rows[0].name;
                details.home_addr = rows[0].home_addr;
                details.office_addr = rows[0].office_addr;
                details.home_no = rows[0].home_no;
                details.office_no = rows[0].office_no;
                details.affi = rows[0].affi;
                details.id_card = rows[0].id_card;
                details.bday = rows[0].bday;
                details.reg_type = rows[0].reg_type;
                details.adults = rows[0].adults;
                details.children = rows[0].children;
                details.seniors = rows[0].seniors;
                details.total = rows[0].total;
                details.remarks = rows[0].remarks;
                details.lodging = rows[0].lodging;
                details.arrival = rows[0].arrival;
                details.departure = rows[0].departure;
                details.emer_name = rows[0].emer_name;
                details.emer_no = rows[0].emer_no;
                details.checkin = rows[0].checkin;
                details.checkout = rows[0].checkout;
                details.checkedoutby = rows[0].checkedoutby;
                details.status = rows[0].regstat;
                details.encoder = rows[0].encoder;
                details.cancel_date = rows[0].cancel_date;
                details.canceller = rows[0].canceller;
                details.userrank = sess.rank;

                details.facs = {
                    halls: new Array(),
                    cottages_guesthouses: new Array(),
                    dinings: new Array(),
                    dorms: new Array(),
                    others: new Array(),
                };

                for(i = 0; i < rows.length; i++) {
                    if(rows[i].fac_type == "conference_halls") {
                        details.facs.halls.push(rows[i].fac_id);
                    } else if(rows[i].fac_type == "cottages_guesthouses") {
                        details.facs.cottages_guesthouses.push(rows[i].fac_id);
                    } else if(rows[i].fac_type == "dining_kitchen") {
                        details.facs.dinings.push(rows[i].fac_id);
                    } else if(rows[i].fac_type == "dorm_room") {
                        details.facs.dorms.push(rows[i].fac_id);
                    } else if(rows[i].fac_type == "other_services") {
                        details.facs.others.push(rows[i].fac_id);
                    }
                }

                var y = details.id;
                res.write(`var _details = ` + JSON.stringify(details) + `;`);
                if(type == undefined) {
                    res.write(`
                        function getFacs(table, type) {
                                $.get("/getregfacdet?id=`+y+`&table="+table+"&type="+type, {}, function(data){
                                  if(data) {
                                     $("#_facs_requested").append(data);
                                  }
                                });
                        }
                        function loadFacs() {
                            var empty = true;

                            if(_details.facs.halls.length > 0) {
                                getFacs("conference_halls", "Conference Hall");
                                empty = false;
                            }
                            if(_details.facs.cottages_guesthouses.length > 0) {
                                getFacs("cottages_guesthouses", "Cottage / GuestHouse");
                                empty = false;
                            }
                            if(_details.facs.dinings.length > 0) {
                                getFacs("dining_kitchen", "Dining Area / Kitchen");
                                empty = false;
                            }
                            if(_details.facs.dorms.length > 0) {
                                getFacs("dorm_rooms", "Dormitory Room");
                                empty = false;
                            }
                            if(_details.facs.others.length > 0) {
                                getFacs("other_services", "Other");
                                empty = false;
                            }
                            if(empty) {
                                $("#_facs_requested").append("<tr><td colspan='2'>No Facilities Requested.</td></tr>");
                            }
                        }
                        function changeStatus() {
                            var stat = $("#_status_select").val();
                            if(stat == "def") {
                                alert("This is the same as the previous status.");
                            } else if(stat == "check-out") {
                                var q = confirm("CONFIRMATION: Are you sure you want to check-out this registration?");
                                if(q) {
                                    window.location.href="/updateregistration?type=checkout&id=`+y+`";
                                } else {
                                    return false;
                                }
                            } else if(stat == "cancel") {
                                var q = confirm("CANCELLATION: Are you sure you want to cancel this registration?");
                                if(q) {
                                    window.location.href="/updateregistration?type=cancel&id=`+y+`";
                                } else {
                                    return false;
                                }
                            }
                        }
                        function slic(text) {
                            return (new String(new Date(text)).slice(3, 15));
                        }
                        function ins(txt, id) {
                            if(txt == "" || txt == null || txt == "0") {
                                if(txt == "0") {
                                    txt = " - ";
                                } else {
                                    txt = "None";
                                }
                                $("#_"+id).attr("disabled", true);
                            }
                            $("#_"+id).html(txt);
                        }
                        $(document).ready(function(){
                            $("#_dcreated").html(slic(_details.checkin));
                            $("#_encoder").html(_details.encoder);

                            if(_details.checkout != null) {
                                $("#_dconfirmed").html(slic(_details.checkout));
                                $("#_confirmer").html(_details.checkedoutby);
                            } else {
                                $("#_condata").hide();
                            }

                            if(_details.canceller != null) {
                                $("#_dcancelled").html(slic(_details.cancel_date));
                                $("#_canceler").html(_details.canceller);
                            } else {
                                $("#_candata").hide();
                            }

                            ins(_details.name, "name");
                            ins(_details.home_addr, "home_addr");
                            ins(_details.office_addr, "office_addr");
                            ins(_details.home_no, "home_no");
                            ins(_details.office_no, "office_no");
                            ins(_details.affi, "affi");
                            ins(_details.id_card, "id_card");
                            ins(_details.bday, "bday");
                            ins(_details.reg_type, "reg_type");
                            ins(_details.adults, "adults");
                            ins(_details.children, "children");
                            ins(_details.seniors, "seniors");
                            ins(_details.total, "total");
                            ins(_details.remarks, "remarks");
                            ins(_details.lodging, "lodging");
                            ins(slic(_details.arrival), "arrival");
                            ins(slic(_details.departure), "departure");
                            ins(_details.emer_name, "emer_name");
                            ins(_details.emer_no, "emer_no");
                            ins(_details.status, "status");

                            if(_details.status == "checked-in" && _details.userrank != "reservation staff"){
                                $("#_status_select").append("<option value='def'>Checked-in</option><option value='check-out'>Check-out</option><option value='cancel'>Cancel</option>");
                             	$("#_edit").html('<a title="Edit Details" href="/editregdetails?id='+_id+'"><span class="glyphicon glyphicon-edit pull-right" aria-hidden="true"></span></a>');
                                $("#_add").html('<a title="Add Facilities" onclick="addFaci(this)" href="javascript:;" name="/allregisters?id='+_id+'&arrival='+new String(_details.arrival).slice(0,10)+'&departure='+new String(_details.departure).slice(0,10)+'&total='+_details.total+'&gtype='+_details.reg_type+'&affiliation='+_details.affi+'&lodging='+_details.lodging+'"><span class="glyphicon glyphicon-plus pull-right" aria-hidden="true"></span></a>');
                            } else {
                            	$("#_change_status").hide();
                            }

                            loadFacs();

                        });
                    `);
                } else { // for edit
res.write(`
                        function slic(text) {
                            return (new String(new Date(text)).slice(3, 15));
                        }
                        function ins(txt, id) {
                            if(txt == "" || txt == null || txt == "0") {
                                if(txt == "0") {
                                    txt = " - ";
                                } else {
                                    txt = "None";
                                }
                                $("#_"+id).attr("disabled", true);
                            }
                            $("#_"+id).html(txt);
                        }
                        $(document).ready(function(){

                            $("#_name").val(_details.name);
                            $("#_home_addr").val(_details.home_addr);
                            $("#_office_addr").val(_details.office_addr);

                            $("#_home_no").val(_details.home_no);
                            $("#_office_no").val(_details.office_no);
                            $("#_affi").val(_details.affi).change();
                            $("#_id_card").val(_details.id_card).change();
                            $("#_bday").val(new String(_details.bday).slice(0, 10));
                            $("#_reg_type").val(_details.reg_type).change();
                            $("#_adults").val(_details.adults);
                            $("#_children").val(_details.children);
                            $("#_seniors").val(_details.seniors);
                            $("#_total").val(_details.total);
                            $("#_remarks").val(_details.remarks);

                            $("#_lodging").val(_details.lodging).change().attr("disabled", true);
                            $("#_arrival").val(new String(_details.arrival).slice(0, 10)).attr("disabled", true);
                            $("#_departure").val(new String(_details.departure).slice(0, 10)).attr("disabled", true);

                            $("#_emer_name").val(_details.emer_name);
                            $("#_emer_no").val(_details.emer_no);
                        });
                    `);
                }
                res.end();
        }
    });
    connection.end();
});


app.get('/getregfacdet', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var table = params.table;
    var type = params.type;

    if(id == undefined || id == "" || table == undefined || table == "" || type == undefined || type == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    var que = `select *,
        ` + table + `.name as truename,
        registered_facilities.id as waka, 
        registrations.status as res_status, 
        registrations.id as kappa,
        use_start,
        use_end
        from registered_facilities
        inner join ` + table + ` on ` + table + `.id = registered_facilities.fac_id
        inner join registrations on registrations.id = registered_facilities.registration_id
        where registered_facilities.registration_id = `+id+`
        and registered_facilities.fac_type = "` + table + `"`;

    if(table == "dorm_rooms") {
    	que = `select *,
        concat(dormitories.name, " ", dorm_rooms.room_no) as truename,
        registered_facilities.id as waka, 
        registrations.status as res_status, 
        registrations.id as kappa,
        use_start,
        use_end
        from registered_facilities
        inner join ` + table + ` on ` + table + `.id = registered_facilities.fac_id
        inner join registrations on registrations.id = registered_facilities.registration_id
        inner join dormitories on dormitories.id = dorm_rooms.dorm_id
        where registered_facilities.registration_id = `+id+`
        and registered_facilities.fac_type = "dorm_room"`;
    }


    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    connection.connect();
    connection.query(que, function(err, rows, fields) {
        if(rows.length != 0) {
            for(i = 0; i < rows.length; i++) {

                var edit = "";
                var start = `start`;
                var end = `end`;
                var save = ``;

                console.log(rows[i].use_start + " \n" + rows[i].use_end+"\n\n");
                
                if(rows[i].use_start == null) {
                    rows[i].use_start = rows[0].arrival;
                }
                if(rows[i].use_end == null) {
                    rows[i].use_end = rows[0].departure;
                }

                console.log(rows[i].use_start + " \n" + rows[i].use_end);
                //console.log(rows[i].use_start+" \n"+rows[i].use_end + "\n" + rows[0].arrival + "\n" + rows[0].departure);
                
                var u_date = new Date(rows[i].use_start);
                var udate_m = u_date.getMonth()+1;
                var udate_d = u_date.getDate();
                if(udate_m < 10) {
                    udate_m = "0"+udate_m;
                }
                if(udate_d < 10) {
                    udate_d = "0"+udate_d;
                }
                
                var e_date = new Date(rows[i].use_end);


                var edate_m = e_date.getMonth()+1;
                var edate_d = e_date.getDate();
                if(edate_m < 10) {
                    edate_m = "0"+edate_m;
                }
                if(edate_d < 10) {
                    edate_d = "0"+edate_d;
                }

                str_date = u_date.getFullYear()+"-"+udate_m+"-"+udate_d;
                end_date = e_date.getFullYear()+"-"+edate_m+"-"+edate_d;

                


                if(rows[0].res_status == "checked-in") {
                        edit = `<a title="Delete" onclick="confirmDelete(`+rows[i].waka+`,`+rows[0].kappa+`);" class="btn btn-danger btn-fill">
                                            <span class="glyphicon glyphicon-trash" aria-hidden="true">
                                            </span></a>`;
                        start = `<input class="form-control" type="date" id="startofuse`+rows[i].waka+`" value="`+str_date+`" />`;
                        end = `<input class="form-control" type="date" id="endofuse`+rows[i].waka+`" value="`+end_date+`" />`;
                        save = `<a class="btn btn-info btn-fill pull-right" onclick="saveStartEnd('`+rows[i].waka+`','`+rows[i].arrival+`','`+rows[i].departure+`');">Save</a>`;
                } else {
                        start = `<span class="form-control">`+new String(rows[0].use_start).slice(3, 15)+`</span>`;
                        end = `<span class="form-control">`+new String(rows[0].use_end).slice(3, 15)+`</span>`;
                }

                if(sess.rank == "reservation staff") {
                        edit = ``;
                        start = ``;
                        end = ``;
                        save = ``;
                }

                res.write(`
                                 <tr>
                                    <td>` + type + `</td>
                                    <td>` + rows[i].truename + `</td>
                                    <td>` + start + `</td>
                                    <td>` + end + `</td>
                                    <td>` + save + `</td>
                                    <td style="text-align: center;">
                                        ` + edit + `                                        
                                    </td>
                                 </tr>
                `);
            }
            res.end();
        }
    });
    connection.end();
});



app.get('/addregfacilities', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var resid = params.resid;
    var facs = params.fac;
    var total = params.total;

    if(resid == undefined || resid == "" || facs == undefined || facs == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    facs = JSON.parse(facs);
    
            var halls = facs.halls;
            var cots = facs.cottages;
            var ghouses = facs.guesthouses;
            var dorms = facs.dorm_rooms;
            var dinings = facs.dining_kitchen;

            if(halls.length != 0) {
                for(i = 0; i < halls.length; i++) {
                    var newData = {registration_id: resid, fac_id: halls[i], fac_type:"conference_halls"};
                    submitToDB(newData, currentDB, "registered_facilities");
                }
            }

            if(cots.length != 0) {
                for(i = 0; i < cots.length; i++) {
                    var newData = {registration_id: resid,fac_id: cots[i], fac_type:"cottages_guesthouses"};
                    submitToDB(newData, currentDB, "registered_facilities");
                }
            }

            if(ghouses.length != 0) {
                for(i = 0; i < ghouses.length; i++) {
                    var newData = {registration_id: resid,fac_id: ghouses[i], fac_type:"cottages_guesthouses"};
                    submitToDB(newData, currentDB, "registered_facilities");
                }
            }

            if(dorms.length != 0) {
                for(i = 0; i < dorms.length; i++) {
                    var newData = {registration_id: resid,fac_id: dorms[i], fac_type:"dorm_room"};
                    submitToDB(newData, currentDB, "registered_facilities");
                }
            }

            if(dinings.length != 0) {
                for(i = 0; i < dinings.length; i++) {
                    var newData = {registration_id: resid,fac_id: dinings[i], fac_type:"dining_kitchen", occupants: total};
                    submitToDB(newData, currentDB, "registered_facilities");
                }
            }
    res.end("done");
});

app.get('/guestfilter',function(req,res){
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;

    var arriv = params.arrival;
    var dep = params.departure;
    var name = params.name;
    var affi = params.affiliation;
    var status  = params.status;
    var deft = params.default;

    console.log(arriv + " " +dep + " " +name + " " +affi + " " +status + " " +deft);

    var query = "select * from registrations";
    var where = new Array();
    if(arriv.length > 0) { // theres an arriv
        where.push(`arrival = "`+arriv+`"`);
    }
    if(dep.length > 0) { // theres a dep
        where.push(`departure = "`+dep+`"`);
    }
    if(name.length > 0) { // theres a name
        where.push(`name like "%`+name+`%"`);
    }
    if(affi.length > 0) { // theres an affi
        where.push(`affi = "`+affi+`"`);
    }
    if(status.length > 0) { // theres a status
        where.push(`status = "`+status+`"`);
    }
    var conditions = "";
    for(y = 0; y < where.length; y++) {
        if(y == 0) {
            conditions += " where " + where[y];
        } else {
            conditions += " and " + where[y];
        }
    }
    var updatedQuery = query + conditions + " order by arrival asc, departure asc";
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    connection.query(updatedQuery, function(err, rows, fields) {
        
        var result = "";
        if(rows.length > 1) {
            result = "results";
        } else {
            result = "result";
        }

        if(deft != "true" && result == "results") {
            res.write(`<tr><td colspan="9">`+rows.length+` `+result+` found.</td></tr>`);
        }

        if(where.length > 0) {
            res.write(`<tr><td colspan="9"><b>Filters:</b> `+ conditions
                .replace(/where/g,"")
                .replace(/ and/g,", ")
                .replace(/like/g,":")
                .replace(/%/g,"")
                .replace(/=/g, ":")+`</td></tr>`);
        }
        if (rows.length !=0) {
            for (i=0; i<rows.length; i++){
                res.write(`
                    <tr>
                        <td>` + rows[i].status + `</td>
                        <td>` + new String(rows[i].arrival).slice(3, 15) + `</td>
                        <td>` + new String(rows[i].departure).slice(3,15) + `</td>
                        <td>` + rows[i].name + `</td>
                        <td>` + new String(rows[i].affi).replace("deped","DepEd").replace("govt","Government").replace("private","Private").replace("vip","VIP") + `</td>
                        <td>` + rows[i].total + `</td>
                        <td>` + rows[i].encoder + `</td>
                        <td><a type="submit" class="btn btn-info btn-sm btn-fill pull-left" href="/viewregdetails?id=` + rows[i].id +
                         `">View Details</a></td>
                     </tr>
                `);
            }
        } else {
            res.write(`<tr><td colspan="9">No results found.</td></tr>`);
        }
        res.end();
    });
    connection.end();
});

app.get('/guestfilter_date',function(req,res){
        if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var name = params.name;
    var year = params.year;
    var month = params.month;
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    var query = "select * from registrations";
    var where = new Array();
    if(year.length > 0) { // theres year
        where.push(`year(arrival) = "`+year+`"`);
    }

    if(month.length > 0) { // theres a month
        where.push(`month(arrival) = "`+month+`"`);
    }
    var conditions = "";
    for(y = 0; y < where.length; y++) {
        if(y == 0) {
            conditions += " where " + where[y];
        } else {
            conditions += " and " + where[y];
        }
    }
    var updatedQuery = query + conditions + " order by arrival asc, departure asc";

    var monthN = new Array();
    monthN[0] = "January";
    monthN[1] = "February";
    monthN[2] = "March";
    monthN[3] = "April";
    monthN[4] = "May";
    monthN[5] = "June";
    monthN[6] = "July";
    monthN[7] = "August";
    monthN[8] = "September";
    monthN[9] = "October";
    monthN[10] = "November";
    monthN[11] = "December";

    var monthNa = "";
    if(month.length > 0) {
        monthNa = `"`+monthN[parseInt(month)-1]+`"`;
    }
    

    connection.connect();
    connection.query(updatedQuery, function(err, rows, fields) {
        var result = "";
        if(res.length > 1) {
            result = "results";
        } else {
            result = "result";
        }
        if (rows.length !=0) {
            res.write(`<tr><td colspan="9">`+rows.length+` `+result+` found.</td></tr>`);
            if(where.length > 0) {
                res.write(`<tr><td colspan="9"><b>Filters:</b> `+ conditions.replace(/year\(arrival\)/g,"Year")
                .replace(/ and/g,", ")
                .replace(/ where/g," ")
                .replace(/month\(arrival\)/g,"Month")
                .replace(/=/g, ":")
                .replace("\""+month+"\"", "") +` `+ monthNa +`</td></tr>`);
             }
            for (i=0; i<rows.length; i++){
                res.write(`
                    <tr>
                        <td>` + rows[i].status + `</td>
                        <td>` + new String(rows[i].arrival).slice(3, 15) + `</td>
                        <td>` + new String(rows[i].departure).slice(3,15) + `</td>
                        <td>` + rows[i].name + `</td>
                        <td>` + new String(rows[i].affi).replace("deped","DepEd").replace("govt","Government").replace("private","Private").replace("vip","VIP") + `</td>
                        <td>` + rows[i].total + `</td>
                        <td>` + rows[i].encoder + `</td>
                        <td><a type="submit" class="btn btn-info btn-sm btn-fill pull-left" href="/viewregdetails?id=` + rows[i].id +
                         `">View Details</a></td>
                     </tr>
                `);
            }
        } else {
            if(where.length > 0) {
                res.write(`<tr><td colspan="9"><b>Filters:</b> `+ conditions.replace(/year\(arrival\)/g,"Year")
                .replace(/ and/g,", ")
                .replace(/ where/g," ")
                .replace(/month\(arrival\)/g,"Month")
                .replace(/=/g, ":")
                .replace("\""+month+"\"", "") +` `+ monthNa +`</td></tr>`);
            }
            res.write(`<tr><td colspan="9">No results found.</td></tr>`);
        }
        res.end();
    });
    connection.end();
});



app.get('/updateregistration', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var type = params.type;
    var id = params.id;
    var dets = params.details;


    if(type == undefined || type == "" || id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }

    if(type == "checkout") {
        queryDB(`update registrations set status = 'checked-out', checkout = NOW(), checkedoutby = '`+sess.userFullName+`' WHERE id = "`+id+`"`);
        res.redirect("/updatedregredirector?id="+id);
    } else if(type == "cancel") {
        queryDB(`update registrations set status = 'cancelled', cancel_date = NOW(), canceller = '`+sess.userFullName+`' WHERE id = "`+id+`"`);
        res.redirect("/updatedregredirector?id="+id);
    } else if(type == "edit") {

        if(dets != undefined) {
            dets = JSON.parse(dets);
        } else {
            res.redirect("/pages?id=4");
            return false;
        }

        queryDB(`update registrations set 
            name="`+dets.name+`",
            bday="`+dets.bday+`", 
            home_addr="`+dets.home_addr+`",
            office_addr="`+dets.office_addr+`", 
            home_no="`+dets.home_no+`", 
            office_no="`+dets.office_no+`", 
            affi="`+dets.affi+`", 
            id_card="`+dets.id_card+`", 
            reg_type="`+dets.reg_type+`", 
            adults="`+dets.adults+`",
            seniors="`+dets.seniors+`",
            children="`+dets.children+`",
            total="`+dets.total+`", 
            lodging="`+dets.lodging+`", 
            arrival="`+dets.arrival+`", 
            departure="`+dets.departure+`", 
            emer_name="`+dets.emer_name+`",
            emer_no="`+dets.emer_no+`",
            remarks="`+dets.remarks+`" WHERE id = "`+id+`"`);
        res.redirect("/updatedregredirector?id="+id);
    }
});

app.get('/updatedregredirector', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=3");
        return false;
    }

    res.write(`
        <!doctype html>
        <html lang="en">
        <head>
           <meta charset="utf-8" />
           <link rel="icon" type="image/png" href="assets/img/logo.png">
           <title>Baguio Teacher's Camp</title>
           <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
           <meta name="viewport" content="width=device-width" />
           <link href="assets/css/boot/bootstrap.min.css" rel="stylesheet" />
           <link href="assets/css/animate.min.css" rel="stylesheet" />
           <link href="assets/css/light-bootstrap-dashboard.css" rel="stylesheet" />
           <link href='assets/fonts/Roboto.ttf' rel='stylesheet' type='text/css'>
           <link href="assets/css/pe-icon-7-stroke.css" rel="stylesheet" />

        </head>
        <body>
              <br> <br>
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                     <div class="col-md-6">
                     <div class="card card-user">
                        <div class="image">
                           <img src="assets/img/green.png" alt="..." />
                        </div>
                        <div class="content">
                           <div class="author">
                              <a href="#">
                                 <img class="avatar border-gray" src="assets/img/logo1.png" alt="..." />
                                 <h4 class="title">Registration Updated!<br/>
                                    <small>Changes have been made</small>
                                </h4>
                              </a>

                              <a href="/viewregdetails?id=`+id+`">
                                 <h4 class="title"><br/>
                                    <small>Proceed</small>
                                </h4>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
            </div>
        </div>
        </body>
           <script src="assets/js/jquery-1.10.2.js" type="text/javascript"></script>
            <script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
            <script src="assets/js/bootstrap-checkbox-radio-switch.js"></script>
            <script src="assets/js/chartist.min.js"></script>
            <script src="assets/js/bootstrap-notify.js"></script>
            <script src="assets/js/light-bootstrap-dashboard.js"></script>
        </html>
    `)
    res.end();
});

app.get('/updateusage', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var start = params.start;
    var end = params.end;


    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }


    queryDB(`update registered_facilities set 
            use_start = "`+start+`",
            use_end = "`+end+`"
            WHERE id = "`+id+`"`);

    res.end("done");
    
});


app.get('/removeregfacility', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var resid = params.resid;

    if(id == undefined || id == "" || resid == undefined || resid == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    try {
        queryDB("DELETE from registered_facilities where id = " + id);
    } catch(e) {
    }
    res.redirect("/viewregdetails?id="+resid);

});

app.get('/editregdetails', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    res.render("edit-registration.html");
});

app.get('/facilityscript', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }

    var url = require("url");
    var params = url.parse(req.url, true).query;
    var type = params.type;
    
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    var que = `SELECT * FROM `+type+` ORDER BY id ASC`;
    if(type == "dorm_rooms") {
      que = `SELECT * from dorm_rooms inner join dormitories on dormitories.id = dorm_rooms.dorm_id order by name asc, room_no asc`;
    }
    if(type == "other_services") {
    var que = `SELECT * FROM `+type+` where reservable = "yes" ORDER BY id ASC`;
    }
    connection.query(que, function(err, rows, fields) {
        if (rows.length != 0) {

            res.write(`var `+type+` = [ `)
           for (i = 0; i < rows.length; i++) {
               var name = rows[i].name;
               if(type == "dorm_rooms") {
                  name = rows[i].name + " " +rows[i].room_no;
               } else if(type == "cottages_guesthouses") {
                  name = rows[i].type + " " +rows[i].name;
               }
               if(i < rows.length-1) {
                  res.write(`{id:'`+rows[i].id+`', name:'`+name+`'},`);
               } else {
                  res.write(`{id:'`+rows[i].id+`', name:'`+name+`'}`);
               }
            }

              
            res.write(` ];`);
        }
        res.end();
    });
    connection.end();
});

app.get('/facilityviewer', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
    } else {
        res.render("facility-viewer.html");
    }
});

app.get('/getreservations', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var resid = params.resid;
    var type = params.type;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    var que = `SELECT *, reservations.id as res_id FROM `+type+` inner join facilities_used on facilities_used.fac_id = `+type+`.id and facilities_used.fac_type = '`+type+`' inner join reservations on reservations.id = facilities_used.reservation_id where `+type+`.id = '`+id+`' order by arrival asc, departure`;
    connection.query(que, function(err, rows, fields) {
        if(rows.length != 0) {
            for(i=0;i<rows.length; i++) {
                res.write(`
                     <tr>
                        <td>`+rows[i].contact_person+`</td>
                        <td>`+ new String(rows[i].arrival).slice(3, 15) + `</td>
                        <td>`+ new String(rows[i].departure).slice(3, 15) + `</td>
                        <td><a type="submit" class="btn btn-info btn-sm btn-fill pull-left" href="/viewDetails?id=`+rows[i].res_id+`">View</a></td>
                     </tr>
                  `);
            }
        }else {
         res.write(`
               <tr>
                  <td colspan="4">No Reservations</td>
               </tr>
            `);
        }

        res.end();

    }); 
});



app.get('/getregistrations', function(req, res) {
    if (sess == undefined || sess.username == undefined) {
        res.redirect("/pages?id=3");
        return false;
    }
    var url = require("url");
    var params = url.parse(req.url, true).query;
    var id = params.id;
    var resid = params.resid;
    var type = params.type;

    if(id == undefined || id == "") {
        res.redirect("/pages?id=4");
        return false;
    }
    
    var connection = mysql.createConnection({
        host: currentHost,
        user: dbuser,
        password: dbpass,
        database: currentDB,
    });
    connection.connect();
    var que = `SELECT *, registrations.id as res_id FROM `+type+` inner join registered_facilities on registered_facilities.fac_id = `+type+`.id and registered_facilities.fac_type = '`+type+`' inner join registrations on registrations.id = registered_facilities.registration_id where `+type+`.id = '`+id+`' order by arrival asc, departure`;
    connection.query(que, function(err, rows, fields) {
        if(rows.length != 0) {
            for(i=0;i<rows.length; i++) {
                res.write(`
                        <tr>
                            <td>`+rows[i].name+`</td>
                            <td>`+ new String(rows[i].arrival).slice(3, 15) + `</td>
                            <td>`+ new String(rows[i].departure).slice(3, 15) + `</td>
                            <td><a type="submit" class="btn btn-info btn-sm btn-fill pull-left" href="/viewRegDetails?id=`+rows[i].res_id+`">View</a></td>
                        </tr>
                    `);
            }
        }else {
            res.write(`
                    <tr>
                        <td colspan="4">No Registrations</td>
                    </tr>
                `);
        }

        res.end();

    }); 
});