const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'youtube'
  });

connection.connect((err, res) => {
    if(err) {
        console.log("Error in Database");
    }
    console.log("Mysql Is Connected Successfully");
});


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req,res) => {
    res.render('index', {
        "title":"TheCodeRank Tutorial"
    })
});

app.get("/updatename", (req,res) => {
    res.render('updatename', {
        "title":"TheCodeRank Tutorial"
    })
});

app.post("/update", (req,res,next) => {
    let postUpdate = {name: req.body.Name, email: req.body.Email};
    let sql = "INSERT INTO youtube SET ?";
    connection.query(sql,postUpdate, (err,result) => {
        if(err) {
            console.log("Your Data not Submited due to some error in your value");
        }
        console.log("Your Data Successfully Submitted");
    })
    next()
})

app.get("/delete/:id", (req,res,next) => {
    let deleteid = req.params;
    let sql = `DELETE FROM youtube WHERE id = ${deleteid}`
    connection.query(sql,(err,result) => {
        if(err) {
            console.log("Error Your Data not Deleted");
        }
        console.log("Your Data Deleted Successfully");
        next()
    });
})

app.post("/updatedata", (req,res,next) => {
    let Name = req.body.Name;
    let Email = req.body.Email;
    let values = [Name, Email];
    let sql = "UPDATE youtube SET name = ? WHERE email = ?";
    connection.query(sql, values, (err,result) => {
        if(err) {
            console.log(err);
        }
        console.log("Your Data Succesffuly updated");
        next()
    });
})

app.listen(3000);