// ---------------------------------------------------------------------------- PARSER -----------------------------------------------------------------------------//
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
  if(current-1 >= 0) {
    throw new Error("The start of the code is malformed/incomplete, causing in an error at token " + current-1 + ". Please fix before retrying.");
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
function binaryOp(lowerLevel, operatorTypes) {
  let left = lowerLevel();
  while(operatorTypes.includes(peek().type)) {
    const operator = eat(peek().type).value;
    const right = lowerLevel();
    left = {type: "BinaryOperation", operator, left, right};
  }
  return left;
}
function parseLogicalOR() {return binaryOp(parseLogicalXOR, ["OR_GATE"])};
function parseLogicalXOR() {return binaryOp(parseLogicalAND, ["XOR_GATE"])};
function parseLogicalAND() {return binaryOp(parseComparison, ["AND_GATE"])};
function parseComparison() {return binaryOp(parseAS, ["COND_EQ", "SMALLER_EQ", "BIGGER_EQ", "NOT_COND_EQ", "NOT_SMALLER_EQ", "NOT_BIGGER_EQ", "BIGGER", "SMALLER", "NOT_BIGGER", "NOT_SMALLER"])};
function parseAS() {return binaryOp(parseMD, ["PLUS", "MINUS"])};
function parseMD() {return binaryOp(parsePW, ["TIMES", "DIVIDE_RS", "DIVIDE_RM"])};
function parsePW() {return binaryOp(parseArgument, ["POWER"])};
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
    throw new Error("Invalid argument at token " + current + ". It is an unrecognized character that has been used as an argument. Please fix before retrying.") // error code 7
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
  eat("RPAREN");
  return {
    type: "FunctionCall",
    name: nameToken.value,
    arguments: args
  };
}
function parseVrb() {
  eat("IDENTIFIER"); 
  eat("LPAREN");
  const args = [];
  while(peek().type !== "RPAREN") {
    args.push(parseArgument());
    if(peek().type === "COMMA") {
      eat("COMMA");
    }
  }
  eat("RPAREN");
  eat("SEMICOLON");
  return {
    type: "VariableDeclaration",
    variableName: args[0],
    typeValue: args[1],
    value: args[2]
  }
}
function parseStatement() {
  if(peek().type === "IDENTIFIER") {
    if(peek().value === "vrb") {
      return parseVrb();
    }
    else if(peek().value === "if") {
      return parseIf();
    }
    else if(peek().value === "until") {
      return parseUntil();
    }
    else if(peek().value === "for") {
      return parseFor();
    }
    else if(peek().value === "newf") {
      return parseNewf();
    }
    else {
      const node = parseFunctionCall();
      eat("SEMICOLON");
      return node;
    }
  }
  else {
    throw new Error("Token " + current + " isn't a statement, even though we expected it to be a statement(Got a "+ peek().type + " instead). Please fix before retrying.");
    //error code 8
  }
}
function parseIf() {
  eat("IDENTIFIER"); 
  eat("LPAREN");
  const condition = parseExpression();
  eat("RPAREN");
  eat("LBRACK"); 
  const body = []; 
  while(peek().type !== "RBRACK") {
    body.push(parseStatement());
  }
  eat("RBRACK");
  const bifBlocks = []; 
  let elseBlock = null;
  
  while(peek().type === "IDENTIFIER" && peek().value === "bif") {
    eat("IDENTIFIER"); 
    eat("LPAREN");
    const bifCondition = parseExpression(); 
    eat("RPAREN");
    eat("LBRACK");
    const bifBody = []; 
    while(peek().type !== "RBRACK") {
      bifBody.push(parseStatement());
    }
    eat("RBRACK");
    bifBlocks.push({
      type: "BifStatement",
      condition: bifCondition,
      body: bifBody
    });
  }
  if(peek().type === "IDENTIFIER" && peek().value === "else") {
    eat("IDENTIFIER");
    eat("LBRACK");
    const elseBody = [];
    while(peek().type !== "RBRACK") {
      elseBody.push(parseStatement());
    }
    elseBlock = {
      type: "ElseStatement",
      body: elseBody
    }
  }
  return {
    type: "IfStatement",
    condition: condition,
    body: body,
    bifBlocks: bifBlocks,
    elseBlock: elseBlock
  }
}
function parseFor() {
  eat("IDENTIFIER");
  eat("LPAREN");  
  const variable = parseArgument(); 
  eat("SEMICOLON");
  const condition = parseExpression();
  eat("SEMICOLON");
  eat("LBRACK");  
  const body = [];
  while(peek().type !== "RBRACK") {
    body.push(parseStatement());
  }
  eat("RBRACK");
  eat("RPAREN");
  eat("SEMICOLON");  
  return {
    type: "ForStatement",
    variable: variable,
    condition: condition,
    body: body
  }
}
function parseUntil() {
  eat("IDENTIFIER");
  eat("LPAREN");
  const condition = parseExpression();
  eat("RPAREN");
  eat("LBRACK");
  const body = [];
  while(peek().type !== "RBRACK") {
    body.push(parseStatement());
  } 
  eat("RBRACK");
  eat("SEMICOLON"); 
  return {
    type: "UntilStatement",
    condition: condition,
    body: body
  }
}
function parseNewf() {
  eat("IDENTIFIER");
  eat("LPAREN");  
  const nameToken = eat("STRING");
  eat("COMMA");
  const codeBlock = eat("VARIABLE");
  eat("COMMA");  
  eat("LBRACE");
  const params = {};
  while(peek().type !== "RBRACE") {
    const paramName = eat("IDENTIFIER").value;
    eat("COLON");
    const paramType = eat("IDENTIFIER").value;
    params[paramName] = paramType;
    if(peek().type === "COMMA") {
      eat("COMMA");
    }
  }
  eat("RBRACE");  
  eat("RPAREN");
  eat("SEMICOLON");
  return {
    type: "FunctionDefinition",
    name: nameToken.value,
    code: codeBlock.value,
    parameters: params
  }
}
function parseProgram() {
  const statements = [];
  while(peek().type !== "EOF") {statements.push(parseStatement())};
  return {
    type: "Program",
    statements: statements
  }
}
ast = parseProgram();
module.exports = {parseProgram};
 // ---------------------------------------------------------------------------- PARSER END ---------------------------------------------------------------------------------//
