const mongoose = require('mongoose')
const Location = require("../models/Location")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

class LocationController{
    async createLocation(req,res){
        const {name,trainerName,doctorName}=req.body;
        if(!name || !trainerName || !doctorName){
            res.status(400).send("Data Missing")
        }
        const exist = await Location.exists({name:{ $regex: new RegExp(`^${name}$`, 'i')},trainerName:{ $regex: new RegExp(`^${trainerName}$`, 'i')},doctorName:{ $regex: new RegExp(`^${doctorName}$`, 'i')}})
        if(exist){
            res.status(400).send({ message: 'This Location is already available' });
        }
        else{
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
        // else{
            // Location.findOne({name})
            // .then(response=>{
            //     if(response){
            //         Location.updateOne({name},{$push:{trainerName,doctorName}})
            //         .then(updateResponse=>{
            //             if(updateResponse.modifiedCount>0){
            //                 res.status(200).send({msg:"success",result:'Updated'})
            //             }else{
            //                 res.status(400).send("Bad Request")
            //             }
                        
            //         })
            //     }
      
            // })
            // const newLocation = new Location({
            //     name,
            //     trainerName,
            //     doctorName,
            // })
            // newLocation.save()
            // .then(response=>{
            //     res.status(400).send({msg:"success",result:response})
            // })
            
        // }
    }
    async UpdateLocation(req,res){
        const {name,trainerName,doctorName}=req.body;
        if(!name || !trainerName || !doctorName){
            res.status(400).send("Data Missing")
        }
        const exist = await Location.exists({name:{ $regex: new RegExp(`^${name}$`, 'i')},trainerName:{ $regex: new RegExp(`^${trainerName}$`, 'i')},doctorName:{ $regex: new RegExp(`^${doctorName}$`, 'i')}})
        if(exist){
            res.status(400).send({ message: 'This Location is already available' });
        }
        else{
            let locationUpdate;
            locationUpdate = await Location.findByIdAndUpdate(
                { _id:req.params.id },
                
                {
                name,
                trainerName,
                doctorName,
            },{new:true})

            console.log(locationUpdate)
            res.json(locationUpdate)
        }

    }


    async deletelocationone(req, res, next) {
        let locationDelete;
        try {
            locationDelete = await Location.findByIdAndRemove({ _id: req.params.id });
          if (!locationDelete) {
            return next(new Error("Noting to delete"));
          }
        } catch (error) {
          return next(error);
        }
        res.json(locationDelete);
      }
 
    async getAllLocations(req,res){
        Location.find({})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
    }
    // async deleteLocations(req,res){
    //     let {array} = req.body;
    //     if(!req.body.array){
    //         res.status(400).send("Data Missing")
    //     }else{
    //         array = array.map(item=>mongoose.Types.ObjectId(item))
    //         Location.deleteMany({_id: { $in: array}})
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

const locationController = new LocationController();
module.exports=locationController;