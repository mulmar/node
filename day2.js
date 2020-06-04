//day 2 advent 2015

import fs from 'fs';

const file = fs.readFileSync("./public/presentslist.txt").toString('utf8')//read textfile
	
const array = file.split(/\n|x/).map(Number)//convert text in one long number array

let dimension1 = 0;
let dimension2 = 0;
let dimension3 = 0;
let boxArray = [];
let paper = 0;
let ribbon = 0;
for (let i = 0; i < array.length; i++) {

	if ((i+1)%3 === 0) { 
		dimension3 = array[i];
		boxArray=[dimension1,dimension2,dimension3].sort(function(a, b){return a-b})
		paper += boxArray[0]*boxArray[1]*3 + boxArray[0]*boxArray[2]*2 + boxArray[1]*boxArray[2]*2 
		ribbon +=boxArray[0]*2 + boxArray[1]*2 + boxArray[0]*boxArray[1]*boxArray[2];
	}
	else if ((i+1)%2 === 0) { dimension2 = array[i];}
	else {dimension1 = array[i];}
	
}
console.log("total paper:", paper);
console.log("total ribbon:",ribbon);