/**
 * To break the circular reference and prevent any dependency issues, models are imported and are associated in this file
 */

// User & Verification
const User = require('./users')
const Verification = require('./verification')

/**
 * the Verification model belongs to the User model with the foreign key userId,  
 * and the User model has one Verification with the foreign key userId. 
 * The unique option is set to true to ensure that the relationship is one-to-one.
 */

/** 
 * Defining both Verification.belongsTo(User) and User.hasOne(Verification) creates a bidirectional association
 * User instance can access associated Verification data and vice versa
 * Generally having single one-to-one association is sufficient
 */

Verification.belongsTo(User, { foreignKey: 'userId', unique: true });
User.hasOne(Verification, { foreignKey: 'userId', unique: true });

/**
 * Downfall: Reocurring issues like data redundancy or circular dependencies, 
 * so it's important to consider the specific use case and design the associations accordingly
 */