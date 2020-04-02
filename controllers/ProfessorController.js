const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Professor = mongoose.model('Professor');

router.get('/', (req, res) => {
    res.render("operations/addOrEdit.prof", {
        viewTitle: "Insert Professor"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var Professor = new Professor();
    Professor.Name = req.body.Name;
    Professor.Description = req.body.Description;
    Professor.save((err, doc) => {
        if (!err)
            res.redirect('operations/list.prof');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("operations/addOrEdit.prof", {
                    viewTitle: "Insert Professor",
                    Professor: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Professor.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('operations/list.prof'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("operations/addOrEdit.prof", {
                    viewTitle: 'Update Professor',
                    Professor: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Professor.find((err, docs) => {
        if (!err) {
            res.render("operations/list.prof", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Professor list :' + err);
        }
    });
});


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

router.get('/:id', (req, res) => {
    Professor.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("operations/addOrEdit.prof", {
                viewTitle: "Update Professor",
                Professor: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Professor.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/operations/list.prof');
        }
        else { console.log('Error in Professor delete :' + err); }
    });
});

module.exports = router;