// To be fixed: printing involves as much undefined as the printed lines (which are correct)
// To be added: second request

import dayjs from 'dayjs';
import sqlite from 'sqlite3';

const db = new sqlite.Database('films.db', (err) => {if (err) throw err;});

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

    this.DBprintLibrary = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, title, isFavorite, rating, watchDate, userId FROM films';
            db.all(sql,[],(err,rows) => {
                if (err) reject(err);
                else {
                    const result = rows.map(ans => {
                        return new Movie(ans.id, ans.title, ans.userId, ans.isFavorite, ans.rating, ans.watchDate);
                    });
                    resolve(result);
                }
            })
        })
    }

    this.DBprintFavorites = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, title, isFavorite, rating, watchDate, userId FROM films WHERE isFavorite = 1';
            db.all(sql,[],(err,rows) => {
                if (err) reject(err);
                else{
                    const result = rows.map(ans => {
                        return new Movie(ans.id, ans.title, ans.userId, ans.isFavorite, ans.rating, ans.watchDate);
                    })
                    resolve(result);
                }
            })
        })
    }

    this.DBprintWatchedToday = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, title, isFavorite, rating, watchDate, userId FROM films WHERE watchDate = ?';
            db.all(sql, [dayjs().format('YYYY-MM-DD')], (err,rows) => {
                if (err) reject(err);
                else{
                    const result = rows.map(ans => {
                        return new Movie(ans.id, ans.title, ans.userId, ans.isFavorite, ans.rating, ans.watchDate);
                    })
                    resolve(result);
                }
            })
        })
    }

    this.DBafterDate = (date) => {
        date = dayjs(date);
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, title, isFavorite, rating, watchDate, userId FROM films';
            db.all(sql,[],(err, rows) => {
                if (err) reject(err);
                else{
                    const result = rows.filter(ans => dayjs(ans.watchDate).isAfter(date)).map(ans => {
                        return new Movie(ans.id, ans.title, ans.userId, ans.isFavorite, ans.rating, ans.watchDate);
                    })
                    resolve(result);
                }
            })
        })
    }

    this.DBprintGreater = (value) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, title, isFavorite, rating, watchDate, userId FROM films WHERE rating >= ?';
            db.all(sql,[value],(err,rows) => {
                if (err) reject(err);
                else{
                    const result = rows.map(ans => {
                        return new Movie(ans.id, ans.title, ans.userId, ans.isFavorite, ans.rating, ans.watchDate);
                    })
                    resolve(result);
                }
            })
        })
    }

    this.DBprintContainString = (str) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, title, isFavorite, rating, watchDate, userId FROM films';
            db.all(sql,[],(err, rows) => {
                if (err) reject(err);
                else{
                    const result = rows.filter(ans => (ans.title).includes(str)).map(ans => {
                        return new Movie(ans.id, ans.title, ans.userId, ans.isFavorite, ans.rating, ans.watchDate);
                    })
                    resolve(result);
                }
            })
        })
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

async function main(){
    let library = new FilmLibrary();
    library.DBprintLibrary().then(x => {
        console.log("DBprintLibrary:");
        console.log(x.toString());
    })
    const result1 = await library.DBprintLibrary();
    library.DBprintFavorites().then(x => {
        console.log("DBprintFavorites:");
        console.log(x.toString());
    })
    const result2 = await library.DBprintFavorites();
    library.DBprintWatchedToday().then(x => {
        console.log("DBprintWatchedToday:");
        console.log(x.toString());
    })
    const result3 = await library.DBafterDate();
    library.DBafterDate("2024-03-17").then(x => {
        console.log("DBafterDate:");
        console.log(x.toString());
    })
    const result4 = await library.DBafterDate("2024-03-17");
    library.DBprintGreater(4).then(x => {
        console.log("DBprintGreater:");
        console.log(x.toString());
    })
    const result5 = await library.DBprintGreater(4);
    library.DBprintContainString('Star').then(x => {
        console.log("DBprintContainString:");
        console.log(x.toString());
    })
    const result6 = await library.DBprintContainString("Star");
}

main();