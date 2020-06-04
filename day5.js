//day 5 advent 2015
//It contains at least three vowels (aeiou)
//It contains at least one letter that appears twice in a row
//It does not contain the strings ab, cd, pq, or xy, 

import fs from 'fs';

const list = fs.readFileSync("./public/naughtylist.txt").toString().split(/\n/g)  //convert text in one long number array by splitting it by line breaks

console.log('total list :',list.length);

const removedForbiddenStrings = (list) => {
    return list.filter(name => {
        return !name.includes('ab') 
        && !name.includes('cd') 
        && !name.includes('pq') 
        && !name.includes('xy')
    })
}

console.log('w/o forbidden strings: ',removedForbiddenStrings(list).length);

const keep3vowelsAndDoubles =(list) => {
    let niceList = [];
    list.forEach(element => {
        let nice = false
        let counter = 0;
        let double = false;
        let previous = '';
        let splittedWord = element.toString().split("")
        splittedWord.forEach(element => {
            if (element == "a" || element == "e" || element == "i" || element == "o" || element == "u") {
                counter += 1;
            }
            if (element === previous) {
                double = true;
            }
            previous = element;  
        });

        if (counter >= 3 && double) {
         niceList.push(element);
        }
    });
    return niceList;
}

console.log('nice list:',keep3vowelsAndDoubles(removedForbiddenStrings(list)).length);

const containsSplitChar = (inputWord) => {
    let letters = inputWord.split("");
    let found = false;
    for (let i = 0; i < letters.length; i++) {
        if (i>1 && found == false) {
            found = letters[i-2] == letters[i];
        }
        if (found) {break;}
    }
    return found;
}


const contains2Doubles = (inputWord) => {
    let letters = inputWord.split("");
    let searchString = "";
    let searchArray = [];
    let found = false;
    for (let i = 0; i < letters.length; i++) {
        if (i>0 && found == false) {
            searchString = letters[i-1] + letters[i];
            searchArray.push(searchString);
        }
        if (i>2 && found == false) {
            for (let j = 0; j < searchArray.length-2; j++){ 
                if (searchArray[j] === searchString) {
                found = true; break;
                }
            }
        }
        if (found) {break;}
    }
    return found;
}

const howMany = () => {
    let count = 0;
    list.forEach(word => {
        if (contains2Doubles(word) && containsSplitChar(word)) {
            count += 1;
        }

    });
    return count
}

console.log('nice2 list:',howMany());



var grep = function(list, callback) {
    var filtered = [],
        len = items.length,
        i = 0;
    for (i; i < len; i++) {
        var item = items[i];
        var cond = callback(item);
        if (cond) {
            filtered.push(item);
        }
    }

    return filtered;
};
