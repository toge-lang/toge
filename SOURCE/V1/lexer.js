let source = `vrb("name", txt, "Alice")`;
let tokens = [];
let pos = 0;
function tokenize() {
  while(pos < source.length) {
    const char = source[pos];
    if(char === '(') {tokens.push({type: "LPAREN", value: '('})};                                   
    else if(char === ')') {tokens.push({type: "RPAREN", value: ')'}); pos++};                             
    else if(char === '[') {tokens.push({type: "LBRACK", value: '['}); pos++};                            
    else if(char === ']') {tokens.push({type: "RBRACK", value: ']'}); pos++};
    else if(char === '{') {tokens.push({type: "LBRACE", value: '{'}); pos++};                        
    else if(char === '}') {tokens.push({type: "RBRACE", value: '}'}); pos++};                       
    else if(char === ',') {tokens.push({type: "COMMA", value: ','}); pos++};                                                
    else if(char === ' ') {pos++; continue};                                                 
    else if(char >= '0' && char <= '9') {                                                  
      let number = ``;
      while(source[pos] >= '0' && source[pos] <= '9') {number += source[pos]; pos++};     
      tokens.push({type: "NUMBER", value: number});
      pos++;
    }                                                                                  
    else if(char === `"` || char === `'`) {                                          
      let string = ``;                                                                
      while(source[pos] !== char) {string += source[pos]; pos++};                   
      tokens.push({type: "TEXT", value: string});      
      pos++;
    }                                                                              
    else if(char === '=') {
      if(source[pos+1] === char && source[pos+2] !== char) {tokens.push({type: "STRICT_EQ", value: '=='})};
      else if(source[pos+1] !== char && source[pos+2] !== char) {tokens.push({type: "EQ", value: '='})};
      pos++;
    }
    else if(char === '?') {
      if(source[pos+1] === char && source[pos+2] !== char) {tokens.push({type: "COND_EQ", value: '?'})};
      else if(source[pos+1] !== char && source[pos+2] !== char) {tokens.push({type: "COND_STRICT_EQ", value: '??'})};
      pos++;
    }
    else if(char === '-') {
      if(source[pos+1] === char && source[pos+2] === char) {
        pos += 3;
        while(source[pos] !== '-' && source[pos+1] !== '-' && source[pos+2] !== '-') {pos++};
        pos += 3;
        continue;
      }
      else if(source[pos+1] === '=') {tokens.push({type: "MINUS_EQ", value: '-='})};
      else if(source[pos+1] === '+' && source[pos+2] === char) {tokens.push({type: "NOT_GATE", value: '-+-'})};
      else {tokens.push({type: "MINUS", value: '-'})};
    }
    else if(char === '+') {
      if(source[pos+1] === '=') {tokens.push({type: "PLUS_EQ", value: '+='})};
      else if(source[pos+1] === char && source[pos+2] === char) {tokens.push({type: "AND_GATE", value: '+++'})};
      else {tokens.push({type: "PLUS", value: '+'})};
    }
    else if(char === '*') {
      if(source[pos+1] === '=') {tokens.push({type: "TIMES_EQ", value: '*='});
      else {tokens.push({type: "TIMES", value: '*'})};
    }
    else if(char === '/') {
      if(source[pos+1] === '=' {tokens.push({type: "DIVIDERS_EQ", value: '/='});
      else {tokens.push({type: "DIVIDE_RS", value: "/"})};
    }
    else if(char === '%') {
      if(source[pos+1] === '=' {tokens.push({type: "DIVIDERM_EQ", value: '%='});
      else {tokens.push({type: "DIVIDE_RM", value: "%"})};
    }
    else if(char === '^') {
      if(source[pos+1] === '=' {tokens.push({type: "POWER_EQ", value: '^='});
      else {tokens.push({type: "POWER", value: "^"})};
    }
    else if(char === '|') {
      if(source[pos+1] === '+' && source[pos+2] === char) {tokens.push({type: "OR_GATE", value: "|+|"});
      else if(source[pos+1] === '-' && source[pos+2] === char) {tokens.push({type: "XOR_GATE", value: '|-|'})};
    }
    else if(char === '#') {
      let vrb = ``;
      while(source[pos] !== ' ') {vrb += source[pos]; pos++};
      tokens.push({type: "VARIABLE", value: vrb});
    }
    else if(char === '$') {
      let param = ``;
      while(source[pos] !== ' ') {param += source[pos]; pos++};
      tokens.push({type: "PARAMETER", value: param});
    }
  }
  tokens.push({type: "EOF", value: null})};
}

     
  
