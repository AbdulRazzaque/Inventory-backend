const mongoose = require('mongoose')
const Product = require("../models/Product")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const _ = require("lodash")
class ProductController{
    async getProduct (req,res){
        res.send("home routre user")
    }

    async createProduct(req,res){
   
   
        const {name,companyName,type,unit}=req.body;
        if(!name || !companyName || !type || !unit){
            res.status(400).send("Data Missing")
        }

            // const exist = await Product.exists({name:req.body.name,companyName:req.body.companyName,type:req.body.type,unit:req.body.unit})
            const exist = await Product.exists({name:{ $regex: new RegExp(`^${name}$`, 'i')},companyName:{ $regex: new RegExp(`^${companyName}$`, 'i')},type:{ $regex: new RegExp(`^${type}$`, 'i')},unit:{ $regex: new RegExp(`^${unit}$`, 'i')}})
            if(exist){
                res.status(400).send({ message: 'This product is already available' });
            }
        
        
        // else{
            //console.log(_.difference(['223','23','3'],['223','23','s']))
            // Product.findOne({name})
            // .then(response=>{
            //     if(response){
            //         Product.updateOne({name},{$push:{type,unit,companyName}})
            //         .then(updateResponse=>{
            //             if(updateResponse.modifiedCount>0){
            //                 res.status(200).send({msg:"success",result:'Updated'})
            //             }else{
            //                 res.status(400).send("Bad Request")
            //             }
                        
            //         })
            //     }
                else{
                    const newProduct = new Product({
                        name,
                        companyName,
                        type,
                        unit
                    })
                    newProduct.save()
                    .then(newProdResponse=>{
                        res.status(200).send({msg:"success",result:newProdResponse})
                    })
                }
            }
    async updateProduct(req,res){
      

        const {name,companyName,type,unit}=req.body;
        if(!name || !companyName || !type || !unit){
            res.status(400).send("Data Missing")
        }

            // const exist = await Product.exists({name:req.body.name,companyName:req.body.companyName,type:req.body.type,unit:req.body.unit})
            const exist = await Product.exists({name:{ $regex: new RegExp(`^${name}$`, 'i')},companyName:{ $regex: new RegExp(`^${companyName}$`, 'i')},type:{ $regex: new RegExp(`^${type}$`, 'i')},unit:{ $regex: new RegExp(`^${unit}$`, 'i')}})
            if(exist){
                res.status(400).send({ message: 'This product is already available' });
            }
        
        
        // else{
            //console.log(_.difference(['223','23','3'],['223','23','s']))
            // Product.findOne({name})
            // .then(response=>{
            //     if(response){
            //         Product.updateOne({name},{$push:{type,unit,companyName}})
            //         .then(updateResponse=>{
            //             if(updateResponse.modifiedCount>0){
            //                 res.status(200).send({msg:"success",result:'Updated'})
            //             }else{
            //                 res.status(400).send("Bad Request")
            //             }
                        
            //         })
            //     }
                else{
                    let productupdate;
                    productupdate = await Product.findByIdAndUpdate(
                        { _id:req.params.id },
                        
                        {name,
                        companyName,
                        type,
                        unit
                    },{new:true})
                    // newProduct.save()
                    console.log(productupdate)
                    res.json(productupdate)
                    // .then(newProdResponse=>{
                    //     res.status(200).send({msg:"success",result:newProdResponse})
                    // })
                }
            }
            
            
        
    

    async getAllProducts(req,res){
        // Product.find({})
        Product.find({}).sort({name:1})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
    }

    async getAllProductType(req,res){
            Product.aggregate([
                {$unwind:'$type'}
            ])
            .then(response=>{
                res.status(200).send({msg:"success",result:response})
            })
    }

    async deleteProduct(req, res, next) {
        let product;
        try {
          product = await Product.findByIdAndRemove({ _id: req.params.id });
          if (!product) {
            return next(new Error("Noting to delete"));
          }
        } catch (error) {
          return next(error);
        }
        res.json(product);
      }

    // async deleteProduct(req,res){
    //     let {array} = req.body;
    //     if(!req.body.array){
    //         res.status(400).send("Data Missing")
    //     }else{
    //         array = array.map(item=>mongoose.Types.ObjectId(item))
    //         Product.deleteMany({_id: { $in: array}})
    //         .then(response=>{
    //             if(response.deletedCount===1){
    //                 res.status(200).send({msg:"success",result:"Deleted"})
    //             }else{
    //                 res.status(400).send("Not deleted")
    //             }
    //         })
    //     }
    // }


}

const productController = new ProductController();
module.exports=productController;