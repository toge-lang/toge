console.log("Getting code area...");
const sourcesource = document.getElementById("codeArea");
let source = sourcesource.value;

let tokens = [];
let pos = 0;
function isDigit(char) {return char >= '0' && char <= '9'};
function isLetter(char) {return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'};
function isAlphaNumeric(char) {return isDigit(char) || isLetter(char)};
console.log("Loading tokenize function...");
function tokenize() {
  while(pos < source.length) {
    const char = source[pos];
    if(char === '(') {tokens.push({type: "LPAREN", value: '('}); pos++}                         
    else if(char === ')') {tokens.push({type: "RPAREN", value: ')'}); pos++}                        
    else if(char === '[') {tokens.push({type: "LBRACK", value: '['}); pos++}                       
    else if(char === ']') {tokens.push({type: "RBRACK", value: ']'}); pos++}
    else if(char === '{') {tokens.push({type: "LBRACE", value: '{'}); pos++}                   
    else if(char === '}') {tokens.push({type: "RBRACE", value: '}'}); pos++}                  
    else if(char === ',') {tokens.push({type: "COMMA", value: ','}); pos++}                                            
    else if(char === ' ') {pos++; continue}                                   
    else if(isDigit(char)) {
      let number = ``
      while(isDigit(source[pos]) {number += source[pos]; pos++}
      if(source[pos] === '.') {
        number += '.';
        pos++;
        if(!(isDigit(source[pos]))) {
          throw new Error("It seems at position " + pos + ", you added a non-number to a number, either that or an extra decimal point. Fix it before retrying!");
        }
        while(isDigit(source[pos]) {number += source[pos]; pos++}
      }
      tokens.push({ type: "NUMBER", value: number })
    }                                                                                 
    else if(char === `"` || char === `'`) {                                          
      let string = ``;
      const start = pos;
      pos++;
      while(source[pos] !== char) {string += source[pos]; pos++};
      if(pos >= source.length) {
        throw new Error("You forgot to close your text string starting at position " + start + ". Please find and close it before retrying.")
      }
      tokens.push({type: "TEXT", value: string});
      pos++;
    }                                                                              
    else if(char === '=') {
      if(source[pos+1] === char && source[pos+2] !== char) {tokens.push({type: "STRICT_EQ", value: '=='}); pos += 2}
      else if(source[pos+1] !== char && source[pos+2] !== char) {tokens.push({type: "EQ", value: '='}); pos++};
    }
    else if(char === '?') {
      if(source[pos+1] === char && source[pos+2] !== char) {tokens.push({type: "COND_EQ", value: '?'}); pos++}
      else if(source[pos+1] !== char && source[pos+2] !== char) {tokens.push({type: "COND_STRICT_EQ", value: '??'}); pos += 2};
    }
    else if(char === '-') {
      if(source[pos+1] === char && source[pos+2] === char) {
        const start = pos;
        pos += 3;
        while(!(source[pos] === '-' && source[pos+1] === '-' && source[pos+2] === '-')) {pos++};
        if (pos >= source.length) {
          throw new Error("You forgot to close to close your comment starting at position " + start + ". Please find and close it before retrying.");
        }
        pos += 3;
        continue;
      }
      else if(source[pos+1] === '=') {tokens.push({type: "MINUS_EQ", value: '-='}); pos += 2}
      else if(source[pos+1] === '+' && source[pos+2] === char) {tokens.push({type: "NOT_GATE", value: '-+-'}); pos += 3}
      else {tokens.push({type: "MINUS", value: '-'}); pos++};
    }
    else if(char === '+') {
      if(source[pos+1] === '=') {tokens.push({type: "PLUS_EQ", value: '+='}); pos += 2}
      else if(source[pos+1] === char && source[pos+2] === char) {tokens.push({type: "AND_GATE", value: '+++'}); pos += 3}
      else {tokens.push({type: "PLUS", value: '+'}); pos++};
    }
    else if(char === '*') {
      if(source[pos+1] === '=') {tokens.push({type: "TIMES_EQ", value: '*='}); pos += 2}
      else {tokens.push({type: "TIMES", value: '*'}); pos++};
    }
    else if(char === '/') {
      if(source[pos+1] === '=') {tokens.push({type: "DIVIDERS_EQ", value: '/='}); pos += 2}
      else {tokens.push({type: "DIVIDE_RS", value: "/"}); pos++};
    }
    else if(char === '%') {
      if(source[pos+1] === '=') {tokens.push({type: "DIVIDERM_EQ", value: '%='}); pos += 2}
      else {tokens.push({type: "DIVIDE_RM", value: "%"}); pos++};
    }
    else if(char === '^') {
      if(source[pos+1] === '=') {tokens.push({type: "POWER_EQ", value: '^='}); pos += 2}
      else {tokens.push({type: "POWER", value: "^"}); pos++};
    }
    else if(char === '|') {
      if(source[pos+1] === '+' && source[pos+2] === char) {tokens.push({type: "OR_GATE", value: "|+|"}); pos += 3}
      else if(source[pos+1] === '-' && source[pos+2] === char) {tokens.push({type: "XOR_GATE", value: '|-|'}); pos += 3};
    }
    else if(char === '#') {
      let vrb = ``;
      pos++;
      while(isAlphaNumeric(source[pos])) {vrb += source[pos]; pos++};
      tokens.push({type: "VARIABLE", value: vrb});
    }
    else if(char === '$') {
      let param = ``;
      pos++;
      while(isAlphaNumeric(source[pos])) {param += source[pos]; pos++};
      tokens.push({type: "PARAMETER", value: param});
    }
    else if(isLetter(char)) {
      let identifier = ``;
      while(isAlphaNumeric(source[pos])) {identifier += source[pos]; pos++};
      tokens.push({type: "IDENTIFIER", value: identifier});
    else {
      throw new Error("A character isn't recognized by us, more specifically the '" + char + "', at position " + pos + ". Please fix it before retrying.");
    }
    }
  }
  tokens.push({type: "EOF", value: null})};
}
tokenize()
console.log(tokens)

     
  
