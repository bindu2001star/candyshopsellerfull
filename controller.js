const bodyParser=require('body-parser');
const Candy=require('./models/candy');
async function inserData(req,res){
    console.log(req.body,'Data posting');
    if(!req.body.candyname||!req.body.description||!req.body.price||!req.body.quantity){
        console.log("error");
        return res.status(400).send({
            message:"please fill all the details"
        })
    }
    const obj={
        candyname:req.body.candyname,
        description:req.body.description,
        price:req.body.price,
        quantity:req.body.quantity
    }
    try{
        const data=await Candy.create(obj)
        res.redirect('/');
    }catch(error){
        res.status(500).send(error);
        console.log("could not send the data");
    }

}
async function getdeatils(req,res){
    try{
        const candies=await Candy.findAll();
        candies.forEach(candy=>{
        const quantityId=`quantity-${candy.quantity}`;
        console.log(quantityId);

        })
        
        console.log('Data retrived');
        res.status(200).send(candies);
    }catch(err){
        console.log(err.message,"error is found here");
        res.status(500).send("Something went wrong");
    }

}
async function changevalue(req,res){
    try{
        const {candyname,description,price,quantity}=req.body;
        const candies=await Candy.findByPk(req.params.id);
        const candyId=candies.id;
        if(candies.quantity=0){
            res.status(404).send({message:"no more candies"});
            await Candy.destroy({where:{id:candyId}});
        }
        if(!candies){
          return res.status(404).send({message:'candyname not found'});
        }
        console.log("bindu");
        candies.quantity=quantity;
    
        await candies.save()
        res.send({message:"edited successfully",candies})
    }
    catch(error){
        console.log(error);
        res.status(500).send({message : "Error updating expense in backend." });
    }

}
module.exports={
    inserData:inserData,
    getdeatils:getdeatils,
    changevalue:changevalue
}