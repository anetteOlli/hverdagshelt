// @flow
const ratings = require('express').Router({ mergeParams: true });
import { Rating } from '../models/mysql';

/*--- Check if a user has rated on the article before, and if he has update that rating.id ---*/
ratings.post('/', (req: express$Request, res: express$Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  /*--- Can't use Rating.upsert because we don't know the primary key ---*/
  return Rating.findOrCreate({
    where: { userId: req.body.userId, articleId: req.params.articleId },
    defaults: { value: req.body.value }
    // $FlowFixMe
  }).spread((rating, created) => {
    if (created) return res.sendStatus(200);
    rating
      .update({
        // $FlowFixMe
        value: req.body.value
      })
      .then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
  });
});

module.exports = ratings;
