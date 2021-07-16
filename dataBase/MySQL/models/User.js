const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../index');

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    timestamps: false,
    tableName: 'users'
});

module.exports = User;
