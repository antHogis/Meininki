const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [String],
    timeStart: {
        type: Date,
        required: true
    },
    timeEnd: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Events', EventSchema);