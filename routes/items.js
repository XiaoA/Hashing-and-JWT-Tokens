const Item = require('../item');
const express = require('express');

const router = express.Router();

/** GET / => [item, ...] */

router.get('', (request, response, next) => {
  try {
    return response.json({ items: Item.findAll() });
  } catch(error){
    return next(error)
  }
});

/** POST / {name, price} => new-item */

router.post('', (request, response, next) => {
  try {
    let newItem = new Item(request.body.name, request.body.price);
    return response.json({item: newItem});
  } catch (error) {
    return next(error)
  }
});

/** GET /[name] => item */

router.get('/:name', (request, response, next) => {
  try {
    let foundItem = Item.find(request.params.name);
    return response.json({item:foundItem});
  } catch(error){
    return next(error)
  }
});

/** PATCH /[name] => item */

router.patch('/:name', (request, response, next) => {
  try {
    let foundItem = Item.update(request.params.name, request.body);
    return response.json({ item: foundItem });
  } catch (error) {
    return next(error)
  }
});

/** DELETE /[name] => "Removed" */

router.delete('/:name', (request, response, next) => {
  try {
    Item.remove(request.params.name);
    return response.json({message:'Deleted'});
  } catch (error) {
    return next(error)
  }
});

module.exports = router;
