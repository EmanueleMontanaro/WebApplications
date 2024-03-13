'use strict';
/* Ways to define functions:

function do(params){
    //Do something
}

const fn = function(params) {
    //Do something
}

const fn = function do(params){
    //Do something
}

const fn = (params) => {
    //Do something
}
*/

//Construction functions

function Movie(title,genre,duration,director){
    this.title = title;
    this.genre = genre;
    this.duration = duration;
    this.director = director;
    this.isLong = () => this.duration > 120; //Arrow function to define a method to check duration above 120
}

let titanic = new Movie('Titanic','Drama',200,'Cameron');
console.log(titanic.isLong());
