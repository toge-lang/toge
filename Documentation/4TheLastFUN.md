# Arrays: The Movie

P.S. but at the start: "Items" are the values inside arrays.

So, as we all know, in most languages that offer array or list variables, we have a few functions to work around with them other than I/O. 
They are either the deletion of an item in the array, adding an item, searching for an item, or the sorting of items.
So, i said, "Why not have them in Toge too?".

I present to you, the ARRAY fun:
* ``del(#vrb, [int] opt)`` ---> Deletes an item from the array, while `#vrb` is the array variable and `[int]` is the item of the array thats getting deleted, with the `[int]` being the number slot of the array it is in(starting from zero). Funny enough, this can be used to just delete variables if you dont mention the `[int]` part, but if you do, it throws an error into your face.
* ``incl(#vrb, value, type, [int] opt)`` ---> Includes a new value into an array(`#vrb`), with `value`, being, well..., `type` being the type of it, since Toge is a strictly-typed language afterall, and `[int]` being the slot of it. If the slot isnt mentioned, it will add it to the end of the list, and if it is mentioned, it is put into the slot and pushes every value in the array by 1 slot. This time the variable MUST be an array.
* ``srch(#vrb opt, value opt, type opt, [int] opt, all/miss)``---> Bare with me here. This fine dine is the search function for arrays. It 'searches' through a specified array (or all declared arrays if no variable is specified) and returns data based on `all` or `miss`. `all` returns, well.., all details of every matching item including specified parameters, while `miss` returns only the unspecified parameters of each matching item. At least one of the parameters besides `miss/all` must be specified alongside `all/miss`, or else another error will hit your face like your a clown getting hit by pies. Multiple matching items are separated by `;`, and within each match, values are separated by `, `.

There is so much yap. Just promise me you'll bare with me here.
```
vrb("fruits", arr, ["banana", "apple", 3, "banana", 4.5, "grape"])
vrb("fruits2", arr, ["banana", "mango", "strawberry"])
vrb("veggies", arr, ["carrot", "broccoli", "spinach", "lettuce"])

--- single array, value search ---
srch(#fruits, "banana", all) --- #fruits, "banana", txt, [0]; #fruits, "banana", txt, [3] ---
srch(#fruits, "banana", miss) --- txt, [0]; txt, [3] ---

--- single array, type search ---
srch(#fruits, txt, all) --- #fruits, "banana", txt, [0]; #fruits, "apple", txt, [1]; #fruits, "banana", txt, [3]; #fruits, "grape", txt, [5] ---
srch(#fruits, txt, miss) --- "banana", [0]; "apple", [1]; "banana", [3]; "grape", [5] ---

--- single array, slot search ---
srch(#veggies, [3], all) --- #veggies, "lettuce", txt, [3] ---
srch(#veggies, [3], miss) --- "lettuce", txt ---

--- single array, value + type search ---
srch(#fruits, "banana", txt, all) --- #fruits, "banana", txt, [0]; #fruits, "banana", txt, [3] ---
srch(#fruits, "banana", txt, miss) --- [0]; [3] ---

--- single array, value + slot search ---
srch(#fruits, "banana", [0], all) --- #fruits, "banana", txt, [0] ---
srch(#fruits, "banana", [0], miss) --- txt ---

--- single array, type + slot search ---
srch(#fruits, txt, [1], all) --- #fruits, "apple", txt, [1] ---
srch(#fruits, txt, [1], miss) --- "apple" ---

--- single array, everything specified ---
srch(#fruits, "banana", txt, [0], all) --- #fruits, "banana", txt, [0] ---
srch(#fruits, "banana", txt, [0], miss) --- nll ---

--- no variable, value search ---
srch("banana", all) --- #fruits, "banana", txt, [0]; #fruits, "banana", txt, [3]; #fruits2, "banana", txt, [0] ---
srch("banana", miss) --- #fruits, txt, [0]; #fruits, txt, [3]; #fruits2, txt, [0] ---

--- no variable, type search ---
srch(txt, all) --- #fruits, "banana", txt, [0]; #fruits, "apple", txt, [1]; #fruits, "banana", txt, [3]; #fruits, "grape", txt, [5]; #fruits2, "banana", txt, [0]; #fruits2, "mango", txt, [1]; #fruits2, "strawberry", txt, [2]; #veggies, "carrot", txt, [0]; #veggies, "broccoli", txt, [1]; #veggies, "spinach", txt, [2]; #veggies, "lettuce", txt, [3] ---
srch(txt, miss) --- #fruits, "banana", [0]; #fruits, "apple", [1]; #fruits, "banana", [3]; #fruits, "grape", [5]; #fruits2, "banana", [0]; #fruits2, "mango", [1]; #fruits2, "strawberry", [2]; #veggies, "carrot", [0]; #veggies, "broccoli", [1]; #veggies, "spinach", [2]; #veggies, "lettuce", [3] ---

--- no variable, value + type search ---
srch("banana", txt, all) --- #fruits, "banana", txt, [0]; #fruits, "banana", txt, [3]; #fruits2, "banana", txt, [0] ---
srch("banana", txt, miss) --- #fruits, [0]; #fruits, [3]; #fruits2, [0]; ---
```

* ``sort(#vrb, A/AA/I/R)`` --> Sorts a certain array(`#vrb` in this case), and a sorting method. `A` is alphabetically, where it starts with smallest to biggest integers and dintegers, then txt, from a, to z, to A, to Z. `I` is for Invert, where it just inverts the order of the values, `AA` is the same as Alphabetically, but numbers are after the letters, meaning txt values come first. Finally, `R` just sorts randomdly.
---
# Also More About Text
And finally, the last fun we'll have better we part ways :(
Its simple and short, so i'll explain it in the following codeblock.
... bye :(
```
wrt("Hello " + "Spaghetti!" + " :D") --- Hello Spaghetti! :D ---
vrb("txt", txt, "Spaghetti... ")
wrt("Bye, #txt :( ") --- Bye, Spaghetti... :( ---
```
---
