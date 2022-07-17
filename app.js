const env = process.env.NODE_ENV || "development"; // for app.js to connect to postgresQL
const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = 5000;
const path = require("path");
const config = require("./config.js")[env];
const Pool = require("pg").Pool;
const bodyParser = require("body-parser");
const { count } = require("console");
//const bodyParser = require("body-parser");
const { createHash, scryptSync, randomBytes } = require('crypto');
const { clearScreenDown } = require("readline");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
require('dotenv').config();
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');



//set view engine to use ejs templates
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded());

//use router for articles   
// app.use("/articles", articleRouter);

// static file directory
app.use(express.static(path.join(__dirname, "public")));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.urlencoded());
//cookie
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new Pool(config);
// variable initialization
error = '';
color = '';


// session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));


//route for index page
app.get("/", function(req, res) {
    res.render("index");
});
app.get("/login_student", function(req, res) {
    //  res.render('login', { type: Student });
    //console.log('jfjkgv');
    res.render('login', { type: 'Student' });
});
app.get("/login_Professor", function(req, res) {
    res.render('login', { type: 'Professor' });
});
app.get("/login_Admin", function(req, res) {
    res.render('login', { type: 'Admin' });
});
app.get("/register_Student", function(req, res) {
    res.render("register", { type: 'Student' });
});
app.get("/register_professor", function(req, res) {
    res.render("register", { type: 'Professor' });
});
app.get("/register_admin", function(req, res) {
    res.render("register", { type: 'Admin' });
});
app.get("/Student-dashboard", function(req, res) {
    if (req.cookies.session_id) {
        const user_id = cryptr.decrypt(req.cookies.user_id);
        res.render("Student-dashboard", { type: req.cookies.type, id: user_id });
    } else {

        res.render("index");
    }


});
app.get("/Professor-dashboard", function(req, res) {
    if (req.cookies.session_id) {
        const user_id = cryptr.decrypt(req.cookies.user_id);
        res.render("Professor-dashboard", { type: req.cookies.type, id: user_id });
    } else {

        res.render("index");
    }


});
app.get("/Admin-dashboard", function(req, res) {
    if (req.cookies.session_id) {
        const user_id = cryptr.decrypt(req.cookies.user_id);
        res.render("Admin-dashboard", { type: req.cookies.type, id: user_id });
    } else {

        res.render("index");
    }


});
app.get("/add-job", function(req, res) {
    res.render("add-job");
});
// create hashing function
function hash(input) {
    return createHash('sha256').update(input).digest('hex');
}





// register user function

app.post("/register", async(req, res, next) => {
    const pool = new Pool(config);
    const client = await pool.connect();
    const { firstName, lastName, email, Department, course, confirm_password, type } = req.body;
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = hash(confirm_password + salt);
    // current date
    // adjust 0 before single digit date
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    const start_date = year + "-" + month + "-" + date;

    //console.log(type_access);
    if (req.body.confirm_password == req.body.password) {



        if (req.body.type == 'Student') {
            var type_access = '3';


            await client.query("SELECT * FROM public.login where email=$1 and type=$2", [email, type]).then(results => {
                if (results.rowCount >= 1) {
                    res.render("register", { type: 'Student', error: 'Student Already Register.Please <a class="text-uppercase anchor-magenta" href="/login_student" name="signupBtn">Login</a>', color: 'red' });


                } else {

                    client.query("INSERT INTO public.login (fname, lname, email,password, salt,access,type, start_date, typebyadmin,department,course) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11) RETURNING *", [firstName, lastName, email, hashedPassword, salt, type_access, type, start_date, 'S', Department, course]).then(results_insert => {
                        //console.log(results_insert);
                        res.render("register", { type: 'Student', error: 'User Successfully Register. Please <a class="text-uppercase anchor-magenta" href="/login_student" name="signupBtn">Login</a> ', color: 'green' });
                    });


                }

            });
        }
        if (req.body.type == 'Professor') {
            var type_access = '2';


            await client.query("SELECT * FROM public.login where email=$1 and type=$2", [email, type]).then(results => {
                if (results.rowCount >= 1) {
                    res.render("register", { type: 'Professor', error: 'User Already Register.Please <a class="text-uppercase anchor-magenta" href="/login_Professor" name="signupBtn">Login</a>', color: 'red' });


                } else {

                    client.query("INSERT INTO public.login (fname, lname, email,password, salt,access,type, start_date, typebyadmin,department) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10) RETURNING *", [firstName, lastName, email, hashedPassword, salt, type_access, type, start_date, 'N', Department]).then(results_insert => {
                        //console.log(results_insert);
                        res.render("register", { type: 'Professor', error: 'Successfully Register. Please <a class="text-uppercase anchor-magenta" href="/login_Professor" name="signupBtn">Login</a> ', color: 'green' });
                    });


                }

            });


        }
        if (req.body.type == 'Admin') {
            var type_access = '1';
            await client.query("SELECT * FROM public.login where email=$1 and type=$2", [email, type]).then(results => {
                if (results.rowCount >= 1) {
                    res.render("register", { type: 'Admin', error: 'User Already Register.Please <a class="text-uppercase anchor-magenta" href="/login_Admin" name="signupBtn">Login</a> ', color: 'red' });


                } else {

                    client.query("INSERT INTO public.login (fname, lname, email,password, salt,access,type, start_date, typebyadmin,department) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10) RETURNING *", [firstName, lastName, email, hashedPassword, salt, type_access, type, start_date, 'N', Department]).then(results_insert => {
                        //console.log(results_insert);
                        res.render("register", { type: 'Admin', error: 'Successfully Register. Please <a class="text-uppercase anchor-magenta" href="/login_Admin" name="signupBtn">Login</a> ', color: 'green' });
                    });

                }

            });



        }
        // const { firstName, lastName, email, password, course, type } = req.body;
        // console.log(req.body.firstName);
    } else {

        res.render("register", { type: req.body.type, error: 'Password Does Not match. Please Try Again  ', color: 'red' });

    }
});




