'use strict';

function convert(array){
    let result = [];
    for (const word of array){
        if (word.length >= 2){
            result.push(word[0]+word[1]+word[word.length-2]+word[word.length-1]);
        }else result.push('');
    }
    return result;
}

let strings = ['spring','cat','it','c','messetti'];
console.log(strings);
console.log(convert(strings));