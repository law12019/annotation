// contactController.js

// Import contact model
Contact = require('./contactModel');

// Handle index actions
// /contacts get
exports.index = function (req, res) {
    console.log("/contacts get")
    Contact.get(function (err, contacts) {
	console.log("contact get")
	if (err) {
	    res.json({
		status: "error",
		message: err,
	    });
	}
	res.json({
	    status: "success",
	    message: "Contacts retrieved successfully",
	    data: contacts
	});
    });
};

// Handle create contact actions
// /contacts post
exports.new = function (req, res) {
  console.log("/contacts post")
  var contact = new Contact();
  contact.name = req.body.name ? req.body.name : contact.name;
  contact.name = req.query.name ? req.query.name : contact.name;

  contact.email = req.query.email ? req.query.email : contact.email;
  contact.email = req.body.email ? req.body.email : contact.email;

  //contact.gender = req.body.gender;
  //contact.phone = req.body.phone;
  // save the contact and check for errors
  contact.save(function (err) {
	  if (err) throw err;
	  // if (err)
	  //     res.json(err);
	  res.json({
	    message: 'New contact created!',
	    data: contact
	  });
  });
};

// Handle view contact info
// /contacts/:contact_id get
exports.view = function (req, res) {
    console.log("/contacts/:contact_id get")
    Contact.findById(req.params.contact_id, function (err, contact) {
	if (err)
	    res.send(err);
	res.json({
	    message: 'Contact details loading..',
	    data: contact
	});
    });
};

// Handle update contact info
// /contacts/:contact_id patch
// /contacts/:contact_id put
exports.update = function (req, res) {
    console.log("/contacts/:contact_id patch/put")
    Contact.findById(req.params.contact_id, function (err, contact) {
	if (err)
	    res.send(err);
	contact.name = req.body.name ? req.body.name : contact.name;
	//contact.gender = req.body.gender;
	contact.email = req.body.email;
	//contact.phone = req.body.phone;
	// save the contact and check for errors
	contact.save(function (err) {
	    if (err)
		res.json(err);
	    res.json({
		message: 'Contact Info updated',
		data: contact
	    });
	});
    });
};

// Handle delete contact
// /contacts/:contact_id delete
exports.delete = function (req, res) {
    console.log("/contacts/:contact_id delete")
    Contact.remove({
	_id: req.params.contact_id
    }, function (err, contact) {
	if (err)
	    res.send(err);
	res.json({
	    status: "success",
	    message: 'Contact deleted'
	});
    });
};
