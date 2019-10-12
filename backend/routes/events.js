const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

function createEvent(event) {
  return new Event({
    title: event.title,
    description: event.description,
    tags: event.tags,
    timeStart: new Date(event.timeStart),
    timeEnd: new Date(event.timeEnd),
    imageUrl: event.imageUrl,
    ticket: event.ticket,
  }); 
}

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
  createEvent(req.body).save()
    .then(data => res.json(data))
    .catch(err => res.status(422).send({ error: err}));
});

router.put('/:id', (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body)
    .then(data => res.status(200).send())
    .catch(err => res.status(500).send({error: err}));
});

module.exports = router;