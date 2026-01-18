// Quick script to generate bcrypt password hash
// Run with: node generate-password-hash.js

const bcrypt = require('bcryptjs');

// CHANGE THIS to your new password
const newPassword = 'YourNewSecurePassword123!';

const hash = bcrypt.hashSync(newPassword, 12);

console.log('\n=================================');
console.log('PASSWORD HASH GENERATED');
console.log('=================================');
console.log('\nNew Password:', newPassword);
console.log('\nBcrypt Hash (copy this):');
console.log(hash);
console.log('\n=================================\n');
