import { checkAuth } from '../services/util';

const router = require('express').Router();
const ProblemController = require('../controllers/problemController');

router.get('/', ProblemController.problems_get_all);

router.get('/:id', ProblemController.problems_get_problem);

router.post('/municipality', ProblemController.problems_get_from_municipality);

router.post('/', checkAuth, ProblemController.problems_create_problem);

router.delete('/:id', checkAuth, ProblemController.problems_delete_problem);

router.patch('/:id', checkAuth, ProblemController.problems_edit_problem);

module.exports = router;
