import dayjs from 'dayjs';
import sqlite from 'sqlite3';
import {Movie} from './FilmModels.mjs';

const db = new sqlite.Database('films.db', (err) => {if (err) throw err;});

//Print whole library
export const library = () => {
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

//Print favorite movies
export const favorites = () => {
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

//Print movies rated 5 out of 5
export const bestRated = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, title, isFavorite, rating, watchDate, userId FROM films WHERE rating = 5';
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

//Print unseen movies
export const unseen = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, title, isFavorite, rating, watchDate, userId FROM films';
        db.all(sql,[],(err,rows) => {
            if (err) reject(err);
            else{
                const result = rows
                .filter(ans => !dayjs(ans.watchDate).isValid())
                .map(ans => {
                    return new Movie(ans.id, ans.title, ans.userId, ans.isFavorite, ans.rating, ans.watchDate);
                })
                resolve(result);
            }
        })
    })
}

//Print movies watched within the past 30 days
export const watchedLastMonth = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, title, isFavorite, rating, watchDate, userId FROM films';
        db.all(sql,[],(err,rows) => {
            if (err) reject(err);
            else{
                const result = rows
                .filter(ans => dayjs(ans.watchDate).isAfter(dayjs().subtract(30,'d')) && dayjs(ans.watchDate).isValid())
                .map(ans => {
                    return new Movie(ans.id, ans.title, ans.userId, ans.isFavorite, ans.rating, ans.watchDate);
                })
                resolve(result);
            }
        })
    })
}

//Print movie given id
export const getMovie = (id) => {
    console.log("entered function");
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, title, isFavorite, rating, watchDate, userId FROM films WHERE id=?';
        db.get(sql,[id], (err,row) => {
            if (err) reject(err);
            else if(row === undefined) {
                resolve({error: "This movie doesn't exist"});
            }
            else{
                resolve(new Movie(row.id, row.title, row.userId, row.isFavorite, row.rating, row.watchDate));
            }
        });
    });
}

//Add movie
export const addMovie = (title, favorites, rating, date, userid) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO films VALUES (?,?,?,?,?,?)';
        db.run(sql,[id = createID(), title, favorites, rating, date, userid], function (err) {
            if (err) reject(err);
            else{
                let string = '';
                if (this.changes > 0) resolve(string = `Successfully added Movie with ID: ${id}`);
                else resolve(string = `Failed to add Movie with ID: ${id}`);
            }
        })
    })
}

//Generate new ID based on the current maximum ID
const createID = () => {
    const sql = 'SELECT MAX(id) FROM films';
    db.get(sql,[], function (err,row) {
        if (err) throw err;
        else{
            return id+1;
        }
    })
}

//Update all infos of a specific movie
export const updateMovie = (id, title, favorites, rating, date, userid) => {
    return new Promise ((resolve, reject) => {
        const sql = 'UPDATE films SET title = ?, isFavorite = ?, rating = ?, watchDate = ?, userId = ?  WHERE id = ?';
        db.run(sql,[title,favorites,rating,date,userid,id], function (err) {
            if (err) reject(err);
            else{
                let string = '';
                if (this.changes > 0) resolve(string = `Successfully updated Movie with ID: ${id}`);
                else resolve(string = `Failed to update Movie with ID: ${id}`);
            }
        })
    })
}

//Update rating of a specific movie
export const updateRating = (id, rating) => {
    return new Promise ((resolve, reject) => {
        const sql = 'UPDATE films SET rating = ? WHERE id = ?';
        db.run(sql,[rating,id], function (err) {
            if (err) reject(err);
            else{
                let string = '';
                if (this.changes > 0) resolve(string = `Successfully updated rating of Movie with ID: ${id}`);
                else resolve(string = `Failed to update rating of Movie with ID: ${id}`);
            }
        })
    })
}

//Set a specific movie as favorite/unfavorite
export const updateFavorites = (id, favorites) => {
    return new Promise ((resolve, reject) => {
        const sql = 'UPDATE films SET isFavorite = ? WHERE id = ?';
        db.run(sql,[favorites,id], function (err) {
            if (err) reject(err);
            else{
                let string = '';
                if (this.changes > 0) resolve(string = `Successfully updated favorites of Movie with ID: ${id}`);
                else resolve(string = `Failed to update favorites of Movie with ID: ${id}`);
            }
        })
    })
}

//Delete a specific movie
export const deleteMovie = (id) => {
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

