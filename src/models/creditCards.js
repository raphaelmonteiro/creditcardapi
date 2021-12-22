module.exports = (sequelize, DataTypes) => {
    const CreditCard = sequelize.define('creditCards', {
        card_name: DataTypes.STRING,
        card_number: DataTypes.STRING,
        card_cvv: DataTypes.STRING,
        card_expiration: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });
  
    return CreditCard;
}