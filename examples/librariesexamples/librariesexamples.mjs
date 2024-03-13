//'use strict'; -> If file is .mjs we can avoid this

// Importing libraries
// CommonJS -> Standard node method, not standard for JS
// const dayjs = require('dayjs');

// ES module -> Standard method for JS (TO BE USED)
import dayjs from 'dayjs'; //Standalone won't work, we gotta rename file to .mjs

let today = dayjs();

console.log(today.format('YYYY-MM-DD'));