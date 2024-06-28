import { text } from "express";
import { Meme } from "./MemeModels.mjs";
import { db } from "./db.mjs";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getSingleGame = () => {
    let textVec = [];
    return new Promise((resolve,reject) => {
        db.get('SELECT * FROM templates ORDER BY RANDOM() LIMIT 1', [], (err, row) => {
            if (err)
                reject(err);
            else {
                db.all('SELECT id,text FROM captions WHERE meme1 IS NOT ? AND meme2 IS NOT ? AND meme3 IS NOT ? ORDER BY RANDOM() LIMIT 5', [row.id,row.id,row.id], (err,rows) => {
                    if (err)
                        reject(err);
                    else
                        rows.map((caption) => textVec.push({text: caption.text,id: caption.id}));
                        db.all('SELECT id,text FROM captions WHERE meme1 IS ? OR meme2 IS ? OR meme3 IS ? ORDER BY RANDOM() LIMIT 2', [row.id,row.id,row.id], (err,rows) => {
                            if (err)
                                reject(err);
                            else {
                                rows.map((caption) => { textVec.push({text: caption.text,id: caption.id});});
                                const meme = new Meme(row.id,row.src,shuffleArray(textVec));
                                resolve(meme);
                            }
                        })
                })          
            }
        })
    })
}

export const getFullGame = () => {
    let textVec = [];
    let id1;
    let id2;
    let memes = [];
    return new Promise((resolve,reject) => {
        db.get('SELECT * FROM templates ORDER BY RANDOM() LIMIT 1', [], (err, row) => {
            if (err)
                reject(err);
            else {
                id1 = row.id;
                db.all('SELECT id,text FROM captions WHERE meme1 IS NOT ? AND meme2 IS NOT ? AND meme3 IS NOT ? ORDER BY RANDOM() LIMIT 5', [row.id,row.id,row.id], (err,rows) => {
                    if (err)
                        reject(err);
                    else
                        rows.map((caption) => textVec.push({text: caption.text,id: caption.id}));
                        db.all('SELECT id,text FROM captions WHERE meme1 IS ? OR meme2 IS ? OR meme3 IS ? ORDER BY RANDOM() LIMIT 2', [row.id,row.id,row.id], (err,rows) => {
                            if (err)
                                reject(err);
                            else {
                                rows.map((caption) => { textVec.push({text: caption.text,id: caption.id});});
                                memes.push(new Meme(row.id,row.src,shuffleArray(textVec)));
                                textVec=[]
                                db.get('SELECT * FROM templates WHERE id IS NOT ? ORDER BY RANDOM() LIMIT 1', [id1], (err, row) => {
                                    if (err)
                                        reject(err);
                                    else {
                                        id2 = row.id;
                                        db.all('SELECT id,text FROM captions WHERE meme1 IS NOT ? AND meme2 IS NOT ? AND meme3 IS NOT ? ORDER BY RANDOM() LIMIT 5', [row.id,row.id,row.id], (err,rows) => {
                                            if (err)
                                                reject(err);
                                            else
                                                rows.map((caption) => textVec.push({text: caption.text,id: caption.id}));
                                                db.all('SELECT id,text FROM captions WHERE meme1 IS ? OR meme2 IS ? OR meme3 IS ? ORDER BY RANDOM() LIMIT 2', [row.id,row.id,row.id], (err,rows) => {
                                                    if (err)
                                                        reject(err);
                                                    else {
                                                        rows.map((caption) => { textVec.push({text: caption.text,id: caption.id});});
                                                        memes.push(new Meme(row.id,row.src,shuffleArray(textVec)));
                                                        textVec=[]
                                                        db.get('SELECT * FROM templates WHERE id IS NOT ? AND id IS NOT ? ORDER BY RANDOM() LIMIT 1', [id1, id2], (err, row) => {
                                                            if (err)
                                                                reject(err);
                                                            else {
                                                                db.all('SELECT id,text FROM captions WHERE meme1 IS NOT ? AND meme2 IS NOT ? AND meme3 IS NOT ? ORDER BY RANDOM() LIMIT 5', [row.id,row.id,row.id], (err,rows) => {
                                                                    if (err)
                                                                        reject(err);
                                                                    else
                                                                        rows.map((caption) => textVec.push({text: caption.text,id: caption.id}));
                                                                        db.all('SELECT id,text FROM captions WHERE meme1 IS ? OR meme2 IS ? OR meme3 IS ? ORDER BY RANDOM() LIMIT 2', [row.id,row.id,row.id], (err,rows) => {
                                                                            if (err)
                                                                                reject(err);
                                                                            else {
                                                                                rows.map((caption) => { textVec.push({text: caption.text,id: caption.id});});
                                                                                memes.push(new Meme(row.id,row.src,shuffleArray(textVec)));
                                                                                textVec=[];
                                                                                resolve(memes);
                                                                            }
                                                                        })
                                                                })          
                                                            }
                                                        })
                                                    }
                                                })
                                        })          
                                    }
                                })
                            }
                        })
                })          
            }
        })
    })
}

export const getCorrectAnswers = (id) => {
    return new Promise((resolve,reject) => {
        db.all('SELECT id,text FROM captions WHERE meme1 IS ? OR meme2 IS ? OR meme3 IS ?', [id,id,id], (err,rows) => {
            if (err)
                reject(err)
            else {
                resolve(rows);
            }
        })
    })
}

export const postMatch = (match) => {
    return new Promise ((resolve, reject) => {
        db.run('INSERT INTO history (userId, date, hour, src1, src2, src3, text1, text2, text3, value1, value2, value3, score) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [match.userId,match.date.toString(), match.hour.toString(),match.src1,match.src2,match.src3,match.text1,match.text2,match.text3,match.value1,match.value2,match.value3,match.score],
            function(err) {
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);
            }
        )
    })
}

export const getHistory = (userId) => {
    return new Promise ((resolve, reject) => {
        db.all('SELECT id,date,hour,src1,src2,src3,text1,text2,text3,value1,value2,value3,score FROM history WHERE userId = ?', [userId], (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        })
    })
}