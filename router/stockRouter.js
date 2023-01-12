const express = require('express')
const router = express.Router();
const stockController = require('../controllers/stockController')
const isAdminAuth = require("../middlewares/isAdminAuth")
const isUserAuth = require("../middlewares/isUserAuth")

router.get('/getAllStocks',stockController.getAllStocks)
router.post('/stockIn',isUserAuth,stockController.stockIn)
router.post('/stockOut',isUserAuth,stockController.stockOut)
router.get('/getStockInDocNo',isUserAuth,stockController.getStockInDocNo)
router.get('/getStockOutDocNo',isUserAuth,stockController.getStockOutDocNo)
router.get('/getMonthlyReport',isUserAuth,stockController.getMonthlyReport)
router.get('/getStockReport',isUserAuth,stockController.getStockReport)
router.get('/currentStockList',isUserAuth,stockController.currentStockList)

module.exports=router;