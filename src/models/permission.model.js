const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    _id: String,
    description: String
}, { collection: 'permissions' });

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
