const express = require('express');
const User = require('../controllers/user.controlller');
const validation = require('../validation/user.validation');
const upload = require('../utils/multer.Util');
const router = express.Router();

router.post("/Add", validation.checkuserForm, User.UserAdd);
router.patch("/update", User.UserUpdate);
router.delete("/deleteUser/:id", User.UserDelete);
router.get("/:id", User.UserByID);
router.post("/findUsers", User.findUsers);
router.post('/profile', upload.single('image'), User.Profile);

module.exports = router;