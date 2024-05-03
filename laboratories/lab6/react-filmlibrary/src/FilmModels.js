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

    this.init = () => {
        this.films = [
            new Movie(1,'Pulp Fiction',1,true,5,"2024-03-10"),
            new Movie(2,'21 Grams',1,true,4,"2024-03-17"),
            new Movie(3,'Star Wars',1,false),
            new Movie(4,'Matrix',1,false),
            new Movie(5,'Attack on titan',1,true,4,"2024-03-21")
        ]
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

export { FilmLibrary };