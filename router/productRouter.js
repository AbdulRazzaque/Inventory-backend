const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController')
const isAdminAuth = require("../middlewares/isAdminAuth")
const isUserAuth = require("../middlewares/isUserAuth")

router.get('/getAllProducts',productController.getAllProducts)
router.get('/getAllProductType',productController.getAllProductType)
router.post('/createProduct',isAdminAuth,productController.createProduct)
router.delete('/deleteProduct/:id',productController.deleteProduct)
router.put('/updateProduct/:id',productController.updateProduct)
// router.put('/updateProduct',isAdminAuth,productController.updateProduct)

module.exports=router;