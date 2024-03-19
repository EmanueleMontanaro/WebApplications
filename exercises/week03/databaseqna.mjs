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

    this.toString = () => {
        return `\n${this.username} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
    }
}

function Question(id, text, email, date){
    this.id = id;
    this.text = text;
    this.email = email;
    this.date = dayjs(date);

    this.getAnswers = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT answer.id, text, user.email, date, score FROM answer, user WHERE answer.questionId=? AND answer.authorId = user.id';
            db.all(sql,[this.id], (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    const answers = rows.map((ans) => { 
                        new Answer(ans.id, ans.text, ans.text, ans.email, ans.data, ans.score);
                    });
                    resolve(answers);
                }
            })
        });
    }

    this.add = (answer) => {
        this.answers.push(answer);
    }

    this.find = (username) => {
        return this.answers.filter(ans => ans.username === username);
    }

    this.afterDate = (date) => {
        return this.answers.filter(ans => ans.date.isAfter(dayjs(date)));
    }
    
    this.listByDate = () => {
        return [...this.answers].sort((a,b) => (a.date.isAfter(b.date) ? 1 : -1)); //using spread to copy the array and not modify permanently the original one
    }

    this.listByScore = () => {
        return [...this.answers].sort((a,b) => b.score-a.score);
    }
}

async function main() {
    let question = new Question(1,'','','');
    question.getAnswers().then(results => console.log(results));
    const results = await fake.getAnswers();
}

main();
