const router = require('express').Router();
const ProblemController = require('../controllers/problemController');

router.get('/', ProblemController.problems_get_all);

router.get('/:id', ProblemController.problems_get_problem);

router.post('/', ProblemController.problems_create_problem);

router.delete('/:id', ProblemController.problems_delete_problem);

router.patch('/:id', ProblemController.problems_edit_problem);

router.post('/nearby', ProblemController.problems_get_problem_nearby);

module.exports = router;
