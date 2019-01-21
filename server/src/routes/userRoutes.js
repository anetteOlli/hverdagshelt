import { checkAuth } from '../services/util';

const router = require('express').Router();
const UserController = require('../controllers/userController');

router.get('/', (req,res) => {
  UserController.users_get_all((status,data) => {
    res.status(status).json(data);
  })
});

router.post('/login', (req,res) => {
  UserController.users_login(req.body,(status,data) => {
    res.status(status).json(data);
  })
});

router.get('/id/:id', (req,res) => {
  UserController.users_get_user(req.params.id,(status,data) => {
    res.status(status).json(data);
  })
});

router.get('/refresh', checkAuth, (req,res) => {
  UserController.users_refresh(req.userData, (status,data) => {
    res.status(status).json(data);
  })
});

router.post('/', (req,res) => {
  UserController.users_create_user(req.body,(status,data) => {
    res.status(status).json(data);
  })
});

router.delete('/:id', (req,res) => {
  UserController.user_delete_user(req.params.id,(status,data) => {
    res.status(status).json(data);
  })
});

router.patch('/:id', (req,res) => {
  UserController.user_patch_user(req.params.id,req.body, (status,data) => {
    res.status(status).json(data);
  })
});

router.get('/validate_email/:email', (req,res) => {
  UserController.user_validate_email(req.params.email, (status,data) => {
    res.status(status).json(data);
  })
});

module.exports = router;
