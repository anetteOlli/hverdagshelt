const Dao = require('./dao.js');

module.exports = class EntrepreneurDao extends Dao {
  getAll(callback) {
    super.query('select * from entrepreneur', [], callback);
  }
  getEntrepreneur(id, callback) {
    super.query('select * from entrepreneur WHERE entrepreneur_id = ?', [id], callback);
  }

  checkEntrepreneur(org_nr, callback) {
    super.query('select * from entrepreneur WHERE org_nr = ?', [org_nr], callback);
  }

  createEntrepreneur(json, userID, callback) {
    const val = [json.bedriftNavn, json.org_nr, userID];
    super.query('insert into entrepreneur (businessName, org_nr, user_fk) values (?,?,?)', val, callback);
  }

  linkEntrepreneur(json, id, callback) {
    const catLength = json.categories.length;
    const muni_countyLength = json.municipalities.length;

    let val = [];
    for (let i = 0; i < catLength; i++) {
      val.push(id, json.categories[i]);
    }
    for (let i = 0; i < muni_countyLength; i++) {
      val.push(id, json.municipalities[i].municipality, json.municipalities[i].county);
    }

    let queryCat = 'INSERT INTO entrepreneur_category(entrepreneur_fk, category_fk) VALUES (?,?)';
    queryCat += ',(?, ?)'.repeat(catLength - 1);

    let queryMuni = 'INSERT INTO entrepreneur_municipality(entrepreneur_fk, municipality_fk, county_fk) VALUES (?,?,?)';
    queryMuni += ',(?, ?, ?)'.repeat(muni_countyLength - 1);

    let queries = queryCat + '; ' + queryMuni;

    console.log(queries);
    console.log(val);
    super.query(queries, val, callback);
  }
};
