// @flow
const router = require('express').Router();
import { checkAuth, genToken } from '../services/util';

/*--- When the user refreshes the site give the user a new jwt-token and the user info ---*/
router.get('/refresh', checkAuth, (req: () => mixed, res: express$Response) => {
  const user = req.userData.user;
  res.status(200).json({
    user: user,
    token: genToken(user)
  });
});

module.exports = router;
