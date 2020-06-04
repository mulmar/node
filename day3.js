//day 3 advent 2015

import fs from 'fs';

const file = fs.readFileSync("./public/directions.txt").toString('utf8')//read textfile
	
const array = file.split("")//convert text in one long number array

let santa = () => {//function to create santa's list with coordinates
    let xSanta = 0;
    let ySanta = 0;
    let coordinatesSanta = [[0,0]] // startpoint
    array.forEach(element => {//go through all the arrows and change the x,y coordinate accordingly
            switch (element) {
                case "^":
                    ySanta += 1;
                    break;
                case "v": 
                    ySanta -= 1;
                    break;
                case ">":
                    xSanta += 1;
                    break;
                case "<": 
                    xSanta -= 1;
                    break;
            }
            coordinatesSanta.push([xSanta,ySanta]);//add the new coordinate in the array
    });
    return coordinatesSanta;//full list of coordinates visited by santa
}

let both = () => {// function to create the list of coordinates visited by santa and the robot
    let coordinates = [[0,0],[0,0]] //starting coordinates for santa and robot
    let xRobot = 0;
    let yRobot = 0;
    let xSanta = 0;
    let ySanta = 0;
    let santasTurn = true // the first move will be made by Santa
    array.forEach(element => {
        if (santasTurn) {
            santasTurn = false; // the next turn is not for santa
            switch (element) {
                case "^":
                    ySanta += 1;
                    break;
                case "v": 
                    ySanta -= 1;
                    break;
                case ">":
                    xSanta += 1;
                    break;
                case "<": 
                    xSanta -= 1;
                    break;
            }
            coordinates.push([xSanta,ySanta]); // add santa's coordinates to the list
        }

        else {// if it is not the turn of santa
            santasTurn = true;// the next turn is for santa
            switch (element) {
                case "^":
                    yRobot += 1;
                    break;
                case "v": 
                    yRobot -= 1;
                    break;
                case ">":
                    xRobot += 1;
                    break;
                case "<": 
                    xRobot -= 1;
                    break;
            }
            coordinates.push([xRobot,yRobot]);// add the robots coordinates to to list
        }
    });
    return coordinates;
}

function multiDimensionalUnique(inputCoordinates) {// filter out the duplicate from the list
    var uniques = []; // an array to hold only the unique coordinates
    var itemsFound = {}; // object with all the unique coordinates
    for(var i = 0, l = inputCoordinates.length; i < l; i++) {//go trough all the coordinates
        var stringified = JSON.stringify(inputCoordinates[i]); // make the nested array into a string
        if(itemsFound[stringified]) { continue; } //if this string already exists in the object go to the next coordinate and skip the last part of the loop
        uniques.push(inputCoordinates[i]);// add the unique nested array into the unique coordinates
        itemsFound[stringified] = true;// add the unique sting into the object
    }
    return uniques;// return the unique multi-dimension array
}

//console.log('all coordinates santa',santa().length); // show the length of the complete list of coordinates of santa
//console.log('all coordinates both',both().length); // show the length of the complete list of coordinates of santa and the robot
console.log('unique Locations Santa',multiDimensionalUnique(santa()).length);// show the number of unique coordinates of santa
console.log('unique Locations Both',multiDimensionalUnique(both()).length);// show the number of unique coordinates of santa and the robot