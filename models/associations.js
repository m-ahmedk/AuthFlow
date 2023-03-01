
/**
 * To break the circular reference and prevent any dependency issues, models are imported and are associated in this file
 */

// User & Verification
const User = require('./users')
const Verification = require('./verification')

User.hasOne(Verification, { foreignKey: 'verificationId' });
Verification.belongsTo(User, { foreignKey: 'userId' });