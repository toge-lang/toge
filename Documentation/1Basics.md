# The Basics
All the basics(functions and variables), will be covered here.
So lets begin with the FUN...

...ctions. You thought you were gonna have fun huh? you thought you were gonna be enjoying life huh? No, now open VScode and get to work.

---
## Functions
> [!NOTE]
> any functions including opt after a part in the brackets, that means that part is optional to put. By "that part", it means starting from the last comma, or first bracket if there arent commas.
---
Currently, there are 5 default, basic functions. Not all functions are covered here.
* ``wrt("")`` --> the print/output function for Toge. Can output an image if the value is a `med` type variable thats an image.
* ``tlk(l/n, "" opt)`` --> The ask/input function for Toge. L is for inputs requiring letters/characters, and N for number inputs.
* ``ret(any)`` --> Instead of return being a keyword, in Toge, `return` is a function. It still has the same use, the value just goes in the brackets.
* ``wait(m opt, n)`` --> The wait function for Toge. In Toge, you can specify a measuring unit for the wait, although optional, either `ms`(milisecond), `s`(second), `m`(minute), or `h`(hour).
* ``vrb("", type, value opt)`` --> instead of being just a simple variable pronounce like ``let a = b``, it uses a function, with the text in "" being the variable name, and the type MUST be set to `int` for numbers, `dint`(decimal integer) for numbers with decimals, `txt` for a text, `stt`(state) for true/false, `arr` for an array, `obj` for an object(variable with multiple values), and `med`(media) for images or audio(requiring the `IMG`, and respectively the `AUD` box for each), or `code`, but thats for later. In most cases, the value is optional, but for media, it is *mandatory* to be a placeholder image/audio file, and the value must be either a `dps()` or an `aud()` function. In cases of the object type, there can be *multiple* values, each split by eachother with a ";".
---
### Boxes
Boxes are the packages of Toge. Its just a different name. Currently there are 3 boxes in Toge, each one being accesed with different values inside the `box()` function.
* ``box("TM")`` --> imports the ``Ctm(AM/PM opt)`` function, getting the current time in the device's timezone. Default displays military time, but can be specified for AM/PM("AM/PM" needs to be introduced, not just "AM" or "PM")
* ``box("IMG")`` --> imports the ``dsp(url/lcl/srv, filepath, yXz px opt)`` function, which displays an image, either from an url, a local file, or a "server" file, a file found in the same folder/accesible database as the code file. the filepath is either the url or the file name and filepath. you can specify the width pixels by the y value, and the height by the z value. the X is mandatory, alongside "px". Only .png, .jpg, or .jpeg are allowed file types.(only "url", "lcl", or "srv" may be specified, not more at once)
* ``box("AUD")`` --> imports the ``aud(url/lcl/srv, filepath, N db opt, n% spd opt)`` function, which plays an audio file, with the filepath thing being the same thing as ``dsp()``, and db, spd, and rvrb, each respectively control the volume, the speed, and the reverb(sound echo) of it. Only .mp3 and .mid are allowed file types.
Unlike other languages, the `box()` function can be put anywhere in the code, even in the middle, but it throws an error if you use any of the imported functions before the needed value put inside a `box()`, e.g. using `dsp()` before using `box("IMG")`.
---
## Variables
> [!NOTE]
> This information is based on assuming you already have read the info for the default ``vrb()`` function, seen [above](#functions).

Alright, so we already learned how to declare/pronounce variables, now, how do we use them?
Its quite simple actually.
```
#name = "Hello World!"
---variable names, even in functions(except declaration), are always are beginned with a # to both help readabillity AND parser problems---

wrt(#name)
---outputs: Hello World!---
```
The question is: *how do we update them?*
Its actually just like in other languages, with the good ol' equation... thingy.
```
vrb("twoplus2", int, 5) --- Uh oh! Little timmy is bad at kindergarten math.. ---
#twoplus2 = 4 --- since were his tutor, we correct them ---
vrb("SchoolSign", txt, "Welcome students to Dips and Hits University!") --- hehe lets do a sick prank bro... ---
#SchoolSign = "i am DipsHit!" --- LMAO ---
```
---

Heres a program that declares and uses all variable types:

```
---long one here, bare with me ---
vrb("text", txt, "Hi!Im a text!")
vrb("integer", int, 55)

vrb("decimal_integer", dint, 55.5)
vrb("array", arr, [13, "im the second part of the array", 68.4])

vrb("object", obj, {"property_list"{"property1": "value1", "property2": "value2", "property3": "value3"}, "property_list2"{"special_property"{"wow": "look at me"}, "property4": "value4"}}) --- While theoretically object properties can be nested forever, i do not reccomend ---
vrb("image", med, dsp(lcl, "C:\Users\Documents\smiley_face.png"))


wrt(#text) --- every comment from this point in this block will be the output: Hi!Im a text! ---
wrt(#integer) --- 55 ---

wrt(#decimal_integer) --- 55.5 ---
wrt(#array[0]) --- 13 ---

wrt(#array[1]) --- im the second part of the array ---
wrt(#array[2]) --- 68.4 ---

wrt(#array) --- 13 (new line) im the second part of the array (new line) 68.4 ---
wrt(#object) --- {15, 7863.98, 51} ---

wrt(#object{property_list{property1}}) --- value1 ---
wrt(#object{property_list2{}}) --- special_property---

wrt(#image) --- pretend the smiley_face.png image is here ---
```
---
