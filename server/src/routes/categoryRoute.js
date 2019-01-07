// @flow
import { checkAuth } from '../util';

const categories = require('express').Router();
import { Category } from '../models/mysql';

categories.get('/', (req: express$Request, res: express$Response) => {
  return Category.findAll()
    .then((categories: Category[]) => {
      res.status(200).json(categories);
    })
    .catch((error: Error) => res.status(500).json(error.message));
});

/*--- Does not use post and delete in the frontend, but can do it in postman ---*/

categories.post('/', checkAuth, (req: express$Request, res: express$Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Category.create({
    name: req.body.name
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

categories.delete('/:name', checkAuth, (req: express$Request, res: express$Response) => {
  if (typeof req.params.name === 'undefined') return res.sendStatus(400);
  return Category.destroy({ name: { id: req.params.name } }).then(count =>
    count ? res.sendStatus(200) : res.sendStatus(404)
  );
});

module.exports = categories;
