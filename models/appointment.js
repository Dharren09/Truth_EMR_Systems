var express = require('express');
var router = express.Router();
var db = require.main.require('./controllers/db_controller');
var bodyParser = require('body-parser');

router.get('*', function(req, res, next){
    if(req.cookies['username'] == null){
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/', function(req, res){
    db.getallappointment(function(err, result){
        console.log(result);
        res.render('appointment.ejs', {list :result});
    })
});

router.get('/schedule_appointment', function(req, res){
    res.render('schedule_appointment.ejs');
});

router.post('/schedule_appointment', function(req, res){
    db.schedule_appointment(
        req.body.patient_name,
        req.body.health_worker_name,
        req.body.department,
        req.body.department,
        req.body.time,
        req.body.email,
        req.body.phone,
        function(err, result){
           res.redirect('/appointment'); 
        });
});

router.get('/edit_appointment/:id', function(req, res){
    var id = req.params.id;
    db.getappointmentbyid(id, function(err, result){
        console.log(result);
        res.render('edit_appointment.ejs', {list : result});
    });
});

router.post('/edit_appointment/:id', function(req, res){
    var id = req.params.id;
    db.editappointment(
        req.body.patient_name,
        req.body.health_worker_name,
        req.body.department,
        req.body.department,
        req.body.time, 
        req.body.email,
        req.body.phone,
        function(err, result){
            res.redirect('/appointment');
        });
});

router.get('/delete_appointment/:id', function(res, req){
    var id = req.params.id;
    db.getappointmentbyid(id, function(err, result){
        console.log(result);
        res.render('delete_appointment.ejs', {list : result});
    });
});

router.post('/delete_appointment/:id', function(req, res){
    var id = req.params.id;
    db.deleteappointment(id, function(err, result){
        res.redirect('/appointment');
    });
});