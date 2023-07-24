const Sequelize=require('sequelize');
const sequelize=new Sequelize('candyshopseller','root','BINDU@2001#123',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize;