'use strict'

const movie = {
    title: 'Titanic',
    genre: 'Drama',
    durtion: 200
}

console.log(movie);

console.log(movie['title']);
console.log(movie.title);

movie.director = 'Cameron';
delete movie.genre; //Dynamism of objects

console.log(movie);

movie['title']; //Property named title
movie.title; //Same
const title = 'director';
console.log(movie[title]); //Prints Cameron

for( const prop in movie){
    console.log(`${prop} is ${movie[prop]}`); //NEEDS BACKTICK `
} //Prints all properties

const titanic = Object.assign({},movie); //This is how we copy objects. Creates a shallow copy

Object.assign(movie, {budget: '200 millions USD'}); //Merging properties using Object.assign()
console.log(movie);

const improvedMovie = Object.assign({}, movie, {cast: 'Leonardo Di Caprio'}); //cast and movie will both be in the improvedMovie object
console.log(improvedMovie);

const titanic2 = {...movie}; //Same as line 28