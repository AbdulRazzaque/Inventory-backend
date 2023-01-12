const mongoose = require('mongoose')
const Supplier = require("../models/Supplier")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

class SupplierController{
    async createSupplier(req,res){
        const {name,location,contact}=req.body;
        if(!name || !location || !contact){
            res.status(400).send("Data Missing")
        }else{
            const newSupplier = new Supplier({
                name,
                location,
                contact,
            })
            newSupplier.save()
            .then(response=>{
                res.status(400).send({msg:"success",result:response})
            })
            
        }
    }

    async getAllSuppliers(req,res){
        Supplier.find({})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
    }


}

const supplierController = new SupplierController();
module.exports=supplierController;