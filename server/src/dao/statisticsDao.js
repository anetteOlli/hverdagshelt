// @flow
const Dao = require('./dao.js');

module.exports = class StatisticsDao extends Dao {

/*  Statistikk:

    Hvor lang tid tar det fra problemer er meldt inn til de er fikset?
  Gjennomsnittlig {tid} for hver {kommune}, for hver {kategori}, for hver {entreprenør}, per tid.

  Hvilke områder har flest problemer?
  {problemer} til hvert område per tid

Hvilke bedriftsbrukere fikser flest problemer?
  antall {problemer} fikset for hver {entreprenør}, per tid  //eventuelt

Hvilke kategorier får flest problemer?
  antall {problemer} for hver {kategori}, per tid*/

  getStreetProblems(json, callback) {
    const val = [json.municipality, json.county];
    super.query('SELECT * FROM problem WHERE municipality = ? AND county = ?', val, callback);
  }
};
