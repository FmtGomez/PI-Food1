const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>{
    sequelize.define("diet",{
        Id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primayKey:true,
        },
        name:{
            type: DataTypes.STRING, 
            allowNull: false,
        }
    })
}