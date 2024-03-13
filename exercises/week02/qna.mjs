/*Goal: managing a simple data structure as an array of objects.

Using JavaScript objects and functional programming methods, manage objects that contain information about a question and their answers.

Each answer will contain:

Response (text)
Respondent username (unique)
Score (integer number, positive or negative)
Date
Define a constructor function Answer to create one or more answers.

A question, instead, is made of:

Question (text)
Questioner username (unique)
Date
List of answers
Define a constructor function Question to represent a question. Implement the following methods to manipulate its answers:

add(answer) // pass a fully-constructed Answer object
find(username) // returns all the Answers of a given person
afterDate(date) // returns an array of Answers after the given date
listByDate() // returns an array of Answers, sorted by increasing date
listByScore() // idem, by decreasing score
Create an instance of Question with at least four Answers in it.*/ 

import dayjs from 'dayjs';

function Answer(text, username, date, score=0){ //score = 0 is to set a default value (if no score is passed)
    this.text = text;                           // to call the function correctly we have to move score to the bottom
    this.username = username;
    this.score = score;
    this.date = dayjs(date);

    this.toString = () => {
        return `\n${this.username} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
    }
}

function Question(text, username, date){
    this.text = text;
    this.username = username;
    this.date = dayjs(date);
    this.answers = [];

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

const question = new Question('Is JS better than Python?', 'Luigi De Russis', '2024-02-27');

const firstAnswer = new Answer ('Yes', 'Luca Mannella','2024-02-28',-10);
const secondAnswer = new Answer ('Not in a million year', 'Guido van Rossum','2024-03-01',5);
const thirdAnswer = new Answer ('No', 'Albert Einstein','2024-03-11');
const fourthAnswer = new Answer ('I don\'t know', 'Luca Mannella','2024-03-10');

question.add(firstAnswer);
question.add(secondAnswer);
question.add(thirdAnswer);
question.add(fourthAnswer);

const answersByLuca = question.find('Luca Mannella');

console.log(question);
console.log('Answers by Luca: ' + answersByLuca); // if we concatenate answersByLuca with a string it tries to convert it to a string, if a toString() method exists, it's automatically called
console.log(question.listByDate());
console.log(question.listByScore());
console.log(question.afterDate('2024-02-29'));
