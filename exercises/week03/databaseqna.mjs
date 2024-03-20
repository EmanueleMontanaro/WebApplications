/*Goal: interacting with a database while experimenting with async code.

Update the previous "Q&A" exercise to use a database.

Manage a list of objects that include information about some questions and their answers. 
The stored information is similar to the previous exercise, with an additional id for questions/answers and the user's email as their username.*/ 
import dayjs from 'dayjs';
import sqlite from 'sqlite3';

const db = new sqlite.Database('questions.sqlite', (err) => { if (err) throw err;});

function Answer(id, text, email, date, score=0){
    this.id = id
    this.text = text;           
    this.email = email;
    this.date = dayjs(date);
    this.score = score;

    this.getID = () => {
        const sql = 'SELECT id FROM user WHERE user.email = ?';
        return db.get(sql,[this.email],(err,row) => {
            if (err) throw err;
            else return row;
        });
    }

    this.toString = () => {
        return `\n${this.username} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
    }
}

function Question(id, text, email, date){
    this.id = id;
    this.text = text;
    this.email = email;
    this.date = dayjs(date);

    this.getID = () => {
        const sql = 'SELECT id FROM user WHERE user.email = ?';
        return db.get(sql,[this.email],(err,row) => {
            if (err) throw err;
            else return row;
        });
    }

    this.addAnswer = (answer) => {
        const sql = 'INSERT INTO answer VALUES (?,?,?,?,?,?)';
        db.run(sql,[answer.id, answer.text, answer.getID, answer.date.format('YYYY-MM-DD'), answer.score, this.id], function (err) {
            if (err) throw err;
            else console.log(this.changes);
        });
    }

    this.getAnswers = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT answer.id, text, user.email, date, score FROM answer, user WHERE answer.questionId=? AND answer.authorId = user.id';
            db.all(sql,[this.id], (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    const answers = rows.map((ans) => { 
                        return new Answer(ans.id, ans.text, ans.email, ans.date, ans.score);
                    });
                    resolve(answers);
                }
            })
        });
    }

    this.getTop = (num) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM answer WHERE id = ?';
            db.all(sql,[this.id],(err,rows) => {
                if (err) reject(err);
                else{
                    const results = rows.sort((a,b) => (b.score - a.score));
                    resolve(results.slice(0,num));
                }
            })
        })
    }
}

function QuestionList(){

    this.addQuestion = (question) => {
        const sql = 'INSERT INTO question VALUES (?,?,?,?)';
        db.run(sql,[question.id, question.text, question.getID, question.date.format('YYYY-MM-DD')], function (err) {
            if (err) throw err;
            else console.log(this.changes);
        });
    }

    this.getQuestion = (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM question WHERE question.id = ?';
            db.get(sql,[id],(err,row) => {
                if (err) reject(err);
                else{
                    resolve(row);
                }
            })
        })
    }

    this.afterDate = (date) => {
        date = dayjs(date);
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM question';
            db.all(sql,[],(err, rows) => {
                if (err) reject(err);
                else{
                    const results = rows.filter(a => (a.date).isAfter(date));
                    resolve(results);
                }
            })
        })
    }
}

async function main() {
    const sql = 'DELETE FROM answer WHERE id = 5';
    db.run(sql,[], function (err) {
        if (err) throw err;
    })
    let question = new Question(3,'Does this program work?','luigi.derussis@polito.it','2024-03-19');
    let answer = new Answer(5, 'I hope so', 'luca.mannella@polito.it','2024-03-19',3);
    question.addAnswer(answer);
    question.getAnswers().then(getAnswer => {
        console.log("getAnswers:");
        console.log(getAnswer);
    });
    const result1= await question.getAnswers();
    question.getTop(2).then(getTop => {
        console.log("getTop:");
        console.log(getTop);
    });
    const result2 = await question.getTop(2);
}



main();
