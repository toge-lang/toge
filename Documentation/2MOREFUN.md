# Functions 2: Electric Bogaloo
Again, you thought you were gonna fun weren't you? No. now read the rest of the page and cry about weird errors i didnt think about.
It's time for **FUNCTION DECLARING**. It's not complex, but like, i am NOT reccomending you to learn this, its just for me, the you part is a side.
Function declaring can be done with the ``newf()`` function, which i will just explain in the following codeblock.
```
newf() --- hmm, a blank function, how about we add some stuff to it? newf is short for New Function. ---
newf("wrt2") --- alright, we are naming the new function wrt2: electric bogaloo. ---
newf("wrt2", #code) --- now we add the code for it an-
```
**PAUSE. PAUSE. WHAT THE FUCK IS THAT.**
hmmm, with my eyes i obserb a variable under the name "code".
Does that mean...
hell yeah it does.
In the basics, i forgot to mention the `code` type, which is just lines of code put as a variable, so you save space in the editor with the same parser result.
```
vrb("heloworl", code, ret("Hello World!"))
```
Its like declaring a function, but it doesnt have any actual output, not on its own, you can't just paste `#code` on a new line and call it a day.
this type is literally made for this exact purpose: to make the value parameter of the `newf()` function be shorter, and not the megalodons of code in curly braces like other languages.
Always, the first function in a code variable is started with the `ret()` function, and any piece of code in it is FORCED to be inside it, as without it it wouldnt be part of the variables value.
anyways, lets get back to where we left from:
```
-d we're all set... or are we? ---
--- while its simple for stuff like we just did with wrt2(), what if we want, idk, to make a function with multiple values and a change each time? like an add() function? dont worry i gotchu fam ---
vrb("code", code, ret($p1+$p2)) --- if we want to refer to parameters of a function that hasnt been declared yet, we add $ at the start ---
newf("add", #code, {p1: int, p2: int}) --- p stands for parameter ---
add(3, 2) --- it works now trust me bro. anyways, the result is CLEARLY 6 ---
```
That was a hard one.
I think i MIGHT be losing my mind more and more with each new file.
Now, a code variable with multiple lines:
```
vrb("code", code, ret(blk[ --- blk[] is for the pure purpose of having multiline code variables, short for 'block' ---
    $p1 = $p1 * 9 / 5 + 32
    wrt($p1)
]))
newf("ToFahrenheit", #code, {p1: dint})
```
---
Now, i hear you. "What if we want optional parameters??". I'll now show you.
```
vrb("code", code, ret(blk[
    $p1 = $p1 * 9 / 5 + 32
    wrt($p1)
    optblk[
        opt($p2)
        $p1 = $p1 * 9 / 5 + $p2
        --- Yes, parameters CAN be reassigned with different values ---
        wrt($p1)
    ] 
]))
newf("toFahrenheit", #code, {p1: dint, p2: int})
```
Toge is fortunately very readable, so just staring at this for 1 minute MAX you can understand the logic.
`opt()` is a function that only allows parameters, such as `$p1`. It can only be put inside optional blocks, only once, and the parameter put inside it, is the optional parameter for that optional block.
Outside of function declaration, you can, no, you **MUST** reference parameters with a cha-ching(`$`) behind the p1 or p2 or... you get it.
And to clear any confusion, here are some additional details:
    1. Parameters are named after order. the first would be p1, the second p2... you cant name them LittleTwinkleStar1, sadly. Their name is automatic.
    2. In the case of the use of a user-made function, if you do not provide optional parameters, then, suprise, optional blocks(`optblk[]`) for that parameter will be skipped.
