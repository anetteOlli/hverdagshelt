// @flow
import { checkAuth, genToken, hashPassword } from '../util';
import { User } from '../models/mysql';
const users = require('express').Router();

/*--- Register new user and return the user with a jtw-token ---*/
users.post('/', (req: express$Request, res: express$Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then((user: User) =>
      res.status(200).json({
        user: user,
        // $FlowFixMe
        token: genToken(user)
      })
    )
    .catch(() => res.sendStatus(500));
});

/*--- Check if password is valid with bcrypt and return user with jwt-token ---*/
users.post('/login', (req: express$Request, res: express$Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return User.findOne({ where: { email: req.body.email } }).then((user: ?User) => {
    if (!user) res.status(404).json({ message: 'User not found' });
    // $FlowFixMe
    else if (!user.isValidPassword(req.body.password)) res.status(401).json({ message: 'Wrong password' });
    else
      res.status(200).json({
        user: user,
        // $FlowFixMe
        token: genToken(user)
      });
  });
});

/*--- Call on this when you refresh the page, check if the userId in the jwt-token is equal to the userId in the params ---*/
users.get('/:userId(\\d+)', checkAuth, (req: express$Request, res: express$Response) => {
  // $FlowFixMe
  if (req.userData.user.id !== parseInt(req.params.userId)) return res.sendStatus(401);
  return User.findById(req.params.userId).then(user => {
    if (!user) res.status(404).json({ name: 'User not found' });
    else res.status(200).json(user);
  });
});

/*--- Check if the userId in the jwt-token is equal to the userId in the params ---*/
users.delete('/:userId(\\d+)', checkAuth, (req: express$Request, res: express$Response) => {
  if (typeof req.params.userId === 'undefined') return res.sendStatus(400);
  // $FlowFixMe
  if (req.userData.user.id !== parseInt(req.params.userId)) return res.sendStatus(401);
  return User.destroy({ where: { id: req.params.userId } }).then(count =>
    count ? res.sendStatus(200) : res.sendStatus(404)
  );
});

/*--- If the password is changed, hash the new password ---*/
users.patch('/', checkAuth, (req: express$Request, res: express$Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  // $FlowFixMe
  if (req.userData.user.id !== req.body.id) return res.sendStatus(401);
  if (typeof req.body.password === 'undefined') {
    return User.update(
      {
        username: req.body.username,
        email: req.body.email
      },
      { where: { id: req.body.id } }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
  } else {
    return User.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword(req.body.password)
      },
      // $FlowFixMe
      { where: { id: req.body.id } }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
  }
});

module.exports = users;
