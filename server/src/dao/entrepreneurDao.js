const Dao = require('./dao.js');

module.exports = class EntrepreneurDao extends Dao {
  getAll(callback) {
    super.query('select * from entrepreneur', [], callback);
  }

  getByCatAndMuni(json, callback) {
    const val = [json.municipality, json.county, json.category];
    console.log(val);
    super.query(
      'select * from entrepreneur WHERE entrepreneur_id IN (SELECT entrepreneur_id from entrepreneur_municipality where municipality = ? AND county = ?) AND entrepreneur_id IN (SELECT entrepreneur_id from entrepreneur_category where category = ?)',
      val,
      callback
    );
  }

  getByMuni(json, callback) {
    const val = [json.municipality_fk, json.county_fk];
    console.log(val);
    super.query(
      'select * from entrepreneur WHERE entrepreneur_id IN (SELECT entrepreneur_fk from entrepreneur_municipality where municipality_fk = ? AND county_fk = ?)',
      val,
      callback
    );
  }


  getEntrepreneur(id, callback) {
    super.query('select * from entrepreneur WHERE entrepreneur_id = ?', [id], callback);
  }

  getEntrepreneurID(user_id, callback){
    super.query('select * from entrepreneur where user_id = ?',
      [user_id],
      callback
      );
  }

  checkEntrepreneur(org_nr, callback) {
    super.query('select * from entrepreneur WHERE org_nr = ?', [org_nr], callback);
  }

  createEntrepreneur(json, user_id, callback) {
    const val = [json.business_name, json.org_nr, user_id];
    super.query('insert into entrepreneur (business_name, org_nr, user_id) values (?,?,?)', val, callback);
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

    let queryCat = 'INSERT INTO entrepreneur_category(entrepreneur_id, category) VALUES (?,?)';
    queryCat += ',(?, ?)'.repeat(catLength - 1);

    let queryMuni = 'INSERT INTO entrepreneur_municipality(entrepreneur_id, municipality, county) VALUES (?,?,?)';
    queryMuni += ',(?, ?, ?)'.repeat(muni_countyLength - 1);

    let queries = queryCat + '; ' + queryMuni;

    console.log(queries);
    console.log(val);
    super.query(queries, val, callback);
  }
};
