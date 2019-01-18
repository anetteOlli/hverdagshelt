import { checkAuth } from '../services/util';
let upload = require('../services/imageHostController');
const router = require('express').Router();
const ProblemController = require('../controllers/problemController');


router.get('/', ProblemController.problems_get_all);

router.get('/:id', ProblemController.problems_get_problem);

router.post('/municipality', ProblemController.problems_get_from_municipality);

router.post('/', checkAuth, upload.uploader ,ProblemController.problems_create_problem);

router.post('/municipality/street', ProblemController.problems_get_from_municipality_and_street);

router.delete('/:id', checkAuth, ProblemController.problems_delete_problem);

router.patch('/:id', checkAuth, ProblemController.problems_edit_problem);

router.get('/user/:user_id', ProblemController.problems_get_problem_by_user);

router.get('/entrepreneur/:entrepreneur_id', ProblemController.problems_get_problem_by_entrepreneur);


router.patch('/vote/:id', checkAuth, ProblemController.problems_support_problem);

router.patch('/add/entrepreneur', ProblemController.problems_add_entrepreneur);

module.exports = router;
