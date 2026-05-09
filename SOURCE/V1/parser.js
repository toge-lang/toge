let current = 0;
// tokens variable used from lexer.js that is connected via html file, no need to redeclare
function peek() {return tokens[current]};
function peekAhead() {return tokens[current+1]};
function eat(expectedType) {
  const token = peek();
  if(token.type === expectedType) {
    current++;
    return token;
  } else {
    throw new Error("At token " + current + ", the " + expectedType + " token was expected, but it was replaced by " + token.type + " ('" + token.value + "'). Please replace it with the correct type before trying again."); // error code 6
  }
}
// ------------------------------------------ PARSER -------------------------------------------- //
parseArgument() {
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
      name: token.value;
    }
  }
  else if(peek().type === "IDENTIFIER" && peekAhead().type === "IDENTIFIER") {
    return parseFunctionCall();
  }
  else if(peek().type === "PARAMETER") {
    const token = eat("PARAMETER");
    return {
      type: "ParameterReference",
      name: token.value;
}
function parseFunctionCall() {
  const nameToken = eat("IDENTIFIER"); // get the function name
  eat("LPAREN"); // expect opening paren
  const args = []; // collect arguments here
  while(peek().value !== "RPAREN") {
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
