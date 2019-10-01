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
    /* tags: [String],
    timeStart: {
        type: Date,
        required: true
    },
    timeBegin: {
        type: Date,
        required: true
    },
    image: {
        type: Buffer,
        required: false
    }, */
});

module.exports = mongoose.model('Events', EventSchema);