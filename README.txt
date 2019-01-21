Node js example of a rest api using express server. It uses mongoose to access mongodb.


Run:
> node index
or for automatic server restart:
> nodemon index


I could not get:
> node-debug index.js
working.  It works for executing a standalone js file.



I had trouble getting mongoose to work,  I had to change req.body to req.query.

mongooseTest.js and mongodbTest.js
are stand alone tests of two interfaces to mongodb.
