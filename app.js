const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const app=express();
const controller=require('./controller');
const sequelize=require('./util/database');
const Candy=require('./models/candy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
sequelize.sync()
    .then(()=>{
        console.log('details synchronised with database');
    })
    .catch((error)=>{
        console.log("failed to sync the data with database");
        console.log(error.message);
    });
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'));
});
app.post('/submit-details',controller.inserData);
app.get('/get-detail',controller.getdeatils);
app.put(`/candy/editquantity/:id`,controller.changevalue);
app.delete(`/candy/deleteitem/:id`,async(req,res)=>{
    try{
        const candyId=req.params.id;
        await Candy.destroy({where:{id:candyId}});
        res.json({message:"deleted"})
        
    }catch(err){
        res.status(500).json({
            error:err
        })
    }
})










app.listen(6500);