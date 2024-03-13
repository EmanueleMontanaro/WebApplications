/*Goal: basic handling of JavaScript arrays

Develop a small JavaScript program to manage the scores given to your user in a question-and-answer website (e.g., StackOverflow). Scores are integer numbers, and they may be negative. You should:

Define an array with all the scores you received in chronological order. For the moment:
Embed the scores directly in the source code.
Ignore the question, answer, and date that generated the score.
Duplicate the array, but:
Eliminate all negative scores (call NN the number of negative scores that are deleted).
Eliminate the two lowest-ranking scores.
Add NN+2 new scores, at the end of the array, with a value equal to the (rounded) average of the existing scores.
Print both arrays, comparing the scores before and after the "improvement," and showing the averages in both cases.*/

'use strict';

const scores = [20, -5, -1, 100, -3, 30, 50];
const betterScores = []; //Defining arrays

for(const s of scores){
    if(s >= 0)
        betterScores.push(s);
} //Putting positive scores in the result array

const NN = scores.length - betterScores.length; //Calculating NN

//Use of function .min() -- See documentation

/*
let minScore = Math.min(...betterScores); //finds minimum score, wants list of elements, not array
let index = betterScores.indexOf(minScore); //finds index of minimum score
betterScores.splice(index, 1); //removes n elements starting from index

minScore = Math.min(...betterScores);
index = betterScores.indexOf(minScore);
betterScores.splice(index, 1);
*/

//Use of function .sort() -- See documentation

betterScores.sort((a,b)=> a-b); //Defining a function that can be used only in these pharentesis through arrow function
betterScores.shift();
betterScores.shift(); //Using a new pop method from head.

let avg = 0;

for(const s of betterScores){
    avg += s;
}

avg /= betterScores.length;
avg = Math.round(avg);

for(let s = 0; s < NN+2; s++){
    betterScores.push(avg);
}

console.log(scores);
console.log(betterScores);