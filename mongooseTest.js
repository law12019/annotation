

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test2', { useNewUrlParser: true });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});



var kittySchema = new mongoose.Schema({name: String},
				      {versionKey: false});





/*
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}
*/




var Kitt = mongoose.model('Kit', kittySchema);



//Kitten.create({category: 1, title: 'Minion'}, function(err, doc) {
//    // At this point the Kitten collection is created.
//});



var silence = new Kitt({ name: 'Silence' });
console.log(silence.name); // 'Silence'
silence.save(function(err) {
    if (err) throw err;
    console.log('Silence successfully saved.');
});






var fluffy = new Kitt({ name: 'fluffy' });
fluffy.save(function(err) {
    if (err) throw err;
    console.log('Fluffy successfully saved.');
});


//fluffy.speak(); // "Meow name is fluffy"





/*
Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
})



Kitten.find({ name: /^fluff/ }, callback);
*/


