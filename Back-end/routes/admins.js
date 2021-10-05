const express = require('express');
const AdminsController = require('../controllers/admins');

const router = express.Router();

// DELETE Admin
router.delete("/", AdminsController.deleteAdmin);


// POST Admin
router.post("/", AdminsController.createAdmin);


module.exports = router;
