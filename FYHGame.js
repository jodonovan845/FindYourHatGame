const prompt = require('prompt-sync')({sigint: true});
//greeting
const name = prompt('What is your name?');
console.log(`Hey there ${name}`);

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
//takes in field and assigns it to _field 
  constructor (myField) {
    this._field = myField;
  }
//allows me to use this.field instead of this._field
  get field () {
    return this._field;
  }

  move() {  
    let mainArrayNum = 0;
    let secondArrayNum = 0;
    let status = 'continue';

    while(status === 'continue'/* not an O or a ^ */) {  

      let direction = prompt('Which way?');
//adds or subtracts from mainArrayNum (used for row) or secondArrayNum (used for column)      
      if (direction === 'd') {
        mainArrayNum ++;   
      } else if (direction === 'u') {
          mainArrayNum --;
      } else if (direction === 'r') {
          secondArrayNum ++;
      } else if (direction === 'l') {
          secondArrayNum --;
      };

      if (mainArrayNum < 0 || secondArrayNum < 0 || mainArrayNum === this.field.length || secondArrayNum === this.field[0].length) {
        //if statement defines what will give out of bounds message and stop program by changing status value - this covers if you try to put a character off the playfield
        console.log('Out of bounds instruction');
        status = 'stop';        
      } else if(this.field[mainArrayNum][secondArrayNum] === fieldCharacter) {
        //if the location on the field indicated by the input is a field character, make it a path character and reprint (using printTime function)
        this.field[mainArrayNum][secondArrayNum] = pathCharacter;
        this.printTime();        
      } else if (this.field[mainArrayNum][secondArrayNum] === hat) {
        //when your new location in the array is the same one as the hat character a message tells you that you won and the program ends
        console.log('Congrats, you found your hat');
        status = 'stop';
      } else if (this.field[mainArrayNum][secondArrayNum] === hole) {
        //when your new location in the array is the same one as a hole character a message tells you that you lost and the program ends
        console.log('Sorry, you fell down a hole');
        status = 'stop';
      } else {
        //more out of bounds instructions that are different than if it is off the screen - mainly for if you try to make a new path character where you have already been - so its stops you from backing up
        console.log('Out of bounds instruction');
        status = 'stop';
      }

    }
  }

  printTime () {
  //print the current field (used after you first generate the field and then each time you move path character)
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(''));
    }
  }

  static generateField (height, width, percentage) {
    let newField = [];
    let holeAmount = Math.floor((height * width) * (percentage / 100));
    let randHat = [];
    let rando = [];
    let stat = 'continue';

    console.log('There are ' + holeAmount + ' holes.  Good luck!');

//creating empty rows and filling each row with field characters and one path character
    for(let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < width; j++) {
        if (i === 0 && j === 0) {
          newField[i].push(pathCharacter);
        } else {
          newField[i].push(fieldCharacter);
        } 
      }      
    }
    
    let x = 0;
    while(x < holeAmount){
//select random array, if it is a field character - push O, if it is not (O / * /^) try again.  do this until there are HOLEAMOUNT of Os
      rando = [Math.floor(Math.random() * (height)), Math.floor(Math.random() * (width))];
      if(newField[rando[0]][rando[1]] === fieldCharacter) {
        newField[rando[0]][rando[1]] = hole;
        x++
      }
    }
//select random array, if it is a field character make it a hat and stop loop.  if not, try again.
    while(stat === 'continue') {
      randHat = [Math.floor(Math.random() * (height)), Math.floor(Math.random() * (width))];
      if(newField[randHat[0]][randHat[1]] === fieldCharacter) {
        newField[randHat[0]][randHat[1]] = hat;
        stat = 'stop';
      }
    }
//return the entire field
    return newField;
  }  
}

/*calling functions to: 
  generate the field based on height, width, perecentage of holes
  calling function using this newly generated field
  printing the initial field
  moving your path character (which also reprints updated field)
*/
const myField = Field.generateField(10,10,20);
const currentField = new Field(myField);
currentField.printTime();
currentField.move();