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
    ticket: {
        price: {
            type: Number,
            required: true
        },
        purchaseLink: {
            type: String,
            required: false
        }
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Events', EventSchema);