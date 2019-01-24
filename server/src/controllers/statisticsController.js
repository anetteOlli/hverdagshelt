const StatisticsDao = require('../dao/statisticsDao');
const pool = require('../services/database');
let statisticsDao = new StatisticsDao(pool);

/*Hvilke områder har flest problemer?
     {problemer} til hver gate per tid*/
exports.stats_get_all_line_chart = (req, res) => {
  const dataSum = [];
  statisticsDao.getStreetProblems(req.params.municipality, (status, data) => {
    dataSum.push({ name: 'street', data });
    statisticsDao.getStreetProblems(req.params.municipality, (status, data) => {
      dataSum.push({ name: 'sjømenn', data });
    });
  });
};
