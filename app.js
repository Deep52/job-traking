const env = process.env.NODE_ENV || "development"; // for app.js to connect to postgresQL
const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = 5000;
const path = require("path");
const config = require("./config.js")[env];
const Pool = require("pg").Pool;
var bodyParser = require("body-parser");
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
//const formidable = require('formidable');
//const fs = require('fs');
const fileUpload = require('express-fileupload');
const download = require('download');
//const app = express();
const highPriority = new Pool({ max: 100 }); // for high-priority API calls
const lowPriority = new Pool({ max: 5 }); // for low-priority API calls

// default options
app.use(fileUpload());
//const path = require('path');

//const formidable = require("formidable");
//app = express();
//set view engine to use ejs templates
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
//app.use(express.json())
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
//app.use(express.bodyParser());
// parse application/json
//app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

//file upload
//app.post('/add_job', add_job);

const client = new Pool(config);
// variable initialization
error = '';
color = '';
records = '';

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
app.get("/add-department", function(req, res) {
    client.query("SELECT * FROM public.department   ORDER BY id DESC").then(records_DC => {
        const user_id = cryptr.decrypt(req.cookies.user_id);
        res.render("add-department", { type: req.cookies.type, id: user_id, records_dc: records_DC.rows, });

    });


});
app.get("/add-course", function(req, res) {
    client.query("SELECT * FROM public.course   ORDER BY id DESC").then(records_DC => {
        const user_id = cryptr.decrypt(req.cookies.user_id);
        res.render("add-course", { type: req.cookies.type, id: user_id, records_dc: records_DC.rows, });

    });

});

app.get("/Student-dashboard", function(req, res) {
    if (req.cookies.session_id) {
        link = __dirname + '/public/upload/';
        const user_id = cryptr.decrypt(req.cookies.user_id);
        client.query(`SELECT  *	FROM public.addjob where user_id='${user_id}' ORDER BY id DESC`).then(records => {
            // console.log(records);
            res.render("Student-dashboard", { type: req.cookies.type, id: user_id, records: records.rows, link: link });
        });
        //  res.render("Student-dashboard", { type: req.cookies.type, id: user_id });
    } else {

        res.redirect("/");
    }


});
app.get("/Professor-dashboard", function(req, res) {
    if (req.cookies.session_id) {
        const user_id = cryptr.decrypt(req.cookies.user_id);
        client.query(`SELECT * FROM public.login INNER JOIN public.addjob ON login.id = addjob.user_id where public.login.typebyadmin='S' ORDER BY public.addjob.create_date DESC`).then(records => {
            // console.log(records);
            link = __dirname + '/public/upload/';
            res.render("Professor-dashboard", { type: req.body.type, id: user_id, records: records.rows, link: link });
        });
        //link = __dirname + '/public/upload/';
        // res.render("Professor-dashboard", { type: req.cookies.type, id: user_id, link: link });
    } else {

        res.redirect("/");
    }


});
app.get("/Admin-dashboard", function(req, res) {
    if (req.cookies.session_id) {
        link = __dirname + '/public/upload/';
        client.query("SELECT * FROM public.login  where id !='23' ORDER BY start_date DESC").then(records => {
            const user_id = cryptr.decrypt(req.cookies.user_id);
            res.render("Admin-dashboard", { type: req.cookies.type, id: user_id, records: records.rows, link: link });
        });
    } else {

        res.redirect("/");
    }


});
app.get("/add-job", function(req, res) {
    if (req.cookies.session_id) {
        const user_id = cryptr.decrypt(req.cookies.user_id);

        res.render("add-job", { type: req.cookies.type, id: user_id });
    } else {

        res.redirect("/");
    }

});
// create hashing function
function hash(input) {
    return createHash('sha256').update(input).digest('hex');
}




