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
const { createHash, scryptSync, randomBytes } = require('crypto');




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

const client = new Pool(config);

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
app.get("/student-dashboard", function(req, res) {
    res.render("student-dashboard");
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
    if (req.body.type == 'Student') {
        var type_access = '3';
    }
    if (req.body.type == 'Professor') {
        var type_access = '2';
    } else {
        var type_access = '1';
    }
    console.log(type);

    //const date = date();
    // const type_access = '';

    const result = await client.query("INSERT INTO public.login (fname, lname, email,password, salt,access,type, start-date) VALUES ($1, $2, $3, $4, $5,$6,$7,$8) RETURNING *", [firstName, lastName, email, hashedPassword, salt, type_access, type, start_date]).then(results_insert => {



    });
    // const { firstName, lastName, email, password, course, type } = req.body;
    // console.log(req.body.firstName);

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