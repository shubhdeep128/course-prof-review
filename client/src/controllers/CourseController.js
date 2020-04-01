const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Course = mongoose.model('Course');

router.get('/', (req, res) => {
    res.render("operations/addOrEdit", {
        viewTitle: "Insert Course"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var Course = new Course();
    Course.Name = req.body.Name;
    Course.Description = req.body.Description;
    Course.Average_grade = req.body.Average_grade;
    Course.save((err, doc) => {
        if (!err)
            res.redirect('operations/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("operations/addOrEdit", {
                    viewTitle: "Insert Course",
                    Course: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Course.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('operations/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("operations/addOrEdit", {
                    viewTitle: 'Update Course',
                    Course: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Course.find((err, docs) => {
        if (!err) {
            res.render("operations/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Course list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Course.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("operations/addOrEdit", {
                viewTitle: "Update Course",
                Course: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/operations/list');
        }
        else { console.log('Error in Course delete :' + err); }
    });
});

module.exports = router;