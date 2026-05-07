console.log("Loading necessary functions..."); 
function isDigit(char) {return char >= '0' && char <= '9'};
function isLetter(char) {return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'};
function isAlphaNumeric(char) {return isDigit(char) || isLetter(char)};
console.log("Functions loaded!");
console.log("Loading tokenize function...");
function tokenize(source) { 
  let tokens = []; // tokens array
  let pos = 0; // source position(the (pos)th character of the source)
  while(pos < source.length) {
    const char = source[pos];
    if(char === '(') {tokens.push({type: "LPAREN", value: '('}); pos++} // left paranthesis token
    else if(char === ')') {tokens.push({type: "RPAREN", value: ')'}); pos++} // right paranthesis token
    else if(char === '[') {tokens.push({type: "LBRACK", value: '['}); pos++} // left bracket token
    else if(char === ']') {tokens.push({type: "RBRACK", value: ']'}); pos++} // right bracket token
    else if(char === '{') {tokens.push({type: "LBRACE", value: '{'}); pos++} // left brace token
    else if(char === '}') {tokens.push({type: "RBRACE", value: '}'}); pos++} // right brace token
    else if(char === ',') {tokens.push({type: "COMMA", value: ','}); pos++} // comma token
    else if(char === ';') {tokens.push({type: "SEMICOLON", value: ';'}); pos++} // semicolon token
    else if(char === ' ') {pos++; continue} // whitespace(no token)
    else if(isDigit(char)) { // integers and decimal integers token
      let number = ``
      const nextChar = source[pos+1];
      const start = pos;
      while(isDigit(source[pos])) {number += source[pos]; pos++}
      if(source[pos] === '.') {
        number += '.';
        pos++;
        if(!(isDigit(source[pos]))) {
          throw new Error("It seems at position " + pos + ", you added a non-number to a number, either that or an extra decimal point. Fix it before retrying!"); // error code 5
        }
        while(isDigit(source[pos])) {number += source[pos]; pos++}
      }
      if (number.startsWith('0') && isDigit(nextChar)) {
        throw new Error("An invalid number has been found. Numbers starting with zero and not followed by a dot are invalid. The number is found starting at position " + start + ". Please fix before retrying."); // error code 4
      }
      tokens.push({ type: "NUMBER", value: number })
    }
    else if(char === `"` || char === `'`) { // double quote and single quote text strings token
      let string = ``;
      const start = pos;
      pos++;
      while(source[pos] !== char && pos < source.length) {string += source[pos]; pos++};
      if(pos >= source.length) {
        throw new Error("You forgot to close your text string starting at position " + start + ". Please find and close it before retrying."); // error code 2
      }
      tokens.push({type: "TEXT", value: string});
      pos++;
    }                                                                              
    else if(char === '=') {
      if(source[pos+1] === char && source[pos+2] !== char) {tokens.push({type: "STRICT_EQ", value: '=='}); pos += 2} // type equals tokens
      else if(source[pos+1] !== char && source[pos+2] !== char) {tokens.push({type: "EQ", value: '='}); pos++}; // equals token
    }
    else if(char === '?') {
      if(source[pos+1] === char && source[pos+2] !== char) {tokens.push({type: "COND_EQ", value: '?'}); pos++} // condition equals token
      else if(source[pos+1] !== char && source[pos+2] !== char) {tokens.push({type: "COND_STRICT_EQ", value: '??'}); pos += 2}; // type conditions equals token
    }
    else if(char === '-') {
      if(source[pos+1] === char && source[pos+2] === char) { // comments (no tokens)
        const start = pos;
        pos += 3;
        while(!(source[pos] === char && source[pos+1] === char && source[pos+2] === char) && pos < source.length) {pos++};
        if (pos >= source.length) {
          throw new Error("You forgot to close to close your comment starting at position " + start + ". Please find and close it before retrying."); // error code 3
        }
        pos += 3;
        continue;
      }
      else if(source[pos+1] === '=') {tokens.push({type: "MINUS_EQ", value: '-='}); pos += 2} // minus equals token
      else if(source[pos+1] === '+' && source[pos+2] === char) {tokens.push({type: "NOT_GATE", value: '-+-'}); pos += 3} // not gate token
      else {tokens.push({type: "MINUS", value: '-'}); pos++}; // minus token
    }
    else if(char === '+') {
      if(source[pos+1] === '=') {tokens.push({type: "PLUS_EQ", value: '+='}); pos += 2} // plus equals token
      else if(source[pos+1] === char && source[pos+2] === char) {tokens.push({type: "AND_GATE", value: '+++'}); pos += 3} // and gate token
      else {tokens.push({type: "PLUS", value: '+'}); pos++}; // plus token
    }
    else if(char === '*') {
      if(source[pos+1] === '=') {tokens.push({type: "TIMES_EQ", value: '*='}); pos += 2} // times/multiply equals token
      else {tokens.push({type: "TIMES", value: '*'}); pos++}; // times/multiply token
    }
    else if(char === '/') {
      if(source[pos+1] === '=') {tokens.push({type: "DIVIDERS_EQ", value: '/='}); pos += 2} // divide(result) equals token
      else {tokens.push({type: "DIVIDE_RS", value: "/"}); pos++}; // divide(result) token
    }
    else if(char === '%') {
      if(source[pos+1] === '=') {tokens.push({type: "DIVIDERM_EQ", value: '%='}); pos += 2} // divide(rest) equals token
      else {tokens.push({type: "DIVIDE_RM", value: "%"}); pos++}; // divide(rest) token
    }
    else if(char === '^') {
      if(source[pos+1] === '=') {tokens.push({type: "POWER_EQ", value: '^='}); pos += 2}// to the power of n equals token
      else {tokens.push({type: "POWER", value: "^"}); pos++}; // to the power of n token
    }
    else if(char === '|') {
      if(source[pos+1] === '+' && source[pos+2] === char) {tokens.push({type: "OR_GATE", value: "|+|"}); pos += 3} // or gate token
      else if(source[pos+1] === '-' && source[pos+2] === char) {tokens.push({type: "XOR_GATE", value: '|-|'}); pos += 3}; // xor gate token
    }
    else if(char === '#') { // variable reference token
      let vrb = ``;
      pos++;
      while(isAlphaNumeric(source[pos])) {vrb += source[pos]; pos++};
      tokens.push({type: "VARIABLE", value: vrb});
    }
    else if(char === '$') { // parameter reference token
      let param = ``;
      pos++;
      while(isAlphaNumeric(source[pos])) {param += source[pos]; pos++};
      tokens.push({type: "PARAMETER", value: param});
    }
    else if(isLetter(char)) { // identifier token
      let identifier = ``;
      while(isAlphaNumeric(source[pos])) {identifier += source[pos]; pos++};
      tokens.push({type: "IDENTIFIER", value: identifier});
    }
    else {
      throw new Error("A character isn't recognized, more specifically the '" + char + "' character, at position " + pos + ". Please fix it before retrying."); // error code 1
    }  
  }
  tokens.push({type: "EOF", value: null}); // end token
  return tokens;
}
console.log("Tokenize function succesfully loaded!");
function lexer() {
  const source = document.getElementById("codeArea").value; 
  const temp = `vrb("pies", arr, [3.14, "pie"]); wrt(#pies);`
  tokenize(temp);
  console.log(tokens);
}
console.log("Lexer completed!");
lexer();
     
  
