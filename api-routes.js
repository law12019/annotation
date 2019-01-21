

// api-routes.js
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
	status: 'API Its Working',
	message: 'Welcome to RESTHub crafted with love!',
    });
});




// Import image controller
var imageController = require('./imageController');

// Contact routes
router.route('/image')
    .get(imageController.index)
    .post(imageController.new);
router.route('/image/:image_id')
    .get(imageController.view)
    .patch(imageController.update)
    .put(imageController.update)
    .delete(imageController.delete);



// Import contact controller
var contactController = require('./contactController');

// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

// Export API routes
module.exports = router;
