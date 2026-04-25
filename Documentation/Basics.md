# The Basics
All the basics(aka functions, boxes, variable stuff), all will be covered here.
So lets begin with the FUN.

---
## Functions
> [!IMPORTANT]
> This article will be updated as the development progresses. Currently, everything in the documentation is for the first alpha release of Toge. Functions are not the only case in which this is true.

> [!NOTE]
> any functions including opt after a part in the brackets, that means that part is optional to put. By "that part", it means starting from the last comma, or first bracket if there arent commas.
---
Currently, there are 4 default functions.
* ``wrt("")`` --> the print/output function for Toge.
* ``tlk(l/n, "" opt)`` --> The ask/input function for Toge. L is for inputs requiring letters/characters, and N for number inputs.
* ``ret(any)`` --> Instead of return being a keyword, in Toge, `return` is a function. It still has the same use, the value just goes in the brackets.
* ``wait(m opt, n)`` --> The wait function for Toge. In Toge, you can specify a measuring unit for the wait, although optional, either `ms`(milisecond), `s`(second), `m`(minute), or `h`(hour).
---
### Boxes
Boxes are the packages of Toge. Its just a different name. Currently there are 3 boxes in Toge.
* ``!box TM`` --> imports the ``Ctm(AM/PM opt)`` function, getting the current time in the device's timezone. Default displays military time, but can be specified for AM/PM("AM/PM" needs to be introduced, not just "AM" or "PM")
* ``!box IMG`` --> imports the ``dsp(url/lcl/srv, filepath, yXz px opt)`` function, which displays an image, either from an url, a local file, or a "server" file, a file found in the same folder/accesible database as the code file. the filepath is either the url or the file name and filepath. you can specify the width pixels by the y value, and the height by the z value. the X is mandatory, alongside "px". Only .png, .jpg, or .jpeg are allowed file types.(only "url", "lcl", or "srv" may be specified, not more at once)
* ``!box AUD`` --> imports the ``aud(url/lcl/srv, filepath, N db opt, n% spd opt, n% rvrb opt)`` function, which plays an audio file, with the filepath thing being the same thing as ``dsp()``, and db, spd, and rvrb, each respectively control the volume, the speed, and the reverb(sound echo) of it. Only .mp3 and .mid are allowed file types.
---
