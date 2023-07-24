const sequelize=require('../util/database');
const Sequelize=require('sequelize');
const Candy=sequelize.define('candy',{
    id:{
        type:Sequelize.INTEGER,
        unique:true,
        allowNull : false,
        primaryKey:true,
        autoIncrement: true

    },
    candyname:{
        type:Sequelize.STRING,
        allowNull : false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull : false,
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
module.exports=Candy;