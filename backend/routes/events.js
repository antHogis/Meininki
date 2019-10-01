const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/', (req, res) => {
    const rb = req.body;
    const event = new Event({
        title: rb.title,
        description: rb.description
    });

    event.save()
    .then(data => res.json(data))
    .catch(err => res.json({ message: err }));
});

module.exports = router;