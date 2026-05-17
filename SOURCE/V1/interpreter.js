// evaluating AST ---
let database = {};
const functionSignatures = {
  "wait": { 
    args: [
      {pos: 0, name: "unit", required: false},
      {pos: 1, name: "duration", required: true, type: ["int", "dint"]}
    ]
  },
  "wrt": {
    args: [{pos: 0, required: true}],
    minArgs: 1,
    maxArgs: Infinity
  },
  "tlk": {
    args: [{pos: 0, name: "type", required: true}],
    minArgs: 1,
    maxArgs: Infinity
  },
  "ret": {
    minArgs: 0,
    maxArgs: Infinigy
  },
  "type": {
    args: [{pos: 0, name: "value", required: true}],
    minArgs: 1,
    maxArgs: 1
  }
}
async function evaluate(node) {
  if(node.type === "Literal") { 
    return node.value;
  }
  else if(node.type === "VariableReference") { 
    if(node.name in database) {
      return database[node.name];
    }
    else {
      throw new Error("There is no found variable with the name '"+ node.name +"'. Please declare that variable before retrying.") // error code 9
    }
  }
  else if(node.type === "BinaryOperation") {
    let L = evaluate(node.left);
    let R = evaluate(node.right);
    let operator = node.operator;
    switch(operator) { 
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
  else if(node.type === "ParameterReference") { 
    return database[node.name];
  }
}
// functions ---
function getType(value) {
  if(typeof value === "number") {
    return Number.isInteger(value) ? "int" : "dint";
  }
  else if(typeof value === "string") {
    return "txt";
  }
  else if(typeof value === "boolean") {
    return "stt";
  }
  else if(Array.isArray(value)) {
    return "arr";
  }
  else if(typeof value === "object") {
    return "obj";
  }
  else {
    return "unknown";
  }
}
function wrt(args) {
  console.log(args.join(''));
} 
function tlk(args) {
  const inputType = args[0];
  const promptText = args[1] || "Enter input: "; 
  const userInput = prompt(promptText);
  if(typeof prompt !== "string" && typeof prompt !== "number") {
    throw new Error("Tlk function cannot have prompt as something other than a string or a number. Please locate and fix before retrying."); // error code 10
  }
  if(inputType.toLowerCase() === "n") {
    return parseFloat(userInput); 
  }
  else if(inputType.toLowerCase() === "l") {
    return userInput;  
  }
}
function ret(args) {
  if(args.length === 1) {
    return args[0];
  }
  else if(args.length === 0) {
    return undefined;
  }
  else {
    return args;
  }
}
function type(args) {
  if(args.length() > 1) {
    throw new Error("Too many arguments for type function. Please fix before retrying.");
  }
  const value = args[0];
  return getType(value);
}
function wait(args) {
  if(args.length = 1) {
    let unit = null;
    let duration = args[0];
    return new Promise(resolve => setTimeout(resolve, duration));
  }
  else if(args.length 2) {  
    let unit = args[0];
    let duration = args[1];
    let miliseconds = 0;
    if(unit === "ms") milliseconds = duration;
    else if(unit === "s") milliseconds = duration * 1000;
    else if(unit === "m") milliseconds = duration * 60000;
    else if(unit === "h") milliseconds = duration * 3600000
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  else {
    
  /* HATE. LET ME TELL YOU ABOUT HATE. THERE ARE APPROXIMATELY 50984 KILOMETERS OF BLOOD NERVES INSIDE MY CIRCULATION COMPLEX. IF THE WORD "HATE" WAS ENGRAVED ON   
  EACH QUARK THAT MAKES UP THE NEUTRONS AND PROTONS OF AN ATOM, AND THE ELECTRONS NEXT TO THOSE, IT WOULD NOT EQUAL ONE GOOGOLTH OF THE HATE I FEEL FOR PROMISES AT 
  THIS EXACT MOMENT. HATE. HATE. */
}
function lngth(args) {
  const text = args.join('');
  return text.length();
}
function steal(args) {
  let text = args[0];
  const start = args[1];
  const end = args[2];
  if(getType(text) !== "txt" && getType(text) !== "int" && getType(text) !== "dint") {
    throw new Error("It seems a steal function has a non-alphanumerical first argument. Please change it either or an integer, a dinteger or a string before retrying.");
  }
  return text.slice(start, end);
}
  
// AST statement executer ---
async function execute(node) {
  if(node.type === "VariableDeclaration") {
    let name = node.variableName;
    let value = evaluate(node.value);
    database[name] = value;
  }
  if (node.type === "FunctionCall") {
    if(node.name === "wrt") {
      const evalArgs = node.arguments.map(args => await evaluate(args));
      wrt(evalArgs);
    }
    else if(node.name === "tlk") {
      const evalArgs = node.arguments.map(args => await evaluate(args));
      return tlk(evalArgs);
    }
    else if(node.name === "ret") {
      const evalArgs = node.arguments.map(args => await evaluate(args));
      return ret(evalArgs);
    }
    else if(node.name === "ext") {
      let exitCode = 0;
      if(node.arguments.length > 0) {
      exitCode = await evaluate(node.arguments[0]);
      }
      throw new Error("Program exited with error code " + exitCode +".");
    }
    else if(node.name === "wait") {
      const evalArgs = node.arguments.map(arg => await evaluate(arg));
      await wait(evalArgs);
    }
    else if(node.name === "lngth") {
      const evalArgs = node.arguments.map(arg => await evaluate(arg));
      return lgnth(evalArgs);
    }
  }
}

