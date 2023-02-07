const express = require('express');
const Job = require('../controllers/jobs.controller');
const validation = require('../validation/job.validation');
const router = express.Router();


router.post('/addjob', validation.checkJobform, Job.JobAdded);
router.patch('/updatejob', validation.checkJobform, Job.JobUpdate);
router.delete('/delete/:id', Job.JobDelete);
router.get('/getbyid/:id', Job.findbyID);
router.post('/findAll', Job.findAll);
module.exports = router;