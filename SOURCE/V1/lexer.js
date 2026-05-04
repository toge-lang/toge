//it all starts somewhere
let source = `vrb("name", txt, "Alice")`; // the source. Currently an example
let tokens = []; // the token list
let pos = 0; // the 'cursor', moves by 1 repeatedly, to the next digit. Does not work alone, only as source[pos]
let number = ' ' // for tokenizing numbers
//THE TOKENS
while(pos < source.length) {
  const char = source[pos];
  pos++;
  if(char === '(') {tokens.push({type: "LPAREN", value: '('})};
  if(char === ')') {tokens.push({type: "RPAREN", value: ')'})};
  if(char === '[') {tokens.push({type: "LBRACK", value: '['})};
  if(char === ']') {tokens.push({type: "RBRACK", value: ']'})};
  if(char === '{') {tokens.push({type: "LBRACE", value: '{'})};
  if(char === '}') {tokens.push({type: "RBRACE", value: '}'})};
  if(char === ',') {tokens.push({type: "COMMA", value: ','})};
  if(char === ' ') {pos++; continue};
  if(char >= '0' && char <= '9') {
    while(source[pos] >= '0' && source[pos] <= 9) {number += source[pos]; pos++};
    tokens.push({type: "NUMBER", value: number})
  }
  if(char === '"' || char === "'") {
    // incomplete, but i gotta do something and i do NOT wanna lose progress 
  }
    
  
