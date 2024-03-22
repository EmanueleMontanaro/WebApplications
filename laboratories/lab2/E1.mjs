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

    this.DBaddMovie = (film) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO films VALUES (?,?,?,?,?,?)';
            db.run(sql,[film.id, film.title, film.favorites, film.rating, film.date, film.userid], function (err) {
                if (err) reject(err);
                else{
                    let string = '';
                    if (this.changes > 0) resolve(string = `Successfully added Movie with ID: ${film.id}`);
                    else resolve(string = `Failed to add Movie with ID: ${film.id}`);
                }
            })
        })
    }

    this.DBdeleteMovie = (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM films WHERE id=?';
            db.run(sql,[id],function (err) {
                if (err) reject(err);
                else{
                    let string = '';
                    if (this.changes > 0) resolve(string = `Successfully deleted Movie with ID: ${id}`);
                    else resolve(string = `Failed to delete Movie with ID: ${id}`);
                }
            })
        })
    }

    this.DBdeleteDates = (count) => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE films SET watchDate = ?';
            db.run(sql,[null],function (err) {
                if (err) throw err;
                else{
                    let string = '';
                    if(this.changes == count) resolve(string = `Successfully deleted watchDate column from all films`);
                else resolve(string = `Failed to delete watchDate column from ${count - this.changes} films`);
                }
            })
        })
    }

    this.DBcount = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films';
            db.all(sql,[],(err,rows) => {
                if (err) reject(err);
                else resolve(rows.length);
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
    console.log('First part:')
    await library.DBprintLibrary().then(x => {
        console.log("DBprintLibrary:");
        x.toString();
    })
    await library.DBprintFavorites().then(x => {
        console.log("DBprintFavorites:");
        x.toString();
    })
    await library.DBprintWatchedToday().then(x => {
        console.log("DBprintWatchedToday:");
        x.toString();
    })
    await library.DBafterDate("2024-03-17").then(x => {
        console.log("DBafterDate:");
        x.toString();
    })
    await library.DBprintGreater(4).then(x => {
        console.log("DBprintGreater:");
        x.toString();
    })
    await library.DBprintContainString('Star').then(x => {
        console.log("DBprintContainString:");
        x.toString();
    })


    console.log('\nSecond part:');
    let movie1 = new Movie(6, 'Man In Black', 3, 0, 2, '2024-02-29');
    let movie2 = new Movie(7, 'Shutter Island', 2, 1, 5, '2024-01-15');
    await library.DBdeleteMovie(6).then(result => console.log(result));
    await library.DBdeleteMovie(7).then(result => console.log(result));
    await library.DBaddMovie(movie1).then(result => console.log(result));
    await library.DBaddMovie(movie2).then(result => console.log(result));
    await library.DBprintLibrary().then(x => {
        console.log("DBprintLibrary:");
        x.toString();
    })
    await library.DBdeleteDates(await library.DBcount()).then(result => console.log(result));
    await library.DBprintLibrary().then(x => {
        console.log("DBprintLibrary:");
        x.toString();
    })
}

main();