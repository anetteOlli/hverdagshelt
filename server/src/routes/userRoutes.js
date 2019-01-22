import { checkAuth } from '../services/util';

const router = require('express').Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.users_get_all);

router.post('/f/forgot', UserController.user_forgot_password);


router.post('/login', UserController.users_login);

router.get('/id/:id', UserController.users_get_user);

router.get('/refresh', checkAuth, UserController.users_refresh);

router.post('/', UserController.users_create_user);

router.delete('/:id', UserController.user_delete_user);

router.patch('/:id', UserController.user_patch_user);

router.patch('/changePassword/', UserController.user_change_password);

router.get('/validate_email/:email', UserController.user_validate_email);


module.exports = router;
