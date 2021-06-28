

module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('countries',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        country:{
            type: DataTypes.STRING(100),
            allowNull:false,
            unique:true
        },
        status:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            default:true
        }

    });
}