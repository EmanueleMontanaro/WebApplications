import sqlite from 'sqlite3'
const db = new sqlite.Database('questions.sqlite', (err) => { if (err) throw err;});

let sql = "SELECT * FROM answer";
let results = [];
db.all(sql, [], (err,rows) => { //first variable contains error -> good practice!
    if(err) throw err;
    for (let row of rows){
        console.log(row);
    }
}); //this works

for (let r of results)
    console.log(r);

db.all(sql, [], (err,rows) => { //first variable contains error -> good practice!
    if(err) throw err;
    for (let row of rows){
        results.push(row);
    }
});

for (let r of results)
    console.log(r); //this doesn't work because the asynchronous program doesn't make it on time to fill results

//to make it run
/* db.all(sql, [], (err,rows) => { //first variable contains error -> good practice!
    if(err) throw err;
    for (let row of rows){
        db.run(...);
    }
}); */