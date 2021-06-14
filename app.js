const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const port = process.env.PORT || 5000
app.use(bodyParser.json());

const cors=require('cors');
app.use(cors({origin: ['http://localhost:8100','http://localhost']}));


//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aremproject',
    multipleStatements: true
    });
//Listen on environment port or 5000
mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

app.listen(port, () => console.log(`Listening on port ${port}..`));

app.get('/zapproducts' , (req, res) => {
   
    mysqlConnection.query('SELECT * FROM product where type = 1', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

    app.get('/fiammproducts' , (req, res) => {
   
        mysqlConnection.query('SELECT * FROM product where type = 2', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })
        } );
app.post('/addRequest', (req, res) => {
   
        const params = req.body
        mysqlConnection.query('INSERT INTO request SET ?', params, (err, rows) => {
        if (!err) {
            res.send(params)
        } else {
            console.log(err)
        }
        
        console.log('The data from table are \n', rows)

        })
    
});

app.get('/getUser/:username/:password' , (req, res) => {
   
    mysqlConnection.query('SELECT * FROM user where username = ? and password = ?',[req.params.username,req.params.password], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log("user not found");
    })
    } );
    app.get('/getRequests' , (req, res) => {
   
        mysqlConnection.query('SELECT * FROM Request', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log("not found");
        })
        } );

    app.get('/getTelbyId/:id' , (req, res) => {
   
            mysqlConnection.query('SELECT tel FROM Request where id=?',[req.params.id], (err, rows, fields) => {
            if (!err)
            res.send(rows);
            else
            console.log("not found");
            })
            } );

    app.post('/updateRequest/:id' , (req, res) => {
   
                mysqlConnection.query('UPDATE Request SET state=1 where id=?',[req.params.id], (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log("not found");
                })
                } );

                app.post('/addUser', (req, res) => {
   
                    const params = req.body
                    mysqlConnection.query('INSERT INTO user SET ?', params, (err, rows) => {
                    if (!err) {
                        res.send(params)
                    } else {
                        console.log(err)
                    }
                    
                    console.log('The data from table are \n', rows)
            
                    })
                
            });
            app.get('/getRolebyId/:id' , (req, res) => {
   
                mysqlConnection.query('SELECT role FROM user where id=?',[req.params.id], (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log("not found");
                })
                } );