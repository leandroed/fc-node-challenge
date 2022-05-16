const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const create = `create table if not exists people(name varchar(255))`
connection.query(create)

const sql = `INSERT INTO people(name) values('Wesley')`
connection.query(sql)

app.get('/', (req,res) => {
    var content = '<h1>Full Cycle Rocks!</h1>'
    var selectQuery = 'select name from people'
    connection.query(selectQuery, function(err, response, result) {
        if(err) throw err;

        Object.keys(response).forEach(function(key) {
            var row = response[key];
            content = `${content} <p>${row.name}</p>`
        })

        res.send(content)
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})