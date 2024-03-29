const express = require('express')
const router = express.Router();
const locationController = require('../controllers/locationController')
const isAdminAuth = require("../middlewares/isAdminAuth")
const isUserAuth = require("../middlewares/isUserAuth")

router.get('/getAllLocations',locationController.getAllLocations)
router.post('/createLocation',isAdminAuth,locationController.createLocation)
// router.post('/deleteLocations',isAdminAuth,locationController.deleteLocations)
router.put('/UpdateLocation/:id',locationController.UpdateLocation)
router.delete('/deletelocationone/:id',locationController.deletelocationone)

module.exports=router;