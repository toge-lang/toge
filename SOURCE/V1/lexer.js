let source = `vrb("name", txt, "Alice")`;
let tokens = [];
let pos = 0;
function isDigit(source[pos]) {return char >= '0' && char <= '9'};
function isLetter(source[pos]) {return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'};
function isAlphanumeric(source[pos]) {return isDigit(source[pos]) || isLetter(source[pos])};
function tokenize() {
  while(pos < source.length) {
    const char = source[pos];
    if(char === '(') {tokens.push({type: "LPAREN", value: '('}); pos++};                                   
    else if(char === ')') {tokens.push({type: "RPAREN", value: ')'}); pos++};                             
    else if(char === '[') {tokens.push({type: "LBRACK", value: '['}); pos++};                            
    else if(char === ']') {tokens.push({type: "RBRACK", value: ']'}); pos++};
    else if(char === '{') {tokens.push({type: "LBRACE", value: '{'}); pos++};                        
    else if(char === '}') {tokens.push({type: "RBRACE", value: '}'}); pos++};                       
    else if(char === ',') {tokens.push({type: "COMMA", value: ','}); pos++};                                                
    else if(char === ' ') {pos++; continue};                                                 
    else if(char >= '0' && char <= '9') {                                                  
      let number = ``;
      while(isDigit(source[pos])) {number += source[pos]; pos++};     
      tokens.push({type: "NUMBER", value: number});
      pos++;
    }                                                                                  
    else if(char === `"` || char === `'`) {                                          
      let string = ``;                                                                
      while(isLetter(source[pos]) {string += source[pos]; pos++};                   
      tokens.push({type: "TEXT", value: string});      
      pos++;
    }                                                                              
    else if(char === '=') {
      if(source[pos+1] === char && source[pos+2] !== char) {tokens.push({type: "STRICT_EQ", value: '=='}); pos += 2};
      else if(source[pos+1] !== char && source[pos+2] !== char) {tokens.push({type: "EQ", value: '='}); pos++};
    }
    else if(char === '?') {
      if(source[pos+1] === char && source[pos+2] !== char) {tokens.push({type: "COND_EQ", value: '?'}); pos++};
      else if(source[pos+1] !== char && source[pos+2] !== char) {tokens.push({type: "COND_STRICT_EQ", value: '??'}); pos += 2};
    }
    else if(char === '-') {
      if(source[pos+1] === char && source[pos+2] === char) {
        pos += 3;
        while(!(source[pos] === '-' && source[pos+1] === '-' && source[pos+2] === '-')) {pos++};
        pos += 3;
        continue;
      }
      else if(source[pos+1] === '=') {tokens.push({type: "MINUS_EQ", value: '-='}); pos += 2};
      else if(source[pos+1] === '+' && source[pos+2] === char) {tokens.push({type: "NOT_GATE", value: '-+-'}); pos += 3};
      else {tokens.push({type: "MINUS", value: '-'}); pos++};
    }
    else if(char === '+') {
      if(source[pos+1] === '=') {tokens.push({type: "PLUS_EQ", value: '+='}); pos += 2};
      else if(source[pos+1] === char && source[pos+2] === char) {tokens.push({type: "AND_GATE", value: '+++'}); pos += 3};
      else {tokens.push({type: "PLUS", value: '+'}); pos++};
    }
    else if(char === '*') {
      if(source[pos+1] === '=') {tokens.push({type: "TIMES_EQ", value: '*='}); pos += 2};
      else {tokens.push({type: "TIMES", value: '*'}); pos++};
    }
    else if(char === '/') {
      if(source[pos+1] === '=') {tokens.push({type: "DIVIDERS_EQ", value: '/='}); pos += 2};
      else {tokens.push({type: "DIVIDE_RS", value: "/"}); pos++};
    }
    else if(char === '%') {
      if(source[pos+1] === '=') {tokens.push({type: "DIVIDERM_EQ", value: '%='}); pos += 2};
      else {tokens.push({type: "DIVIDE_RM", value: "%"}); pos++};
    }
    else if(char === '^') {
      if(source[pos+1] === '=') {tokens.push({type: "POWER_EQ", value: '^='}); pos += 2};
      else {tokens.push({type: "POWER", value: "^"}); pos++};
    }
    else if(char === '|') {
      if(source[pos+1] === '+' && source[pos+2] === char) {tokens.push({type: "OR_GATE", value: "|+|"})};
      else if(source[pos+1] === '-' && source[pos+2] === char) {tokens.push({type: "XOR_GATE", value: '|-|'})};
      pos += 3;
    }
    else if(char === '#') {
      let vrb = ``;
      while(isAlphaNumeric(source[pos])) {vrb += source[pos]; pos++};
      tokens.push({type: "VARIABLE", value: vrb});
      pos++;
    }
    else if(char === '$') {
      let param = ``;
      while(isAlphaNumeric(source[pos]) {param += source[pos]; pos++};
      tokens.push({type: "PARAMETER", value: param});
      pos++;
    }
  }
  tokens.push({type: "EOF", value: null})};
}

     
  
