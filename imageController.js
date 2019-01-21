// imageController.js

// Import image model
Image = require('./imageModel');

// Handle index actions
// Return all the images .. change to search
exports.index = function (req, res) {
    Image.get(function (err, images) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Images retrieved successfully",
            data: images
        });
    });
};

// Handle create image actions
exports.new = function (req, res) {
  var image = new Image();
  for (field in req.body){
    image[field] = req.body[field];
  for (field in req.query){
    image[field] = req.query[field];

  // save the image and check for errors
  image.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: 'New image created!',
      data: image
    });
  });
};

// Handle view image info
exports.view = function (req, res) {
    Image.findById(req.params.image_id, function (err, image) {
        if (err)
            res.send(err);
        res.json({
            message: 'Image details loading..',
            data: image
        });
    });
};

// Handle update image info
exports.update = function (req, res) {
  Image.findById(req.params.image_id, function (err, image) {
    if (err)
      res.send(err);

    for (field in req.body){
      image[field] = req.body[field];
      for (field in req.query){
        image[field] = req.query[field];

    // save the image and check for errors
    image.save(function (err) {
      if (err)
        res.json(err);
      res.json({
        message: 'Image Info updated',
        data: image
      });
    });
  });
};

// Handle delete image
exports.delete = function (req, res) {
  Image.remove({
    _id: req.params.image_id
  }, function (err, image) {
    if (err)
      res.send(err);
    res.json({
      status: "success",
      message: 'Image deleted'
    });
  });
};
