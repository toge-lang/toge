let current = 0;
// tokens variable used from lexer.js that is connected via html file, no need to redeclare
function peek() {
  if(current >= tokens.length) {
    throw new Error("The end of the code is malformed/incomplete, causing in an error at token " + current + ". Please fix before retrying.");
  }
  return tokens[current];
}
function peekAhead() {
  if(current+1 >= tokens.length) {
    throw new Error("The end of the code is malformed/incomplete, causing in an error at token " + current+1 + ". Please fix before retrying.");
  }
  return tokens[current+1];
}
function peekBehind() {
  if(current-1 >= tokens.length) {
    throw new Error("The end of the code is malformed/incomplete, causing in an error at token " + current-1 + ". Please fix before retrying.");
  }
  return tokens[current-1];
}
function eat(expectedType) {
  const token = peek();
  if(token.type === expectedType) {
    current++;
    return token;
  } else {
    throw new Error("At token " + current + ", the " + expectedType + " token was expected, but it was replaced by " + token.type + " ('" + token.value + "'). Please replace it with the correct type before trying again."); // error code 6
  }
}
 // -------------------------------------------------------------------------- PARSER -----------------------------------------------------------------------------//
function parseExpression() {return parseAS()};
function parseAS() {
  let left = parseMD(); 
  while(peek().type === "PLUS" || peek().type === "MINUS") {
    const operator = eat(peek().type).value;
    const right = parseMD();
    left = {
      type: "BinaryOperation",
      operator: operator,
      left: left,
      right: right
    }
  }
  return left;
}
function parseMD() {
  let left = parsePW();
  while(peek().type === "TIMES" || peek().type === "DIVIDE_RS" || peek().type === "DIVIDE_RM") {
    const operator = eat(peek().type).value;
    const right = parsePW();
    left = {
      type: "BinaryOperation",
      operator: operator,
      left: left,
      right: right
    }
  }
  
  return left;
}
function parsePW() {
  let left = parseArgument();
  while(peek().type === "POWER") {
    const operator = eat("POWER").value;
    const right = parseArgument();
    left = {
      type: "BinaryOperation",
      operator: operator,
      left: left,
      right: right
    }
  }
  return left;
}
function parseArgument() {
  if(peek().type === "NUMBER") {
    const token = eat("NUMBER");
    return {
      type: "Literal",
      valueType: "number",
      value: token.value
    };
  }
  else if(peek().type === "TEXT") {
    const token = eat("TEXT");
    return {
      type: "Literal",
      valueType: "text",
      value: token.value
    }
  }
  else if(peek().type === "VARIABLE") {
    const token = eat("VARIABLE");
    return {
      type: "VariableReference",
      name: token.value
    }
  }
  else if(peek().type === "IDENTIFIER" && peekAhead().type !== "LPAREN") {
    const token = eat("IDENTIFIER");
    return {
      type: "Identifier",
      name: token.value
    }
  }
  else if(peek().type === "IDENTIFIER" && peekAhead().type === "LPAREN") {
    return parseFunctionCall();
  }
  else if(peek().type === "PARAMETER") {
    const token = eat("PARAMETER");
    return {
      type: "ParameterReference",
      name: token.value
    }
  }
  else {
    throw new Error("Invalid argument at token " + current + ". It is an unrecognized character that has been used as an argument. Please fix before retrying.")
  }
}
function parseFunctionCall() {
  const nameToken = eat("IDENTIFIER");
  eat("LPAREN"); 
  const args = []; 
  while(peek().type !== "RPAREN") {
    args.push(parseArgument());
    if(peek().type === "COMMA") {
      eat("COMMA");
    }
  }
  eat("RPAREN")
  return {
    type: "FunctionCall",
    name: nameToken.value,
    arguments: args
  };
}
