import sqlite from 'sqlite3';

export const db = new sqlite.Database('memes.sqlite', (err) => {
  if (err) throw err;
});