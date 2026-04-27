# Functions 2: Electric Bogalio
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
vrb("heloworl", code, ret("Hello World!")
```
Its like declaring a function, but it doesnt have any actual output, not on its own, you can't just paste `#code` on a new line and call it a day.
this type is literally made for this exact purpose: to make the value parameter of the `newf()` function be shorter, and not the megalodons of code in curly braces like other languages.
anyways, lets get back to where we left from:
```
-d we're all set... or are we? ---
--- while its simple for stuff like we just did with wrt2(), what if we want, idk, to make a function with multiple values and a change each time? like an add() function? dont worry i gotchu fam ---
vrb("value1", int)
vrb("value2", int)
vrb("code", code, ret(#value1+#value2))
value1 = tlk(n, "first value is...? ")
value2 = tlk(n, "second value is...? ")
newf("add", #code)
```
That was a hard one.
I think i MIGHT be losing my mind more and more with each new file.
