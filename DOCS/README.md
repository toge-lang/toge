# Introduction

Toge(or sharp/thorny in Japanese) is  a future programming language destined to be high-level, simple, and uncompetitive, like its just its own thing, not an alternative to javascript.  
I honestly dont care whether you use it or not. If you do, okay, if you don't, okay.

## Syntax Introduction

***THE  
AMAZING  
DIGITAL...***  
series of example programs:
1. **I/O**:
```
---Comment---
wrt("Hello World!"); --- outputs Hello World! ---

tlk(l, "What's your name? "); --- outputs What's your name? and then allows input, expecting letters and numbers ---
tlk(n, "How old are you? "); --- outputs How old are you? and then allows input, expecting only numbers. If it does meet letters, they transforms to numbers --

ext(); --- ends the program, practically exiting it ---
```
2. **ARITHMETICS**:
```
wrt(1 + 0); --- 1 ---
wrt(4 - 2); --- 2 ---
wrt(2 * 1.5); --- 3 ---
wrt(2 ^ 2); --- 4 ---
wrt(14 % 9); --- 5 ---
wrt(12 / 2); --- 6 ---
wrt(((3 + 3) * 2) + 5 - 10); --- 7 ---

ext();
```
3. **VARIABLES**:
```
vrb("A", int, 74); --- declares new variable named A and gives it the value 74 ---
vrb("B", txt, '57'); --- declares new variable named B and gives it the value "57" ---

wrt(#A + #B); --- tries to add A and B together, but one's a string and one's a number, so the program throws an error ---
wrt(#A - 32); --- 42 ---
wrt(#B + "4"); --- 574 (string, but output doesn't show the quotes) ---
wrt('Oh, it seems I accidentally took RAGATHA, and DROPPED her into the DEEPFRYER for the ' + #B + 'th time!'); --- Oh, it seems I accidentally took RAGATHA, and DROPPED her into the DEEPFRYER for the 57th time! ---

vrb("C", dint, 3.14); --- declares new variable named C and gives it the value 3.14, with dint being a decimal integer ---
wrt("I love me some god ol' apple " + #C + "!"); --- sadly, the output is not apple pi, and instead just an error. ---
wrt(#A + #C); --- 

ext()
```
4. **CONDITIONALS**:
```
vrb("daniel", txt, 'Daniel');
vrb("theCoolerDaniel", txt, '01010100 01101000 01100101 00100000 01100011 01101111 01101111 01101100 01100101 01110010 00100000 01000100 01100001 01101110 01101001 01100101 01101100');

if(#daniel ? #theCoolerDaniel) [] --- returns(does not output): false (empty if brackets just return true if true, false if false) ---
bif(#daniel ? #daniel) [] --- returns: true (bif stands for but if)---
bif(#theCoolerDaniel > #daniel) [] --- outputs an error because they are not comparable values ---
else [wrt("welp that was a waste of time")] --- welp that was a waste of time ---

ext();
```
5. **LOOPS**:
```
vrb("FizzBuzz", code, blk[
  vrb("i", int, 0);
  while(i <= $p1) [
    if(i % 3 ? 0 +++ i % 5 ? 0) [wrt("FizzBuzz")]
    bif(i % 3 ? 0) [wrt("Fizz")]
    bif(i % 5 ? 0) [wrt("Buzz")]
    else [wrt(#i)]
    i += 1;
  ]
]);
newf("FizzBuzz", #Fizzbuzz, {p1: int});
--- or, it could be the line below instead, because the variable name and the function name are matching ---
newf("FizzBuzz", {p1: int});

FizzBuzz(15)
---
OUTPUT:
0
1
2
Fizz
4
Buzz
6
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```
6. **ARRAYS**
```
vrb("Fibonacci", code, blk[
  if($p1 <= 0) ret([]);
  if ($p1 === 1) ret([0]);
  vrb("sequence", arr, [0, 1]);
  vrb("i", int, 2);
  while(i < $p1) [
    incl(#sequence, #sequence[i-1] + #sequence[i-2], int);
  ]
  ret(#sequence);
]);
```









Good luck to whoever is learning this , you'll need it.
Also, the numbers in the file names are suppose to be in what order you read and learn them in.
