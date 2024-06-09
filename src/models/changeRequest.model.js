const mongoose = require('mongoose');

const changeRequestSchema = new mongoose.Schema({
    userId: String,
    type: String,
    details: Object,
    status: { type: String, default: 'pending' },
    requestedBy: String,
    requestedAt: { type: Date, default: Date.now },
    approvedBy: String,
    approvedAt: Date
}, { collection: 'changeRequests' });

const ChangeRequest = mongoose.model('ChangeRequest', changeRequestSchema);

module.exports = ChangeRequest;
