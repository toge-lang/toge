// evaluating ---
let database = {}; // stores all variable names and their values 
function evaluate(node) { // helper function for execute(), defines most values and operations
  if(node.type === "Literal") { // strings and numbers
    return node.value;
  }
  else if(node.type === "VariableReference") { // variable references like #banana
    if(node.name in database) {
      return database[node.name];
    }
    else {
      throw new Error("We have found no variable with the '"+ node.name +"' name. Please declare that variable before retrying.") // error code 9
    }
  }
  else if(node.type === "BinaryOperation") { // binary operations like comparisons and 3 + 2
    let L = evaluate(node.left);
    let R = evaluate(node.right);
    let operator = node.operator;
    switch(operator) { // switch through all operator cases except assigning
      case '+': return L + R;
      case '-': return L - R;
      case '*': return L * R;
      case '/': return L / R;
      case '%': return L % R;
      case '^': return Math.pow(L, R);
      case '+++': return L && R;
      case '-+-': return !L;
      case '|+|': return L || R;
      case '|-|': return (L && !R) || (!L && R);
      case '?': return L == R;
      case '??': return L === R;
    }
  }
  else if(node.type === "ParameterReference") { // parameter referencing
    return database[node.name];
  }
}
// functions ---
function wrt(args) {
  console.log(args.join(' '));
} 
function tlk(args) {
  const inputType = args[0];
  const prompt = args[1] || "Enter input: "; 
  const userInput = prompt(prompt);
  if(typeof prompt !== "string" || typeof prompt !== "number") {
    throw new Error("Tlk function cannot have prompt as something other than a string or a number. Please locate and fix before retrying.");
  }
  if(inputType.toLowerCase === "n") {
    return parseFloat(userInput);  // convert to number
  }
  else if(inputType.toLowerCase === "l") {
    return userInput;  // keep as string
  }
}

// statement executer ---
function execute(node) {
  if(node.type === "VariableDeclaration") {
    let name = node.name;
    let value = evaluate(node.value);
    database[name] = value;
  }
  if (node.type === "FunctionCall") {
    if(node.name === "wrt") {
      const evalArgs = node.arguments.map(args => evaluate(args));
      wrt(evalArgs);
    }
    else if(node.name === "tlk") {
      const evalArgs = node.arguments.map(args => evaluate(args));
      return tlk(evalArgs);
    }
    else if(node.name === "ext") {
      let exitCode = 0;
      if(node.arguments.length > 0) {
      exitCode = evaluate(node.arguments[0]);
      }
      throw new Error("Program exited with error code " + exitCode +".");
    }
  }
}

