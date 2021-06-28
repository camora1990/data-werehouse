const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('cities',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        city:{
            type: DataTypes.STRING,
            allowNull:false,
            require:true
        },
        status:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            default:true
           
        }

    })
}