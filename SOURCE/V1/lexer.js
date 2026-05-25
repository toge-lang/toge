6// ----------------------------------------------------------------------------------------------------------- LEXER ----------------------------------------------------------------------------------------------------------------//
const sCT = { // single character tokens
  '(': {type: "LPAREN", length: 1},
  ')': {type: "RPAREN", length: 1},
  '[': {type: "LBRACKET", length: 1},
  ']': {type: "RBRACKET", length: 1},
  '{': {type: "LBRACE", length: 1},
  '}': {type: "RBRACE", length: 1},
  ',': {type: "COMMA", length: 1},
  ';': {type: "SEMICOLON", length: 1},
  ':': {type: "COLON", length: 1},
  '?': {type: "COND_EQ", length: 1},
  '=': {type: "EQ", length: 1}
}
const mCT = { // multi character tokens
  '+': [{next: '++', type: 'AND_GATE', value: '+++', length: 3}, {next: '=', type: 'PLUS_EQ', value: '+=', length: 2}, {type: 'PLUS', value: '+', length: 1}],
  '-': [{next: '=', type: 'MINUS_EQ', value: '-=', length: 2}, {type: 'MINUS', value: '-', length: 1}],
  '*': [{next: '=', type: "TIMES_EQ", value: '*=', length : 2}, {type: 'TIMES', value: '*', length: 1}],
  '/': [{next: '=', type: "DIVIDERS_EQ", value: '/=', length : 2}, {type: 'DIVIDE_RS', value: '/', length: 1}],
  '%': [{next: '=', type: "DIVIDERM_EQ", value: '%=', length : 2}, {type: 'DIVIDE_RM', value: '%', length: 1}],
  '^': [{next: '=', type: "POWER_EQ", value: '^=', length : 2}, {type: 'POWER', value: '^', length: 1}],
  '>': [{next: '?', type: "BIGGER_EQ", value: '>?', length : 2}, {type: 'BIGGER', value: '>', length: 1}],
  '<': [{next: '?', type: "SMALLER_EQ", value: '<?', length : 2}, {type: 'SMALLER', value: '<', length: 1}],
  '|': [{next: '+|', type: "OR_GATE", value: '|+|', length : 3}, {next: '-|', type: "XOR_GATE", value: '|-|', length: 3}]
}
const nT = { // negatable tokens(ones where you can add a ! before them and they are still valid)
  '>': [{next: '?', type: "BIGGER_EQ", value: '>?', length : 2}, {type: 'BIGGER', value: '>', length: 1}],
  '<': [{next: '?', type: "SMALLER_EQ", value: '<?', length : 2}, {type: 'SMALLER', value: '<', length: 1}],
  '?': [{type: "COND_EQ", value: '?', length: 1}]
}
const cTT = { // collecting-type tokens(value as a variable that keeps collecting until a certain point)
  '$': [{type: "PARAMETER"}], '#': [{type: "VARIABLE"}], '"': [{type: "TEXT"}], "'": [{type: "TEXT"}]
}
const whitespace = [' ', '\n', '\r', '\t'];
function isDigit(char) {return char >= '0' && char <= '9'}; // digit checker
function isLetter(char) {return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')}; // letter checker
function isAlphaNumeric(char) {return isDigit(char) || isLetter(char)}; // letter OR digit checker
function createToken(type, value, line, column) { // token creator
  return {
    type: type,
    value: value,
    line: line,
    column: column
  }
}
function tokenize(source) { 
  let tokens = []; 
  let pos = 0; // N-th character of source
  let line = 1; //N-th line of source
  let column = 1; //N-th character of the current line
  function move(n = 1) {pos += n;column += n};
  while(pos < source.length) { // until the end of the file is reached...
    const char = source[pos];
    switch(true) {
      case char in sCT: // check if a single character token
        let type = sCT[char].type;
        tokens.push(createToken(type, char, line, column));
        move();
        break;
      //---\\ 
      case char in mCT: // check if a multi character token with multiple possibilities
        const options = mCT[char]; // list all possible options...
        let matched = false; // track state...
        let i = 0; // counter variable...
        while(i < options.length && !matched) { // while token not matched(and there are options left)
          const option = options[i]; // check for the I-th option...
          let shouldMatch = true; // make it possible to match...
          if(option.next) { // checks if there are other characters part of the token next...
            const nextChars = source.substring(pos + 1, pos + 1 + option.next.length); // gets the ACTUAL next characters...
            if(nextChars !== option.next) { // if the predicted next characters and actual next characters dont match...
              shouldMatch = false; // assume prediction is false.
            }
          }
          if(shouldMatch) { // but if it was true...
            tokens.push(createToken(option.type, option.value, line, column)); // ...push a new token using the option's info...
            move(option.length); // and move past the token...
            matched = true; // and confirm the match.
          }   
          i++; // if the token and option werent suppose to match, go through the next iteration of the loop and options.
        }
        if(!matched && char === '|') { // but because | is only used for |+| and |-| and can't be alone... throw an error.
          throw new Error("A lone | is found at line " + line + ", column " + column + ". Please fix before retrying.");
        }
        break;  
      //---\\
      case char in whitespace:
        if (char === '\n') {line++; column = 0}; // get to the next line if user pressed enter...
        move(); // ...and move past whitespace.
        break;
      //---\\  
      case char in cTT:
        let val = ``; 
        move();
        if(char === '$' || char === '#') {while(pos < source.length && isAlphaNumeric(source[pos])) {val += source[pos]; move()}};
        else {while(pos < source.length && source[pos] !== char) {val += source[pos]; move()}};
        tokens.push(createToken(cTT[char].type, val, line, column));
        break;
      //---\\ 
      case char === '!': // mCT check but with some extra stuff and only nT characters
         if(source[pos+1] in nT) { // check if next token is negatable...
           const options = nT[source[pos+1]]; //...list all possible options...
           let matched = false; // ...track state...
           let j = 0; // create counter variable...
           while(j < options.length && !matched) { // ...while there are options left and token isn't matched to one of them yet...
             const option = options[j]; // ...check for the J-th option...
             let shouldMatch = true; // ...make it possible to match...
             if(option.next) { // ...if option contains other characters than the current one...
               const nextChars = source.substring(pos + 2, pos + 2 + option.next.length); // ...get actual next characters...
               if(nextChars !== option.next) { // ...if the prediction doesnt match the reality...
                 shouldMatch = false; //...assume prediction was false...
               }
             }    
             if(shouldMatch) {//...but if it was true...
               tokens.push(createToken("NOT_" + option.type, '!' + option.value, line, column)); // push token with the option's info..
               move(option.length + 1); // move past the token...
               matched = true; //...and end the loop.
            }
             j++; // oh and if it didnt match, continue the loop.
           }
         break;
        }
        else if(source[pos+1] in whitespace) {throw new Error("A lone ! is found at line " + line + ", column " + column + ". Please fix before retrying.")}
        else {tokens.push(createToken("NOT_GATE", '!', line, column))};
        break;
      //---\\
      // collecting-type tokens(creates a variable and collects until a certain condition, and pushes the token with the value being said variable)
      case isDigit(char):
        let number = ``; // creates a variable...
        const nextChar = source[pos+1];
        const start = pos;
        while(pos < source.length && isDigit(source[pos])) {number += source[pos]; move()}; //...and collects until a certain condition...
        if(pos < source.length && source[pos] === '.') {
          number += '.'; // updates the variable... 
          move();
          if(!(pos < source.length && isDigit(source[pos]))) {
            throw new Error("It seems at line " + line + ", column " + column + ", you added a non-number to a number, either that or an extra decimal point. Please fix before retrying."); // error code 5
          }
          while(pos < source.length && isDigit(source[pos])) {number += source[pos]; move()};//...and collects until a certain condition... (x2)
        }
        if (number.startsWith('0') && isDigit(nextChar)) {
          throw new Error("An invalid number has been found. Numbers starting with zero and not followed by a dot are invalid. The number is found starting at line " + line + ", column " + column + ". Please fix before retrying.");
        }
        tokens.push(createToken("NUMBER", number, line, column)); // ...and pushes the token with the value being said variable.
        break;
      //---\\
      case isLetter(char):
        let identifier = ``; // creates a variable...
        while(pos < source.length && isAlphaNumeric(source[pos])) {identifier += source[pos]; move()};//...and collects until a certsin condition...
        tokens.push(createToken("IDENTIFIER", identifier, line, column)); // ...and pushes the token with the value being said variable.
        break;
        
      default:
        throw new Error("A character isn't recognized, more specifically the '" + char + "' character, at line " + line + ", column " + column + ". Please fix it before retrying."); // error code 1
        break; 
    }
  }
  tokens.push(createToken("EOF", null, line, column)); // end of file reached, tokenization done
  return tokens; // return everything
}
module.exports = {tokenize}; //something something node.js something
// ------------------------------------------------------------------------------------------------------------------ LEXER END -----------------------------------------------------------------------------------------------------//
