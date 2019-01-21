// imageModel.js
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// Setup schema
var imageSchema = mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now
  },
  dimensions: [Number],
  girder_id: ObjectId,
  filename: String,
  directories: [String]

  // TODO: Figure out how to use discriminators.
  //type: {
  //  type: String,
  //  required: true
  //},
  //latlon_ul: [Number],
  //latlon_ur: [Number],
  //latlon_ll: [Number],
  //latlon_lr: [Number],
  //gsd: Number,
});


// Export Image model
var Image = module.exports = mongoose.model('image', imageSchema);

module.exports.get = function (callback, limit) {
  Image.find(callback).limit(limit);
}










// Discriminator

/*
const baseOptions = {
  discriminatorKey: 'itemtype', // our discriminator key, could be anything
  collection: 'items', // the name of our collection
};

// Our Base schema: these properties will be shared with our "real" schemas
const Base = mongoose.model('Base', new mongoose.Schema({
      title: "{ type: String, required: true },
"
      date_added: { type: Date, required: true },
      redo: { type: Boolean, required: false },
    }, baseOptions,
  ),
);


//

module.exports = mongoose.model('Base');

const Base = require('./base'); // we have to make sure our Book schema is aware of the Base schema

const Book = Base.discriminator('Book', new mongoose.Schema({
    author: { type: String, required: true },
  }),
);

module.exports = mongoose.model('Book');
*/
