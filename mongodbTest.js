var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";



MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    /*
    dbo.createCollection("customers", function(err, res) {
	if (err) throw err;
	console.log("Collection created!");
	db.close();
    });
    */
    
    /* insert item 
    var myobj = { name: "Kitware Inc", address: "Park Lane 38" };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
	if (err) throw err;
	console.log("1 document inserted");
	db.close();
    });
    */
    /*
    dbo.collection("customers").findOne({}, function(err, result) {
	if (err) throw err;
	console.log(result.name);
	db.close();
    });
    */

    /*
    var query = { address: "Park Lane 38" };
    dbo.collection("customers").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
    */

    var mysort = { name: 1 };
    dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
	if (err) throw err;
	console.log(result);
	db.close();
    });

    /*
    var myquery = { address: "Valley 345" };
    var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
    dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
	if (err) throw err;
	console.log("1 document updated");
	db.close();
    });
    */
    
    /*
    var myquery = { address: 'Mountain 21' };
    dbo.collection("customers").deleteOne(myquery, function(err, obj) {
	if (err) throw err;
	console.log("1 document deleted");
	db.close();
    });
    */
});


