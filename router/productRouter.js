const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController')
const isAdminAuth = require("../middlewares/isAdminAuth")
const isUserAuth = require("../middlewares/isUserAuth")

router.get('/getAllProducts',productController.getAllProducts)
router.post('/createProduct',isAdminAuth,productController.createProduct)

module.exports=router;