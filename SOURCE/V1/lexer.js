//it all starts somewhere
let source = `vrb("name", txt, "Alice")`; // the source. Currently an example
let tokens = []; // the token list
let pos = 0; // the 'cursor', moves by 1 repeatedly, to the next iteration in the source. Does not work alome, only as source[pos]
//THE TOKENS
function tokenize() {
  while(pos < source.length) {
    const char = source[pos];
    if(char === '(') {tokens.push({type: "LPAREN", value: '('})};                                   //---
    else if(char === ')') {tokens.push({type: "RPAREN", value: ')'})};                             //
    else if(char === '[') {tokens.push({type: "LBRACK", value: '['})};                            //
    else if(char === ']') {tokens.push({type: "RBRACK", value: ']'})};                           // punctuation
    else if(char === '{') {tokens.push({type: "LBRACE", value: '{'})};                          //
    else if(char === '}') {tokens.push({type: "RBRACE", value: '}'})};                         //
    else if(char === ',') {tokens.push({type: "COMMA", value: ','})};                         //---                          
    else if(char === ' ') {pos++; continue};                                                 // whitespace   
    else if(char >= '0' && char <= '9') {                                                   //---
      let number = ``;
      while(source[pos] >= '0' && source[pos] <= '9') {number += source[pos]; pos++};     // numbers
      tokens.push({type: "NUMBER", value: number});                                      //
    }                                                                                   //---
    else if(char === `"` || char === `'`) {                                            //---
      let string = ``;                                                                //
      while(source[pos] !== char) {string += source[pos]; pos++};                    // text/strings
      tokens.push({type: "TEXT", value: string});                                   //
    }                                                                              // ---
    else if(char === '=') {
      if(source[pos+1] === char && source[pos+2] !== char) {tokens.push({type: "STRICT_EQ", value: '=='})};
      else if(source[pos+1] !== char && source[pos+2] !== char) {tokens.push({type: "EQ", value: '='})};
    }
    else if(char === '?') {
      if(source[pos+1] === char && source[pos+2] !== char) {tokens.push({type: "COND_EQ", value: '?'})};
      else if(source[pos+1] !== char && source[pos+2] !== char) {tokens.push({type: "COND_STRICT_EQ", value: '??'})};
    }
    else if(char === '-') {
      if(source[pos+1] === char && source[pos+2] === char) {
        pos += 3;
        while(source[pos] !== '-' && source[pos+1] !== '-' && source[pos+2] !== '-') {pos++};
        pos += 3;
        continue;
      }
      else if(source[pos+1] === '=') {tokens.push({type: "MINUS_EQ", value: '-='})};
      else {tokens.push({type: "MINUS", value: '-'})};
    }
    else if(char === '+') {
      if(source[pos+1] === '=') {tokens.push({type: "PLUS_EQ", value: '+='})};
      else {tokens.push({type: "PLUS", value: '+'})};
    }
    else if(char === '*') {
      if(source[pos+1] === '=') {tokens.push({type: "TIMES_EQ", value: '*='})};
      else {tokens.push({type: "TIMES", value: '*'})};
  }
}
     
  
