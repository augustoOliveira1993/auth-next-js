const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    _id: String,
    permissions: [String]
}, { collection: 'roles' });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
