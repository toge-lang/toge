const fs = require('fs');
const {tokenize} = require('./SOURCE/V1/lexer.js');
const {parseProgram} = require('./SOURCE/V1/parser.js');
const {execute} = require('./SOURCE/V1/interpreter.js');

const source = fs.readFileSync(process.argv[2], 'utf-8');
const tokens = tokenize(source);
const ast = parseProgram(tokens);
execute(ast);
