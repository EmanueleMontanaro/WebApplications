import { db } from "./db.mjs";
import crypto from 'crypto';

export const getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err,row) => {
            if (err)
                reject(err);
            else if (row === undefined) {
                resolve(false);
            } else {
                const user = {id: row.id, username: row.email, name: row.name};
                crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
                    if (err)
                        reject(err);
                    if(!crypto.timingSafeEqual(Buffer.from(row.password,'hex'), hashedPassword))
                        resolve(false);
                    else
                        resolve(user);
                });
            }
        });
    });
}