app.post("/advance-search", async(req, res, next) => {
    const { advance_search, Weekly, Monthly } = req.body;
    if (Weekly == 'Weekly' && Monthly == 'Monthly') {
        client.query("SELECT * FROM public.login INNER JOIN  public.addjob ON login.id = addjob.user_id where public.login.typebyadmin='S' and   lower(login.fname) like $1 or public.login.typebyadmin='S' and   lower(login.course) like $1 or  public.login.typebyadmin='S' and   lower(login.lname) like $1 or public.login.typebyadmin='S' and   lower(login.email) like $1 or public.login.typebyadmin='S' and   lower(addjob.company_name) like $1 or public.login.typebyadmin='S' and   lower(addjob.job_tittle) like $1", [advance_search]).then(records => {
            // console.log(records);
            //for (let i = 0; i < records.rowCount; i++) {
            //  client.query(`SELECT * FROM public.reply_response where  job_id='${records.rows[i].id}' and count1='1'`).then(count1 => {
            //    console.log(records.rows.push(count1.rows));
            const user_id = cryptr.decrypt(req.cookies.user_id);
            //});
            link = __dirname + '/public/upload/';
            res.render("Professor-dashboard", { type: req.cookies.type, id: user_id, records: records.rows, link: link });
        });
    }
    if (Weekly != 'Weekly') {
        // console.log(Weekly);
        if (Weekly == '1') {

            const now = new Date();

            var oneweek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            tt = oneweek.split(T)
            console.log(tt[0]);

        }
    }
});

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

                    client.query("INSERT INTO public.login (fname, lname, email,password, salt,access,type, start_date, typebyadmin,department,course,admintype) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12) RETURNING *", [firstName, lastName, email, hashedPassword, salt, type_access, type, start_date, 'S', Department, course, 'NA']).then(results_insert => {
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

                    client.query("INSERT INTO public.login (fname, lname, email,password, salt,access,type, start_date, typebyadmin,department,admintype) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,£11) RETURNING *", [firstName, lastName, email, hashedPassword, salt, type_access, type, start_date, 'N', Department, 'GA']).then(results_insert => {
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

                    client.query("INSERT INTO public.login (fname, lname, email,password, salt,access,type, start_date, typebyadmin,department,admintype) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11) RETURNING *", [firstName, lastName, email, hashedPassword, salt, type_access, type, start_date, 'N', Department, 'GA']).then(results_insert => {
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
                client.query(`SELECT  *	FROM public.addjob where user_id='${results_login.rows[0].id}' ORDER BY id DESC`).then(records => {
                    // console.log(records);
                    link = __dirname + '/public/upload/';
                    res.render("Student-dashboard", { type: req.body.type, id: results_login.rows[0].id, records: records.rows, link: link });
                });
                // res.render("Student-dashboard", { type: req.body.type, id: results_login.rows[0].id });
            }

            if (results_login.rows[0].typebyadmin == 'P') {
                sess = req.session;
                sess.id = req.session.id;
                encryptedString = cryptr.encrypt(results_login.rows[0].id);
                var user_id = results_login.rows[0].id;
                link = __dirname + '/public/upload/';
                let session_id1 = res.cookie('session_id', sess.id, { maxAge: 900000, secure: true, httpOnly: true });
                let write_id = res.cookie('user_id', encryptedString, { maxAge: 900000, secure: true, httpOnly: true });
                let type = res.cookie('type', req.body.type, { maxAge: 900000, secure: true, httpOnly: true });
                // client.query(`SELECT * FROM public.login INNER JOIN public.addjob ON login.id = addjob.user_id where public.login.typebyadmin='S' ORDER BY public.addjob.create_date DESC`).then(records => {
                client.query(`SELECT * FROM public.login INNER JOIN  public.addjob ON login.id = addjob.user_id where public.login.typebyadmin='S' ORDER BY public.addjob.create_date DESC`).then(records => {
                    // console.log(records);
                    //for (let i = 0; i < records.rowCount; i++) {
                    //  client.query(`SELECT * FROM public.reply_response where  job_id='${records.rows[i].id}' and count1='1'`).then(count1 => {
                    //    console.log(records.rows.push(count1.rows));

                    //});
                    link = __dirname + '/public/upload/';
                    res.render("Professor-dashboard", { type: req.body.type, id: results_login.rows[0].id, records: records.rows, link: link });
                    //}





                });
                // res.render("Professor-dashboard", { type: req.body.type, id: results_login.rows[0].id, link: link });
            }
            if (results_login.rows[0].typebyadmin == 'A') {
                sess = req.session;
                sess.id = req.session.id;
                encryptedString = cryptr.encrypt(results_login.rows[0].id);
                link = __dirname + '/public/upload/';
                let session_id1 = res.cookie('session_id', sess.id, { maxAge: 900000, secure: true, httpOnly: true });
                let write_id = res.cookie('user_id', encryptedString, { maxAge: 900000, secure: true, httpOnly: true });
                let type = res.cookie('type', req.body.type, { maxAge: 900000, secure: true, httpOnly: true });
                client.query("SELECT * FROM public.login  where id !='23' ORDER BY start_date DESC").then(records => {
                    // console.log(record);
                    res.render("Admin-dashboard", { type: req.body.type, id: results_login.rows[0].id, records: records.rows, link: link });
                });


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

    }).catch(err => {
        // console.log('email or username is not correct')
        res.setHeader("Content-Security-Policy", "script-src 'none'");
        res.render("login", { type: req.body.type, error: 'Email ID or Password is wrong', color: 'red' });

    });
});



app.post("/accesbyadmin", async(req, res, next) => {
    const pool = new Pool(config);
    const client = await pool.connect();
    if (req.body.access == 'N' && req.body.type == 'Professor') {
        type_change = 'P';

    }
    if (req.body.access == 'P' && req.body.type == 'Professor') {
        type_change = 'N';

    }
    if (req.body.access == 'N' && req.body.type == 'Admin') {
        type_change = 'A';

    }
    if (req.body.access == 'A' && req.body.type == 'Admin') {
        type_change = 'N';

    }
    if (req.body.access == 'S' && req.body.type == 'Student') {
        type_change = 'N';

    }
    if (req.body.access == 'N' && req.body.type == 'Student') {
        type_change = 'S';

    }

    await client.query(`UPDATE public.login	SET typebyadmin='${type_change}'	WHERE id='${req.body.id}'`).then(update_access => {
        if (update_access.rowCount == '1') {
            client.query("SELECT * FROM public.login where id=$1", [req.body.id]).then(update_record => {

                res.send(update_record.rows);
                //console.log(update_record.rows);

            });

        }



    });
    //console.log(req.body);

});


// add job function 
app.post("/add-job", async(req, res, next) => {
    const pool = new Pool(config);
    const client = await pool.connect();
    type = req.cookies.type;
    // console.log(type);
    const user_id1 = cryptr.decrypt(req.cookies.user_id);
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    const start_date = year + "-" + month + "-" + date;
    const { company_name, title, qualified, failed_in, resume_upload, feedback, user_id } = req.body;
    // console.log(req.files.resume_upload.name);
    sampleFile = req.files.resume_upload;
    uploadPath = __dirname + '/public/upload/' + req.files.resume_upload.name;
    // console.log(uploadPath);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath);




    await client.query("INSERT INTO public.addjob(company_name, job_tittle, qualified,failed_in, resume_name,feedback,user_id, response, create_date) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9) RETURNING *", [company_name, title, qualified, failed_in, req.files.resume_upload.name, feedback, user_id1, 'N', start_date]).then(results_job => {

        res.setHeader("Content-Security-Policy", "script-src 'none'");

        res.render("add-job", { type: type, error: 'Your Job Successfully added', color: 'green' });

    }).catch(err => {
        // console.log('email or username is not correct')
        res.setHeader("Content-Security-Policy", "script-src 'none'");
        res.render("add-job", { type: type, error: 'Your Job Does Not Added. Please Try Again', color: 'red' });

    });




});

// delete job function
app.get('/job-delete/:id', function(req, res, next) {

    const job_id = req.params.id;
    if (req.cookies.session_id) {
        const client = new Pool(config);
        sess = req.session;
        client.query("DELETE FROM public.addjob WHERE id=$1", [job_id]).then(result => {
            res.setHeader("Content-Security-Policy", "script-src 'none'");

            const user_id = cryptr.decrypt(req.cookies.user_id);

            // res.render("Student-dashboard", { type: req.cookies.type, id: user_id });
            res.redirect("/Student-dashboard");
        });
    } else {
        res.redirect("/");
    }


});
// delete function of department

app.get('/delete-dept/:id', function(req, res, next) {
    const dept_id = req.params.id;
    if (req.cookies.session_id) {
        const client = new Pool(config);
        sess = req.session;
        client.query("DELETE FROM public.department WHERE id=$1", [dept_id]).then(result => {
            res.setHeader("Content-Security-Policy", "script-src 'none'");

            const user_id = cryptr.decrypt(req.cookies.user_id);

            // res.render("Student-dashboard", { type: req.cookies.type, id: user_id });
            res.redirect("/add-department");
        });
    } else {
        res.redirect("/");
    }



});
// delete function of course

app.get('/delete-course/:id', function(req, res, next) {
    const course_id = req.params.id;
    if (req.cookies.session_id) {
        const client = new Pool(config);
        sess = req.session;
        client.query("DELETE FROM public.course WHERE id=$1", [course_id]).then(result => {
            res.setHeader("Content-Security-Policy", "script-src 'none'");

            const user_id = cryptr.decrypt(req.cookies.user_id);

            // res.render("Student-dashboard", { type: req.cookies.type, id: user_id });
            res.redirect("/add-course");
        });
    } else {
        res.redirect("/");
    }



});


//edit job function
app.get('/job-edit/:id', function(req, res, next) {


    const job_id = req.params.id;
    if (req.cookies.session_id) {
        const client = new Pool(config);
        sess = req.session;

        client.query("SELECT * FROM public.addjob WHERE id=$1", [job_id]).then(records => {
            res.setHeader("Content-Security-Policy", "script-src 'none'");
            //console.log(records);
            const user_id = cryptr.decrypt(req.cookies.user_id);

            res.render("edit-job", { type: req.cookies.type, id: user_id, records: records.rows[0] });
            //res.redirect("/Student-dashboard");
        });
    } else {
        res.redirect("/");
    }



});
// update job function


app.post("/job-edit/update-job", async(req, res, next) => {
    const pool = new Pool(config);
    const client = await pool.connect();
    type = req.cookies.type;
    const { company_name, title, qualified, failed_in, resume_upload, feedback, user_id, id } = req.body;
    sampleFile = req.files.resume_upload;
    uploadPath = __dirname + '/public/upload/' + req.files.resume_upload.name;
    // console.log(uploadPath);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath);

    client.query(`UPDATE public.addjob	SET  company_name='${company_name}', job_tittle='${title}', qualified='${qualified}', failed_in='${failed_in}', resume_name='${req.files.resume_upload.name}', feedback='${feedback}', user_id='${user_id}'	WHERE id='${id}'`).then(records => {
        res.setHeader("Content-Security-Policy", "script-src 'none'");
        //console.log(records);
        const user_id = cryptr.decrypt(req.cookies.user_id);
        res.render("edit-job", { type: req.cookies.type, error: 'Update Job Successfully added', color: 'green' });

    }).catch(err => {
        // console.log('email or username is not correct')
        res.setHeader("Content-Security-Policy", "script-src 'none'");
        res.render("edit-job", { type: req.cookies.type, error: 'Update Does Not Successful. Please Try Again', color: 'red' });

    });
});


// popup
app.get('/popup/:name', function(req, res, next) {

    const name = req.params.name;
    res.download('./public/upload/' + req.params.name);



});
app.get('/job-view/:id', function(req, res, next) {
    const job_id = req.params.id;
    if (req.cookies.session_id) {
        const client = new Pool(config);
        sess = req.session;

        client.query("SELECT * FROM public.addjob WHERE id=$1", [job_id]).then(records => {
            res.setHeader("Content-Security-Policy", "script-src 'none'");
            //console.log(records);
            const user_id = cryptr.decrypt(req.cookies.user_id);
            client.query("SELECT * FROM public.reply_response WHERE job_id=$1 and user_id=$2", [job_id, user_id]).then(response => {
                //console.log(response.rows);
                res.render("view-job", { type: req.cookies.type, user_id: user_id, records: records.rows[0], color: 'green', responses: response.rows });
                // res.render("view-job", { type: req.cookies.type, user_id: user_id, records: records.rows[0] });
            });


            //res.redirect("/Student-dashboard");
        });
    } else {
        res.redirect("/");
    }

    //  res.render("view-job", { type: req.cookies.type });


});



app.get('/job-view-prof/:id', function(req, res, next) {
    const job_id = req.params.id;
    if (req.cookies.session_id) {
        const client = new Pool(config);
        sess = req.session;

        client.query("SELECT * FROM public.addjob WHERE id=$1", [job_id]).then(records => {
            res.setHeader("Content-Security-Policy", "script-src 'none'");
            //console.log(records);
            const user_id = cryptr.decrypt(req.cookies.user_id);
            client.query("SELECT * FROM public.reply_response WHERE job_id=$1 and user_id=$2", [job_id, user_id]).then(response => {
                //console.log(response.rows);
                res.render("view-job-prof", { type: req.cookies.type, user_id: user_id, records: records.rows[0], color: 'green', responses: response.rows });
                // res.render("view-job", { type: req.cookies.type, user_id: user_id, records: records.rows[0] });
            });


            //res.redirect("/Student-dashboard");
        });
    } else {
        res.redirect("/");
    }

    //  res.render("view-job", { type: req.cookies.type });


});


// student search function


app.post("/Student-search", async(req, res, next) => {
    //req.body.search

    client.query("SELECT * FROM public.addjob where lower(job_tittle) like $1 or lower(company_name) like $1 ", [req.body.search]).then(records => {
        res.setHeader("Content-Security-Policy", "script-src 'none'");
        //console.log(records);
        const user_id = cryptr.decrypt(req.cookies.user_id);

        res.render("Student-dashboard", { type: req.cookies.type, id: user_id, records: records.rows });
        //res.redirect("/Student-dashboard");
    });


});
app.post("/admin-search", async(req, res, next) => {
    search = req.body.search;

    client.query("SELECT * FROM public.login where  id !='23' and lower(email) like $1 OR id !='23' and lower(fname) like $1 OR id !='23' and lower(lname) like $1 ", [req.body.search]).then(records => {
        res.setHeader("Content-Security-Policy", "script-src 'none'");
        //console.log(records);
        const user_id = cryptr.decrypt(req.cookies.user_id);

        res.render("Admin-dashboard", { type: req.cookies.type, id: user_id, records: records.rows });
        //res.redirect("/Student-dashboard");
    });


});

app.post("/add-department", async(req, res, next) => {
    const { dept_full_name, dept } = req.body;
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    const start_date = year + "-" + month + "-" + date;
    const user_id = cryptr.decrypt(req.cookies.user_id);

    await client.query("INSERT INTO public.department(dept_full_name,dept,s_date) VALUES ($1, $2, $3) RETURNING *", [dept_full_name, dept, start_date]).then(results_job => {

        client.query("SELECT * FROM public.department   ORDER BY id DESC").then(records_DC => {
            const user_id = cryptr.decrypt(req.cookies.user_id);
            res.render("add-department", { type: req.cookies.type, error: 'Successfully Add Department', id: user_id, records_dc: records_DC.rows, color: 'green' });

        });

        //  res.render("add-department", { type: req.cookies.type, error: 'Successfully Add Department', id: user_id, color: 'green' });


    }).catch(err => {
        // console.log('email or username is not correct')
        client.query("SELECT * FROM public.department   ORDER BY id DESC").then(records_DC => {
            const user_id = cryptr.decrypt(req.cookies.user_id);
            res.setHeader("Content-Security-Policy", "script-src 'none'");
            res.render("add-department", { type: req.cookies.type, error: 'Successfully Add Department', error: 'Department Name Do not Added. Please Try Again ', id: user_id, records_dc: records_DC.rows, color: 'red', });

        });

        //res.render("add-department", { type: req.body.type, error: 'Department Name Do not Added. Please Try Again ', id: user_id, color: 'red' });

    });


});
// add course function
app.post("/add-course", async(req, res, next) => {
    const { Department, full_name_course, sort_name_course, course_catalog } = req.body;
    const user_id = cryptr.decrypt(req.cookies.user_id);
    //console.log(req.body);
    await client.query("INSERT INTO public.course(course_full_name,couse,dept_id,level) VALUES ($1, $2, $3,$4) RETURNING *", [full_name_course, sort_name_course, Department, course_catalog]).then(results_job => {
        client.query("SELECT * FROM public.course   ORDER BY id DESC").then(records_DC => {
            const user_id = cryptr.decrypt(req.cookies.user_id);
            res.render("add-course", { type: req.cookies.type, error: 'Successfully Add Course', id: user_id, records_dc: records_DC.rows, color: 'green' });

        });






    }).catch(err => {
        // console.log('email or username is not correct')
        res.setHeader("Content-Security-Policy", "script-src 'none'");
        client.query("SELECT * FROM public.course   ORDER BY id DESC").then(records_DC => {
            const user_id = cryptr.decrypt(req.cookies.user_id);
            res.render("add-course", { type: req.cookies.type, error: 'Course Does not Added. Please Try Again ', id: user_id, records_dc: records_DC.rows, color: 'red' });

        });


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
// response by student


app.post("/replybystudent", async(req, res, next) => {

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    const date_r = year + "-" + month + "-" + date;



    var time1 = date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds();


    const pool = new Pool(config);
    const client = await pool.connect();
    var { job_id, student_id, Reply_by_student } = req.body;
    await client.query(`SELECT * FROM public.login  where id ='${student_id}'`).then(records_s => {
        var student_name = records_s.rows[0].fname + records_s.rows[0].lname;
        // console.log(student_name);
        // console.log(time1);
        var user_id = cryptr.decrypt(req.cookies.user_id);
        //res.render("add-course", { type: req.cookies.type, error: 'Successfully Add Course', id: user_id, records_dc: records_DC.rows, color: 'green' });
        var time = date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds
        client.query("INSERT INTO public.reply_response(reply_by_student,user_id, job_id, user_name,date,time_r,count1) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *", [Reply_by_student, student_id, job_id, student_name, date_r, time1, '1']).then(results_job => {
            client.query("SELECT * FROM public.addjob WHERE id=$1", [job_id]).then(records_s => {
                client.query("SELECT * FROM public.reply_response WHERE job_id=$1 and user_id=$2", [job_id, student_id]).then(response => {
                    //console.log(response.rows);
                    res.render("view-job", { type: req.cookies.type, error: 'Successfully Send Message  ', user_id: student_id, records: records_s.rows[0], color: 'green', responses: response.rows });
                });
            });
        });

    });


});

// reply by professor
app.post("/replybyprofessor", async(req, res, next) => {

    var { job_id, professor_id, reply_by_professor } = req.body;
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    const date_r = year + "-" + month + "-" + date;



    var time1 = date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds();
    await client.query(`SELECT * FROM public.login  where id ='${professor_id}'`).then(records_s => {
        var student_name = records_s.rows[0].fname + records_s.rows[0].lname;

        client.query("SELECT * FROM public.addjob WHERE id=$1 and user_id=$2", [job_id, professor_id]).then(response1 => {
            if (response1.rows[0].response == 'N') {
                client.query(`UPDATE public.addjob	SET  response_feedback='${reply_by_professor}', response='Y'	WHERE id='${job_id}' and user_id='${professor_id}'`).then(records => {

                    client.query("SELECT * FROM public.addjob WHERE id=$1", [job_id]).then(records_s => {
                        client.query("SELECT * FROM public.reply_response WHERE job_id=$1 and user_id=$2", [job_id, professor_id]).then(response => {
                            //console.log(response.rows);
                            res.render("view-job-prof", { type: req.cookies.type, error: 'Successfully Send Message  ', user_id: professor_id, records: records_s.rows[0], color: 'green', responses: response.rows });
                        });
                    });

                });

            } else {
                client.query("INSERT INTO public.reply_response(reply_by_professor,user_id, job_id, user_name,date,time_r,count2) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *", [reply_by_professor, professor_id, job_id, student_name, date_r, time1, '1']).then(results_job => {
                    client.query("SELECT * FROM public.addjob WHERE id=$1", [job_id]).then(records_s => {
                        client.query("SELECT * FROM public.reply_response WHERE job_id=$1 and user_id=$2", [job_id, professor_id]).then(response => {
                            //console.log(response.rows);
                            res.render("view-job-prof", { type: req.cookies.type, error: 'Successfully Send Message  ', user_id: professor_id, records: records_s.rows[0], color: 'green', responses: response.rows });
                        });
                    });
                });

            }
        });

    });


});
//course




app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});

module.exports = app // for testing