const mongoose = require('mongoose')
const Product = require("../models/Product")
const Stock = require("../models/Stock")
const StockIn = require("../models/StockIn")
const StockOut = require("../models/StockOut")
const bcrypt = require('bcrypt');
const date = require('date-and-time');
const jwt = require("jsonwebtoken")

class ProductController{
    async getProduct (req,res){
        res.send("home routre user")
    }

    async getAllStocks(req,res){
        Stock.find({})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
    }

    async stockIn(req,res){
        const {productType,productName,productId,supplierId,supplierDocNo,quantity,price,expiry,docNo} = req.body;
        if(!productType||!productName||!productId||!supplierId||!supplierDocNo||!quantity||!price||!expiry||!docNo){
            res.status(400).send("Bad Request")
        }else{
            Stock.findOne({name:req.body.productName})
            .then(async response=>{
                const newStockIn = new StockIn({
                    name:productName,
                    productType,
                    docNo,
                    supplierDocNo,
                    supplier:supplierId,
                    quantity,
                    price,
                    expiry
                })
                const stockInResponse = await newStockIn.save()
                if(response){
                    //product already exist increase quantity and stock in
                    Stock.findOneAndUpdate({_id:response._id},{$inc:{quantity:quantity},$push:{stockIn:stockInResponse._id}})
                    .then(async stockUpdateResponse=>{
                        console.log(stockUpdateResponse)
                        await StockIn.updateOne({_id:stockInResponse._id},{$set:{prevQuantity:stockUpdateResponse.quantity}})
                        res.status(200).send({msg:'success',result:'Stock In Successfull'})
                    })
                }else{
                    //product doesn't exist stock in and create
                        const newStock = new Stock({
                            name:productName,
                            product:mongoose.Types.ObjectId(productId),
                            quantity,
                            stockIn:[stockInResponse._id]
                        })
                        newStock.save()
                        .then(newStockResponse=>{
                            res.status(200).send({msg:'success',result:'Stock In Successfull'})
                        })
                }
            })
        }
        
    }

    async stockOut(req,res){
        const {unit,productName,productId,docNo,locationId,quantity,stockId,date,trainerName,doctorName}=req.body;
        if(!unit || !productName||!productId||!docNo||!locationId||!quantity||!stockId||!date||!trainerName||!doctorName){
            res.status(400).send("Bad Request")
        }else{
            const newStockOut = new StockOut({
                name:productName,
                docNo,
                location:locationId,
                quantity,
                date,
                trainerName,
                doctorName,
                unit
            })
            newStockOut.save()
            .then(stockoutresponse=>{
                Stock.findOneAndUpdate({stockId:mongoose.Types.ObjectId(stockId)},{$inc:{quantity:-quantity},$push:{stockOut:stockoutresponse._id}})
                .then(async stockupdateresponse=>{
                    console.log(stockupdateresponse)
                    await StockOut.updateOne({_id:stockoutresponse._id},{$set:{prevQuantity:stockupdateresponse.quantity}})
                    res.status(200).send({msg:'success',result:'Stock Out Successfull'})
                })
            })
        }
    }

    async getStockInDocNo(req,res){
        StockIn.countDocuments()
        .then(response=>{
            res.status(200).send({msg:'success',result:response})
        })
    }
    async getStockOutDocNo(req,res){
        StockOut.countDocuments()
        .then(response=>{
            res.status(200).send({msg:'success',result:response})
        })
    }

    async getMonthlyReport(req,res){
        const now = new Date('2023-01-08T13:44:04.338+00:00');
        //let d1 = date.format('1673169305202', 'YYYY/MM/DD HH:mm:ss');
        //let d2 = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        let d1 = date.parse('2023/01/07', 'YYYY/MM/DD');
        let d2 = date.parse('2023/01/10', 'YYYY/MM/DD');
        //console.log(d2,d3)
        StockOut.find({$and:[{createdAt:{$gt:d1}},{createdAt:{$lt:d2}}]})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
    }

    async getStockReport(req,res){
        const now = new Date('2023-01-08T13:44:04.338+00:00');
        //let d1 = date.format('1673169305202', 'YYYY/MM/DD HH:mm:ss');
        //let d2 = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        let d1 = date.parse('2023/01/07', 'YYYY/MM/DD');
        let d2 = date.parse('2023/01/10', 'YYYY/MM/DD');
        //console.log(d2,d3)
        StockOut.find({location:mongoose.Types.ObjectId("63bab677ddbd21fd91263424"),trainerName:"Google Cloud",$and:[{createdAt:{$gt:d1}},{createdAt:{$lt:d2}}]})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
    }

    async currentStockList(req,res){
        Stock.find({}).populate("stockIn").populate("stockOut")
        .populate({ 
            path: 'stockIn',
            populate: {
              path: 'supplier',
              model: 'Supplier'
            } 
         })
        .populate({ 
            path: 'stockOut',
            populate: {
              path: 'location',
              model: 'Location'
            } 
         })
        // Stock.aggregate([
        //     {$lookup:{
        //         from:"stockins",
        //         localField:"stockIn",
        //         foreignField:"_id",
        //         as:"stockIn"
        //     }},
        //     {$lookup:{
        //         from:"stockouts",
        //         localField:"stockOut",
        //         foreignField:"_id",
        //         as:"stockIn"
        //     }},
        //     {
        //         $unwind:"$stockIn"
        //     },
        //     {$lookup:{
        //         from:"locations",
        //         localField:'stockIn.location',
        //         foreignField:"_id",
        //         as:'stockIn.location'
        //     }},
        //     {
        //         $wind:"$stockIn"
        //     }
        // ])
        .then(response=>{
            res.status(200).send({msg:'success',result:response})
        })
    }
    // $lookup:{
    //     from:"books",
    //     localfield:"favbooks",
    //     foreignField:"_id",
    //     as:"favbooks"
    // }

}

const productController = new ProductController();
module.exports=productController;