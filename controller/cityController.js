const City = require('../models/cityModel');
const asyncHandler = require('express-async-handler');

const saveCityName = asyncHandler(async(req,res)=>{

    const {city,count,email } = req.body;
    console.log(email)
    // console.log(city)
    // console.log(count)

    const searchedItem = await City.findOne({city:req.body.city,email:req.body.email})
    
    if(searchedItem){
        // res.json({message:"same city added", user:true})
        // console.log(searchedItem,"searcheditem is here")
        // console.log(searchedItem.count,"searcheditemcount is here")

        const mostSearch = await City.findOneAndUpdate(
                            {city:req.body.city},
                            {
                                count:searchedItem.count + 1
                            },{upsert:true}
                            )

                            mostSearch.save();
    } else {
        const mostSearch = new City({
            city:req.body.city,
            count:1,
            email: req.body.email
        })

        mostSearch.save()
        .then(
            res.json({message:"added"})
        ).catch(error => {
            res.json(error)
        })
    }
})


module.exports = saveCityName;