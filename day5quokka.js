'use strict';

const fs = require('fs');

const input = fs.readFileSync("./public/naughtylist.txt", 'utf8');

const strings = input.split('\n'); 

const niceStrings1 = strings.filter(str => {
  let vowelMatch = str.match(/[aeiou]/g)
  return vowelMatch && vowelMatch.length >= 3 && str.match(/(\w)\1/) && !str.match(/ab|cd|pq|xy/);
  console.log(vowelMatch);
});

console.log('Nice #1:', niceStrings1.length);

const niceStrings2 = strings.filter(str => {
  return str.match(/(\w\w)\w*\1/) && str.match(/(\w)\w\1/);
});

console.log('Nice #2:', niceStrings2.length);