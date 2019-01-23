import { checkAuth } from '../services/util';

const router = require('express').Router();
const UserController = require('../controllers/userController');

//@TODO should checkAuth for getting users! (Private info like county & municipality)

router.get('/', UserController.users_get_all);

router.post('/f/forgot', UserController.user_forgot_password);


router.post('/login', UserController.users_login);
router.get('/refresh', checkAuth, UserController.users_refresh);

router.patch('/changePassword/', checkAuth, UserController.user_change_password);

router.post('/', UserController.users_create_user);

router.delete('/:id', UserController.user_delete_user);

router.patch('/:id', UserController.user_patch_user);

router.get('/validate_email/:email', UserController.user_validate_email);

router.get('/check_pass/:email/:password', checkAuth, UserController.user_is_not_old_password);

router.get('/:id', UserController.users_get_user);

module.exports = router;
