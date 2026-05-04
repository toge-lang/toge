//it all starts somewhere
let source = `vrb("name", txt, "Alice")`; // the source. Currently an example
let tokens = []; // the token list
let pos = 0; // the 'cursor', moves by 1 repeatedly, to the next digit. Does not work alone, only as source[pos]
let number = ' ' // for tokenizing numbers
let string1 = ` ` // for tokenizing  strings with double quotes
let string2 = ` ` // for tokenizing strings with single quotes
//THE TOKENS
while(pos < source.length) {
  const char = source[pos];
  pos++;
  if(char === '(') {tokens.push({type: "LPAREN", value: '('})};                            //---
  if(char === ')') {tokens.push({type: "RPAREN", value: ')'})};                           //
  if(char === '[') {tokens.push({type: "LBRACK", value: '['})};                          //
  if(char === ']') {tokens.push({type: "RBRACK", value: ']'})};                         // punctuation
  if(char === '{') {tokens.push({type: "LBRACE", value: '{'})};                        //
  if(char === '}') {tokens.push({type: "RBRACE", value: '}'})};                       //
  if(char === ',') {tokens.push({type: "COMMA", value: ','})};                       //---                          
  if(char === ' ') {pos++; continue};                                               // whitespace
  if(char >= '0' && char <= '9') {                                                 //---
    while(source[pos] >= '0' && source[pos] <= 9) {number += source[pos]; pos++}; // numbers
    tokens.push({type: "NUMBER", value: number})                                 //
  }                                                                             //---
  if(char === `"`) {                                                           //---
    while(source[pos] !== `"`) {string1 += source[pos]; pos++};               //
    tokens.push({type: "TEXT", value: string1});                             //
  }                                                                         // text/strings
  if(char === `'`) {                                                       //
    while(source[pos] !== `'`) {string2 += source[pos]; pos++};           //
    tokens.push({type: "TEXT", value: string2});                         //
  }                                                                     //---
}
    
  
