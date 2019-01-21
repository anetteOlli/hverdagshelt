import { checkAuth } from '../services/util';
let upload = require('../services/imageHostController');
const router = require('express').Router();
const ProblemController = require('../controllers/problemController');


router.get('/', (req,res) => {
  ProblemController.problems_get_all((status,data) => {
    res.status(status).json(data);
  })
});

router.get('/:id', (req,res) => {
  ProblemController.problems_get_problem(req.params.id,(status,data) => {
   res.status(status).json(data);
  })
});

router.post('/municipality', (req,res) => {
  ProblemController.problems_get_from_municipality(req.body,(status,data) => {
    res.status(status).json(data);
  })
});

router.post('/', checkAuth, upload.uploader , (req,res) => {
  ProblemController.problems_create_problem(req.file,req.body, (status,data) => {
    res.status(status).json(data);
  })
});

router.post('/municipality/street', (req,res) => {
  ProblemController.problems_get_from_municipality_and_street(req.body,(status,data) => {
    res.status(status).json(data);
  })
});

router.delete('/:id', checkAuth, (req,res) => {
  ProblemController.problems_delete_problem(req.params.id, req.body, req.userData, (status,data) => {
    res.status(status).json(data);
  })
});

router.patch('/:id', checkAuth,upload.uploader, (req,res) => {
  ProblemController.problems_edit_problem(req.params.id,req.body,req.userData,req.file, (status,data) => {
    res.status(status).json(data);
  })
});

router.patch('/vote/:id', checkAuth, (req,res) => {
  ProblemController.problems_support_problem(req.params.id,req.body, (status,data) => {
    res.status(status).json(data);
  })
});

router.patch('/add/entrepreneur', (req,res) => {
  ProblemController.problems_add_entrepreneur(req.body, (status,data) => {
    res.status(status).json(data);
  })
});

module.exports = router;
