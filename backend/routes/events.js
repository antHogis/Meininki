const router = require('express').Router();
const Event = require('../models/Event');
const { verifyToken } = require('../authorization');
const {
  validateEventQueryParams,
  validateEvent,
  getJoiValidationErrors,
} = require('../validation');
const { ErrorResponse } = require('../errors/ErrorResponse');
const { UnauthorizedError } = require('../errors/errors');

function createEvent(event, owner) {
  return new Event({
    title: event.title,
    description: event.description,
    tags: event.tags,
    timeStart: new Date(event.timeStart),
    timeEnd: new Date(event.timeEnd),
    imageUrl: event.imageUrl,
    ticket: event.ticket,
    owner: owner
  }); 
}

function sendError(res, error) {
  let errorResponse = new ErrorResponse();

    errorResponse.addAll(getJoiValidationErrors(error));

    if (errorResponse.hasEntries()) {
      res.status(422).send(errorResponse.compile());
    } else {
      res.status(500).send(ErrorResponse.default());
    }
}

router.get('/', async (req, res) => {
  try {
    await validateEventQueryParams(req.query)
    let events = await Event.find(req.query);
    res.send(events);
  } catch (error) {
    let errorResponse = new ErrorResponse();

    errorResponse.addAll(getJoiValidationErrors(error));

    if (errorResponse.hasEntries()) {
      res.status(422).send(errorResponse.compile());
    } else {
      res.status(500).send(ErrorResponse.default());
    }
  }
})

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Event.findById(id)
    .then(data => res.json(data));  
});

router.post('/', verifyToken, async (req, res) => {
  try {
    await validateEvent(req.body, true);
    let event = await createEvent(req.body, req.user._id).save();
    res.send(event);
  } catch (error) {
    sendError(res, error);
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    await validateEvent(req.body);
    let event = await Event.findById(req.params.id);

    if (event.owner !== req.user._id) {
      console.log(`Owner ${event.owner}, User ${req.user}`);
      throw new UnauthorizedError();
    } 

    await Event.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send();
  } catch (error) {
    console.log(error);
    let errorResponse = new ErrorResponse();

    if (error instanceof UnauthorizedError) {
      errorResponse.add('token', error.message);
    }

    errorResponse.addAll(getJoiValidationErrors(error));

    if (errorResponse.hasEntries()) {
      res.status(422).send(errorResponse.compile());
    } else {
      res.status(500).send(ErrorResponse.default());
    }
  }
});

module.exports = router;