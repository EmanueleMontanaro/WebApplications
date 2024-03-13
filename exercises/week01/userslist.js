/*Goal: basic handling of JavaScript strings

Develop a small JS program to manage the list of users in a Q&A website.

Define the names of users as a comma-separated list.
For instance: "Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Luca Pezzolla"
Parse the string and create an array containing one name per array position.
Beware: no extra spaces should be present.
Create a second array by computing the acronyms of the people as the initial letters of the name. Acronyms should be in all-capital letters.
For example, Luigi De Russis -> LDR.
Print the resulting list of acronyms and the full names.
Extra: in alphabetical order of acronym.*/

'use strict';

let list = "Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Luca Pezzolla";

let array = list.split(', ');

let result = "";
let ret = [];

for(let person of array){
    for(let letter of person){
        if(letter === letter.toUpperCase() && letter !== " "){
            result+=letter;
        }
    }
    ret.push(result);
    result="";
}
console.log(array);
console.log(ret);

let sortRet = ret.sort((a,b)=>a.charCodeAt(0)-b.charCodeAt(0));

console.log(sortRet);

