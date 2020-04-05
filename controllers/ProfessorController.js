//Import the dependencies
const express = require('express');
const mongoose = require('mongoose');
//Creating a Router
var router = express.Router();
//Link
const Professor = mongoose.model('Professor');
 
//Router Controller for READ request
router.get('/',(req, res) => {
res.render("professor/courseAddEdit", {
viewTitle: "Insert a New Professor"
});
});
 
//Router Controller for UPDATE request
router.post('/', (req,res) => {
if (req.body._id == '')
insertIntoMongoDB(req, res);
else
updateIntoMongoDB(req, res);
});
 
//Creating function to insert data into MongoDB
function insertIntoMongoDB(req,res) {
var professor = new Professor();
professor.Name = req.body.Name;
professor.Description = req.body.Description;
course.save((err, doc) => {
if (!err)
res.redirect('professor/list');
else
console.log('Error during record insertion : ' + err);
});
}
 
//Creating a function to update data in MongoDB
function updateIntoMongoDB(req, res) {
Course.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
if (!err) { res.redirect('professor/list'); }
else {
if (err.name == 'ValidationError') {
handleValidationError(err, req.body);
res.render("professor/professorAddEdit", {
//Retaining value to be displayed in the child view
viewTitle: 'Update Professor Details',
employee: req.body
});
}
else
console.log('Error during updating the record: ' + err);
}
});
}
 
//Router to retrieve the complete list of available courses
router.get('/list', (req,res) => {
Course.find((err, docs) => {
if(!err){
res.render("professor/list", {
list: docs
});
}
else {
console.log('Failed to retrieve the Professor List: '+ err);
}
});
});
 
//Creating a function to implement input validations
function handleValidationError(err, body) {
for (field in err.errors) {
switch (err.errors[field].path) {
case 'Name':
body['NameError'] = err.errors[field].message;
break;
default:
break;
}
}
}
 
//Router to update a Professor using it's ID
router.get('/:id', (req, res) => {
Course.findById(req.params.id, (err, doc) => {
if (!err) {
res.render("professor/professorAddEdit", {
viewTitle: "Update Professor Details",
course: doc
});
}
});
});
 
//Router Controller for DELETE request
router.get('/delete/:id', (req, res) => {
Course.findByIdAndRemove(req.params.id, (err, doc) => {
if (!err) {
res.redirect('/professor/list');
}
else { console.log('Failed to Delete Professor Details: ' + err); }
});
});
 
module.exports = router;