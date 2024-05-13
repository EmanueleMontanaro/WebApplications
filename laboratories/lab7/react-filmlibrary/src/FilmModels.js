import dayjs from 'dayjs';

function Movie(id,title,userid = 1,favorites=false,rating = 0,date = null){
    this.id = id;
    this.title = title;
    this.userid = userid;
    this.favorites = favorites;
    this.date = date;
    if(dayjs(date).isValid()) this.date = dayjs(date).format('YYYY-MM-DD');
    this.rating = rating;
}

function FilmLibrary(){
    this.films = [];

    this.init = () => {
        this.films = [
            new Movie(1,'PulpFiction',1,1,5,"2024-03-10"),
            new Movie(2,'21Grams',1,1,4,"2024-03-17"),
            new Movie(3,'StarWars',1,0),
            new Movie(4,'Matrix',1,0),
            new Movie(5,'AttackOnTitan',1,1,5,"2024-03-21")
        ]
    }

    this.addMovie = (movie) => {
        this.films.push(movie);
    }
    this.editMovie = (editedMovie) => {
        this.films.map((movie) => {
            if(movie.id === editedMovie.id){
                movie.title = editedMovie.title;
                movie.favorites = editedMovie.favorites;
                movie.date = editedMovie.date;
                movie.rating = editedMovie.rating;
            }
        })
    }

    this.getMovies = () => {
        return [...this.films];
    }
    
    this.getFavorites = () => {
        return [...this.films].filter(movie => movie.favorites == 1);
    }

    this.getMaxRated = () => {
        return [...this.films].filter(movie => movie.rating == 5);
    }

    this.getLastMonth = () => {
        return [...this.films].filter(movie => dayjs(movie.date).isAfter(dayjs().subtract(30,'d')) && dayjs(movie.date).isValid());
    }

    this.getUnseen = () => {
        return [...this.films].filter(movie => !dayjs(movie.date).isValid());
    }

    this.delete = (id) => {
        console.log(id);
        this.films = [...this.films].filter(film => film.id !== id);
        return [...this.films];
    }

    this.filteredFilms = (filter) => {
        switch(filter){
            case 'All':
                return this.getMovies();
            case 'Favorites':
                return this.getFavorites();
            case 'Best rated':
                return this.getMaxRated();
            case 'Seen last month':
                return this.getLastMonth();
            case 'Unseen':
                return this.getUnseen();
        }
    }
}

export { FilmLibrary, Movie };