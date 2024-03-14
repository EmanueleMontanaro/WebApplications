import dayjs from 'dayjs';

function Movie(id,title,userid = 1,favorites=false,rating = 0,date = null){
    this.id = id;
    this.title = title;
    this.userid = userid;
    this.favorites = favorites;
    this.date = date;
    if(dayjs(date).isValid()) this.date = dayjs(date).format('YYYY-MM-DD');
    this.rating = rating;

    this.toString = () => {
        console.log(`Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorites}, Watch date: ${this.date}, Score: ${this.rating}`);
    }
}

function FilmLibrary(){
    this.films = [];

    this.addNewFilm = (film) => {
        this.films.push(film);
    }

    this.printLibrary = () => {
            this.films.forEach(film => film.toString());
    }

    this.sortByDate = () => {
        [...this.films].filter(film => film.date != null).sort((a,b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1)).forEach(film => film.toString());
        [...this.films].filter(film => film.date == null).forEach(film => film.toString());
        
    }

    this.deleteFilm = (id) => {
        this.films = this.films.filter(film => film.id !== id);
        console.log(`Deleted film with id ${id}`);
    }

    this.resetWatchedFilms = () => {
        this.films.filter(film => film.date !== null).forEach(film => film.date = null);
        console.log('Resetted all dates');
    }

    this.getRated = () => {
        [...this.films].filter(film => film.rating != 0).sort((a,b) => b.rating-a.rating).forEach(film => film.toString());
    }
}

const firstMovie = new Movie(1,'Pulp Fiction',1,true,5,"2024-03-10");
const secondMovie = new Movie(2,'21 Grams',1,true,4,"2024-03-17");
const thirdMovie = new Movie(3,'Star Wars',1,false);
const fourthMovie = new Movie(4,'Matrix',1,false);
const fifthMovie = new Movie(5,'Shrek',1,false,3,"2024-03-21");

const library = new FilmLibrary();

library.addNewFilm(firstMovie);
library.addNewFilm(secondMovie);
library.addNewFilm(thirdMovie);
library.addNewFilm(fourthMovie);
library.addNewFilm(fifthMovie);

library.printLibrary();
console.log('\n');
library.sortByDate();
console.log('\n');
library.getRated();
console.log('\n');
library.deleteFilm(3);
console.log('\n');
library.printLibrary();
console.log('\n');
library.resetWatchedFilms();
console.log('\n');
library.printLibrary();
console.log('\n');
console.log('End of program');