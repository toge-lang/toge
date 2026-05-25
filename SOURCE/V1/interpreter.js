// evaluating AST ---
let database = {};
const functionSignatures = { //rules of arguments for each function, 'signatures' if you will
  "wait": {args: [{pos: 0, name: "unit", required: false, type: "txt"}, {pos: 1, name: "duration", required: true, type: ["int", "dint"]}], minArgs: 1, maxArgs: 2},
  "wrt": {args: [{pos: 0, required: true}], minArgs: 1, maxArgs: Infinity},
  "tlk": {args: [{pos: 0, name: "type", required: true}], minArgs: 1, maxArgs: Infinity},
  "ret": {minArgs: 0, maxArgs: Infinity},
  "type": {args: [{pos: 0, name: "value", required: true}], minArgs: 1, maxArgs: 1},
  "ext": {args: [{pos: 0, name: "exitCode", required: false, type: "int"}], minArgs: 0, maxArgs: 1},
  "lngth": {args: [{pos: 0, name: "text", required: true, type: "txt"}], minArgs: 1, maxArgs: Infinity},
  "steal": {args: [{pos: 0, name: "text", required: true, type: "txt"}, {pos: 1, name: "start", required: true, type: "txt"}, {pos: 2, name: "end", required: false}], minArgs: 2, maxArgs: 3},
  "trim": {args: [{pos: 0, name: "text", required: true, type: "txt"}, {pos: 1, name: "slice", required: true, type: "txt"}, {pos: 2, name: "type", required: true}], minArgs: 3, maxArgs: 3} 
}
async function evaluate(node) {
  switch(node.type) {
    case "Literal":
      return node.value;
      break;
    case "VariableReference":
      if(node.name in database) {
        return database[node.name];
      }
      else {
        throw new Error("There is no found variable with the name '"+ node.name +"'. Please declare that variable before retrying.") // error code 9
      }
      break;
    case "BinaryOperation":
      let L = evaluate(node.left);
      let R = evaluate(node.right);
      let operator = node.operator;
      switch(operator) { 
        case '+': return L + R; break; case '-': return L - R; break;
        case '*': return L * R; break; case '/': return L / R; break; case '%': return L % R; break;
        case '^': return Math.pow(L, R); break;
        case '+++': return L && R; break; case '!': return !L; break; case '|+|': return L || R; break; case '|-|': return (L && !R) || (!L && R); break;
        case '?': return L === R; break; case '>': return L > R; break; case '<': return L < R; break;
        case '>?': return L >= R; break; case '<?': return L <= R; break;
        case '!>': return !(L > R); break; case '!<': return !(L < R); break; case '!?': return L == R; break;
        case '!>?': return !(L >= R); break; case '!<?': return !(L <= R); break;
      }
      break;
    case "ParameterReference":
      return database[node.name];
      break;
  }
}
// functions ---
function getType(value) {
  switch(typeof value) {
    case "number":
      if(Number.isInteger(value)) {
        return "int";
      } else {return "dint"};
      break;
    case "string":
      return "txt";
      break;
    case "boolean":
      return "stt";
      break;
    case "object":
      if(value !== null && Array.isArray(value)) {return "arr"};
      else if(value !== null && !(Array.isArray(value))) {return "obj"};
      else {return "nil"};
      break;
    default:
      return "unknown";
      break;
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
  const value = args[0];
  return getType(value);
}
function wait(args) {
  if(args.length = 1) {
    let unit = null;
    let duration = args[0];
    return new Promise(resolve => setTimeout(resolve, duration));
  }
  else if(args.length = 2) {  
    let unit = args[0];
    let duration = args[1];
    let miliseconds = 0;
    if(unit === "ms") milliseconds = duration;
    else if(unit === "s") milliseconds = duration * 1000;
    else if(unit === "m") milliseconds = duration * 60000;
    else if(unit === "h") milliseconds = duration * 3600000
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
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
    throw new Error("It seems a steal function has a non-alphanumerical first argument. Please change it to either or an integer, a dinteger or a string before retrying.");
  }
  return text.slice(start, end);
}
function occur(args) {
  let text = args[0];
  let sample = args[1];
  return text.match(new RegExp(sample, "g")).length;
}
// AST statement executer ---
async function execute(node) {
  switch(node.type) {
    case "VariableDeclaration":
      let name = node.variableName;
      let value = evaluate(node.value);
      database[name] = value;
      break;
    case "FunctionCall":
      switch(node.name) {
        case "wrt":
          const evalArgs = node.arguments.map(args => await evaluate(args));
          wrt(evalArgs);
          break;
        case "tlk":
          const evalArgs = node.arguments.map(args => await evaluate(args));
          return tlk(evalArgs);
          break;
        case "ret":
          const evalArgs = node.arguments.map(args => await evaluate(args));
          return ret(evalArgs);
          break;
        case "ext":
          let exitCode = 0;
          if(node.arguments.length > 0) {
          exitCode = await evaluate(node.arguments[0]);
          throw new Error("Program exited with error code " + exitCode +".");
          break;
        case "wait";
          const evalArgs = node.arguments.map(arg => await evaluate(arg));
          await wait(evalArgs);
          break;
        case "lngth":
          const evalArgs = node.arguments.map(arg => await evaluate(arg));
          return lgnth(evalArgs);
          break;
      }
      break;
    }
  }
}
module.exports = {execute};
