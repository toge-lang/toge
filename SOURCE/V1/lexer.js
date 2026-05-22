// ---------------------------------------------------------------------------- LEXER ------------------------------------------------------------------------------//
console.log("Loading necessary functions...");
const singleCharTokens = {
  '(': 'LPAREN',
  ')': 'RPAREN',
  '[': 'LBRACK',
  ']': 'RBRACK',
  '{': 'LBRACE',
  '}': 'RBRACE',
  ',': 'COMMA',
  ';': 'SEMICOLON',
  ':': 'COLON',
  '?': 'COND_EQ',
  '=': 'EQ'
};
function isDigit(char) {return char >= '0' && char <= '9'};
function isLetter(char) {return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')};
function isAlphaNumeric(char) {return isDigit(char) || isLetter(char)};
function createToken(type, value, line, columm) {
  return {
    type: type,
    value: value,
    line: line,
    column: column
  }
}
console.log("Functions loaded!");
console.log("Loading tokenize function...");
function tokenize(source) { 
  let tokens = []; // tokens array
  let pos = 0; // source position(the (pos)th character of the source)
  while(pos < source.length) {
    const char = source[pos];
    if(char
    switch(true) {
      case char === ' ':
      case char === '\r':
      case char === '\n':
      case char === '\t':
        pos++;
        break;
      case isDigit(char): // integers and decimal integers token
        let number = ``
        const nextChar = source[pos+1];
        const start = pos;
        while(pos < source.length && isDigit(source[pos])) {number += source[pos]; pos++}
        if(pos < source.length && source[pos] === '.') {
          number += '.';
          pos++;
          if(!(pos < source.length && isDigit(source[pos]))) {
            throw new Error("It seems at position " + pos + ", you added a non-number to a number, either that or an extra decimal point. Fix it before retrying!"); // error code 5
          }
          while(pos < source.length && isDigit(source[pos])) {number += source[pos]; pos++}
        }
        if (number.startsWith('0') && isDigit(nextChar)) {
          throw new Error("An invalid number has been found. Numbers starting with zero and not followed by a dot are invalid. The number is found starting at position " + start + ". Please fix before retrying.")};
        tokens.push({ type: "NUMBER", value: number });
        break;
      case char === '"':
      case char === "'": // double quote and single quote text strings token
        let string = ``;
        const start = pos;
        pos++;
        while(pos < source.length && source[pos] !== char) {string += source[pos]; pos++};
        if(pos >= source.length) {
          throw new Error("You forgot to close your text string starting at position " + start + ". Please find and close it before retrying."); // error code 2
        }
        tokens.push({type: "TEXT", value: string});
        pos++;
        break;
      case char === '-': 
        if(pos + 1 < source.length && source[pos+1] === char && pos + 2 < source.length && source[pos+2] === char) { // comments (no tokens)
          const start = pos;
          pos += 3;
          while(pos + 2 < source.length && !(source[pos] === char && source[pos+1] === char && source[pos+2] === char)) {pos++};
          if (pos + 2 >= source.length) {
            throw new Error("You forgot to close your comment starting at position " + start + ". Please find and close it before retrying."); // error code 3
          }
          pos += 3;
        }
        else if(pos + 1 < source.length && source[pos+1] === '=') {tokens.push({type: "MINUS_EQ", value: '-='}); pos += 2} // minus equals token
        else if(pos + 1 < source.length && source[pos+1] === '+' && pos + 2 < source.length && source[pos+2] === char) {tokens.push({type: "NOT_GATE", value: '-+-'} ); pos += 3} // not gate token
        else {tokens.push({type: "MINUS", value: '-'}); pos++}; // minus token
        break;
      case char === '+':
        if(pos + 1 < source.length && source[pos+1] === '=') {tokens.push({type: "PLUS_EQ", value: '+='}); pos += 2; break} // plus equals token
        else if(pos + 1 < source.length && source[pos+1] === char && pos + 2 < source.length && source[pos+2] === char) {tokens.push({type: "AND_GATE", value: '+++'}); pos += 3; break} // and gate token
        else {tokens.push({type: "PLUS", value: '+'}); pos++; break}; // plus token
        break;
      case char === '*':
        if(pos + 1 < source.length && source[pos+1] === '=') {tokens.push({type: "TIMES_EQ", value: '*='}); pos += 2} // times/multiply equals token
        else {tokens.push({type: "TIMES", value: '*'}); pos++}; // times/multiply token
        break;
      case char === '/':
        if(pos + 1 < source.length && source[pos+1] === '=') {tokens.push({type: "DIVIDERS_EQ", value: '/='}); pos += 2} // divide(result) equals token
        else {tokens.push({type: "DIVIDE_RS", value: "/"}); pos++}; // divide(result) token
        break;
      case char === '%':
        if(pos + 1 < source.length && source[pos+1] === '=') {tokens.push({type: "DIVIDERM_EQ", value: '%='}); pos += 2} // divide(rest) equals token
        else {tokens.push({type: "DIVIDE_RM", value: "%"}); pos++}; // divide(rest) token
        break;
      case char === '^':
        if(pos + 1 < source.length && source[pos+1] === '=') {tokens.push({type: "POWER_EQ", value: '^='}); pos += 2}// to the power of n equals token
        else {tokens.push({type: "POWER", value: "^"}); pos++}; // to the power of n token
        break;
      case char === '|':
        if(pos + 1 < source.length && source[pos+1] === '+' && pos + 2 < source.length && source[pos+2] === char) {tokens.push({type: "OR_GATE", value: "|+|"}); pos += 3} // or gate token
        else if(pos + 1 < source.length && source[pos+1] === '-' && pos + 2 < source.length && source[pos+2] === char) {tokens.push({type: "XOR_GATE", value: '|-|'}); pos += 3}; // xor gate token
        break;
      case char === '#': // variable reference token
        let vrb = ``;
        pos++;
        while(pos < source.length && isAlphaNumeric(source[pos])) {vrb += source[pos]; pos++};
        tokens.push({type: "VARIABLE", value: vrb});
        break;
      case char === '$': // parameter reference token
        let param = ``;
        pos++;
        while(pos < source.length && isAlphaNumeric(source[pos])) {param += source[pos]; pos++};
        tokens.push({type: "PARAMETER", value: param});
        break;
      case isLetter(char):// identifier token
        let identifier = ``;
        while(pos < source.length && isAlphaNumeric(source[pos])) {identifier += source[pos]; pos++};
        tokens.push({type: "IDENTIFIER", value: identifier});
        break;
      default:
        throw new Error("A character isn't recognized, more specifically the '" + char + "' character, at position " + pos + ". Please fix it before retrying."); // error code 1
        break; 
    }
  tokens.push({type: "EOF", value: null}); // end token
  return tokens;
}
let tokens = tokenize(document.getElementById("codeArea").value);
// -------------------------------------------------------------------------- LEXER END ------------------------------------------------------------------------------//
