// @flow
import { checkAuth } from '../util';

const comments = require('express').Router({ mergeParams: true });
import { Comment, User } from '../models/mysql';

comments.post('/', checkAuth, (req: express$Request, res: express$Response) => {
  if (!(req.body instanceof Object) || typeof req.params.articleId === 'undefined') return res.sendStatus(400);
  return Comment.create({
    content: req.body.content,
    userId: req.body.userId,
    articleId: parseInt(req.params.articleId)
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

comments.get('/', (req: express$Request, res: express$Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Comment.findAll({
    attributes: ['id', 'content', 'userId', 'updatedAt'],
    include: [{ model: User, attributes: ['username'] }],
    where: { articleId: req.params.articleId }
  })
    .then((comments: Comment[]) => res.status(200).json(comments))
    .catch((error: Error) => res.status(500).json(error.message));
});

/*--- First find the comment and check if the comments userId is equal to the userId in the jwt-token */
comments.delete('/:commentId(\\d+)', checkAuth, (req: express$Request, res: express$Response) => {
  if (typeof req.params.articleId === 'undefined' || typeof req.params.commentId === 'undefined')
    return res.sendStatus(400);
  return Comment.findById(req.params.commentId).then((comment: ?Comment) => {
    if (!comment) return res.status(404).json({ message: 'Article not found' });
    else {
      // $FlowFixMe
      if (req.userData.user.id !== comment.userId) return res.sendStatus(401);
      else comment.destroy().then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    }
  });
});

module.exports = comments;