// Login User Function 

app.post("/login", async(req, res, next) => {

    const pool = new Pool(config);
    const client = await pool.connect();
    const { email, password, type } = req.body;

    await client.query("SELECT * FROM public.login where email=$1 and type=$2", [email, type]).then(results => {
        // console.log(results.rows);
        const get_salt = results.rows[0].salt;
        const hashedPassword_c = hash(password + get_salt);
        client.query("SELECT * FROM public.login where email=$1 and type=$2 and password=$3", [email, type, hashedPassword_c]).then(results_login => {
            if (results_login.rows[0].typebyadmin == 'S') {
                sess = req.session;
                sess.id = req.session.id;
                sess.type = req.body.type;
                encryptedString = cryptr.encrypt(results_login.rows[0].id);

                let session_id1 = res.cookie('session_id', sess.id, { maxAge: 900000, secure: true, httpOnly: true });
                let write_id = res.cookie('user_id', encryptedString, { maxAge: 900000, secure: true, httpOnly: true });
                let type = res.cookie('type', req.body.type, { maxAge: 900000, secure: true, httpOnly: true });
                res.render("Student-dashboard", { type: req.body.type, id: results_login.rows[0].id });
            }
            if (results_login.rows[0].typebyadmin == 'P') {
                sess = req.session;
                sess.id = req.session.id;
                encryptedString = cryptr.encrypt(results_login.rows[0].id);

                let session_id1 = res.cookie('session_id', sess.id, { maxAge: 900000, secure: true, httpOnly: true });
                let write_id = res.cookie('user_id', encryptedString, { maxAge: 900000, secure: true, httpOnly: true });
                let type = res.cookie('type', req.body.type, { maxAge: 900000, secure: true, httpOnly: true });
                res.render("Professor-dashboard", { type: req.body.type, id: results_login.rows[0].id });
            }
            if (results_login.rows[0].typebyadmin == 'A') {
                sess = req.session;
                sess.id = req.session.id;
                encryptedString = cryptr.encrypt(results_login.rows[0].id);

                let session_id1 = res.cookie('session_id', sess.id, { maxAge: 900000, secure: true, httpOnly: true });
                let write_id = res.cookie('user_id', encryptedString, { maxAge: 900000, secure: true, httpOnly: true });
                let type = res.cookie('type', req.body.type, { maxAge: 900000, secure: true, httpOnly: true });
                res.render("Admin-dashboard", { type: req.body.type, id: results_login.rows[0].id });
            }
            if (results_login.rows[0].typebyadmin == 'N') {

                res.render("login", { type: req.body.type, error: 'Admin does not give permission to login as a `' + req.body.type + '`. Please wait for admin permission ', color: '#D61791' });
            }


        }).catch(err => {
            // console.log('email or username is not correct')
            res.setHeader("Content-Security-Policy", "script-src 'none'");
            res.render("login", { type: req.body.type, error: 'Email ID or Password is wrong', color: 'red' });

        });
        //console.log(hashedPassword_c);

    });

});







app.post("/dept", async(req, res, next) => {
    //console.log('kjgk');
    const pool = new Pool(config);
    const client = await pool.connect();
    await client.query("SELECT id, dept_full_name, dept, s_date	FROM public.department;").then(results => {
        res.send(results.rows);


    });
});
app.post("/course", async(req, res, next) => {

    //  dept_id = req.body.value;
    const pool = new Pool(config);
    const client = await pool.connect();
    // await client.query("SELECT id,course_full_name, couse, level FROM public.course where dept_id=$1", [dept_id]).then(results1 => {

    await client.query("SELECT id,course_full_name, couse, level FROM public.course").then(results1 => {
        // console.log(results1.rows);
        res.send(results1.rows);


    });

});



//course




app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});

module.exports = app // for testing