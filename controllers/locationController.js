const mongoose = require('mongoose')
const Location = require("../models/Location")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

class LocationController{
    async createLocation(req,res){
        const {name,trainerName,doctorName}=req.body;
        if(!name || !trainerName || !doctorName){
            res.status(400).send("Data Missing")
        }else{
            Location.findOne({name})
            .then(response=>{
                if(response){
                    Location.updateOne({name},{$push:{trainerName,doctorName}})
                    .then(updateResponse=>{
                        if(updateResponse.modifiedCount>0){
                            res.status(200).send({msg:"success",result:'Updated'})
                        }else{
                            res.status(400).send("Bad Request")
                        }
                        
                    })
                }else{
                    const newLocation = new Location({
                        name,
                        trainerName,
                        doctorName,
                    })
                    newLocation.save()
                    .then(newProdResponse=>{
                        res.status(200).send({msg:"success",result:newProdResponse})
                    })
                }
            })
            // const newLocation = new Location({
            //     name,
            //     trainerName,
            //     doctorName,
            // })
            // newLocation.save()
            // .then(response=>{
            //     res.status(400).send({msg:"success",result:response})
            // })
            
        }
    }

    async getAllLocations(req,res){
        Location.find({})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
    }


}

const locationController = new LocationController();
module.exports=locationController;