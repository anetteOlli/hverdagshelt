const router = require('express').Router();
const StatisticsController = require('../controllers/statisticsController');

router.post('/lineChartData/', StatisticsController.stats_get_all_line_chart);

router.post('/barChartData', StatisticsController.stats_get_all_bar_chart);

router.post('/pieChartData', StatisticsController.stats_get_all_pie_chart);
