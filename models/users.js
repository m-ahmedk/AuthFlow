module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    { timestamps: true },)

    return User
}