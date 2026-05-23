// ---------------------------------------------------------------------------- LEXER -----------------------------------7-------------------------------------------//
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
  '-': [{next: '+-', type: 'NOT_GATE', value: '-+-', length: 3}, {next: '=', type: 'MINUS_EQ', value: '-=', length: 2}, {type: 'MINUS', value: '-', length: 1}],
  '*': [{next: '=', type: "TIMES_EQ", value: '*=', length : 2}, {type: 'TIMES', value: '*', length: 1}],
  '/': [{next: '=', type: "DIVIDERS_EQ", value: '/=', length : 2}, {type: 'DIVIDE_RS', value: '/', length: 1}],
  '%': [{next: '=', type: "DIVIDERM_EQ", value: '%=', length : 2}, {type: 'DIVIDE_RM', value: '%', length: 1}],
  '^': [{next: '=', type: "POWER_EQ", value: '^=', length : 2}, {type: 'POWER', value: '^', length: 1}],
  '>': [{next: '=', type: "BIGGER_EQ", value: '>?', length : 2}, {type: 'BIGGER', value: '>', length: 1}],
  '<': [{next: '=', type: "SMALLER_EQ", value: '<?', length : 2}, {type: 'SMALLER', value: '<', length: 1}],
  '|': [{next: '+|', type: "OR_GATE", value: '|+|', length : 3}, {next: '-|', type: "XOR_GATE", value: '|-|', length: 3}]
}
const nT = { // negatable tokens(ones where you can add a ! before them and they are still valid)
  '>': [{next: '=', type: "BIGGER_EQ", value: '>?', length : 2}, {type: 'BIGGER', value: '>', length: 1}],
  '<': [{next: '=', type: "SMALLER_EQ", value: '<?', length : 2}, {type: 'SMALLER', value: '<', length: 1}],
  '?': [{type: "COND_EQ", value: '?', length: 1}]
}
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
  let pos = 0;
  let line = 1;
  let column = 1;
  function move(n = 1) {pos += n;column += n};
  while(pos < source.length) {
    const char = source[pos];
    switch(true) {
      case char in sCT:
        let type = sCT[char].type;
        tokens.push(createToken(type, char, line, column));
        break;
      case char in mCT:
        const options = mCT[char];
        let matched = false;
        let i = 0;
        while(i < options.length && !matched) {
          const option = options[i];
          let shouldMatch = true;
          if(option.next) {
            const nextChars = source.substring(pos + 1, pos + 1 + option.next.length);
            if(nextChars !== option.next) {
              shouldMatch = false;
            }
          }
          if(shouldMatch) {
            tokens.push(createToken(option.type, option.value, line, column));
            move(option.length);
            matched = true;
          }   
        }
        if(!matched && char === '|') {
          throw new Error("A lone | is found at line " + line + ", column " + column + ". Please fix before retrying.");
        }
        break;
      case char === ' ':
      case char === '\r':
      case char === '\n':
      case char === '\t':
        if (char === '\n') {line++; column = 1};
        move();
        break;
      case char === '!':
         if(source[pos+1] in nT) {
           const options = nT[char];
           let matched = false;
           let i = 0;
           while(i < options.length && !matched) {
             const option = options[i];
             let shouldMatch = true;
             if(option.next) {
               const nextChars = source.substring(pos + 1, pos + 1 + option.next.length);
               if(nextChars !== option.next) {
                 shouldMatch = false;
               }
             }    
             if(shouldMatch) {
               tokens.push(createToken("NOT_" + option.type, '!' + option.value, line, column));
               move(option.length);
               matched = true;
            }
             i++;
           }
         break;
        }
        else {throw new Error("A lone ! is found at line " + line + ", column " + column + ". Please fix before retrying.")};
        break;
      case isDigit(char):
        let number = ``;
        const nextChar = source[pos+1];
        const start = pos;
        while(pos < source.length && isDigit(source[pos])) {number += source[pos]; move()};
        if(pos < source.length && source[pos] === '.') {
          number += '.';
          move();
          if(!(pos < source.length && isDigit(source[pos]))) {
            throw new Error("It seems at line " + line + ", column " + column + ", you added a non-number to a number, either that or an extra decimal point. Please fix before retrying."); // error code 5
          }
          while(pos < source.length && isDigit(source[pos])) {number += source[pos]; move()};
        }
        if (number.startsWith('0') && isDigit(nextChar)) {
          throw new Error("An invalid number has been found. Numbers starting with zero and not followed by a dot are invalid. The number is found starting at line " + line + ", column " + column + ". Please fix before retrying.");
        }
        tokens.push(createToken("NUMBER", number, line, column));
        break;
      case char === '"':
      case char === "'":
        let string = ``;
        const start = pos;
        move();
        while(pos < source.length && source[pos] !== char) {string += source[pos]; move()};
        if(pos >= source.length) {
          throw new Error("You forgot to close your text string starting at line " + line + ", column " + column + ". Please find and close it before retrying."); // error code 2
        }
        tokens.push(createToken("TEXT", string, line, column));
        move();
        break;
      case char === '#': 
        let vrb = ``;
        move();
        while(pos < source.length && isAlphaNumeric(source[pos])) {vrb += source[pos]; move()};
        tokens.push(createToken("VARIABLE", vrb, line, column));
        break;
      case char === '$': 
        let param = ``;
        move();
        while(pos < source.length && isAlphaNumeric(source[pos])) {param += source[pos]; move()};
        tokens.push(createToken("PARAMETER", param, line, column));
        break;
      case isLetter(char):
        let identifier = ``;
        while(pos < source.length && isAlphaNumeric(source[pos])) {identifier += source[pos]; move()};
        tokens.push(createToken("IDENTIFIER", identifier, line, column));
        break;
      default:
        throw new Error("A character isn't recognized, more specifically the '" + char + "' character, at line " + line + ", column " + column + ". Please fix it before retrying."); // error code 1
        break; 
    }
  }
  tokens.push(createToken("EOF", null, line, column));
  return tokens;
}
let tokens = tokenize(document.getElementById("codeArea").value);
// -------------------------------------------------------------------------- LEXER END ------------------------------------------------------------------------------//
