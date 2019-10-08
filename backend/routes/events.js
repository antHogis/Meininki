const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', (req, res) => {
  Event.find()
    .then(data => res.json(data));
})

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Event.findById(id)
    .then(data => res.json(data));  
});

router.post('/', (req, res) => {
  const rb = req.body;
  const event = new Event({
    title: rb.title,
    description: rb.description,
    tags: rb.tags,
    timeStart: new Date(rb.timeStart),
    timeEnd: new Date(rb.timeEnd),
    imageUrl: rb.imageUrl
  });

  event.save()
    .then(data => res.json(data))
    .catch(err => res.status(422).send({ error: err}));
});

module.exports = router;