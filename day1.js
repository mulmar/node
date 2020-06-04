//day1 of advent 2015
import fs from 'fs';

const file = fs.readFileSync("./public/input.txt").toString('utf8')	
console.log('He ends up at floor: ',(file.match(/\(/g)||[]).length-(file.match(/\)/g)||[]).length)
const res = file.replace(/\(/g, "1,");
const res2 = res.replace(/\)/g, "-1,");
const array = res2.split(",").map(Number)
let floor = 0;
for (let i = 0; i < array.length; i++) {
 	floor += array[i]
	if (floor < 0) {
		console.log('At sign ', i+1 +' santa goes ' + array[i] + ' and ends up at floornr ' + floor); 
		break; }
}