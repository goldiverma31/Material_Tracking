const express = require('express');
const Vendor = require('../controllers/vendor.controller');
const validation = require('../validation/vendor.validation');
const router = express.Router();


router.post('/vendorAdd', validation.checkvendorform, Vendor.AddVendor);
router.patch('/update', Vendor.UpdatVendor);
router.delete('/delete/:id', Vendor.DeleteVendor);
router.get('/getbyid/:id', Vendor.findById);
router.post('/findAll', Vendor.FindAll);

module.exports = router;