const Dao = require('./dao.js');

module.exports = class UserDao extends Dao {
  getAll(callback) {
    super.query('select * from user', [], callback);
  }

  getOneById(id, callback) {
    super.query('select * from user where user_id = ?', [id], callback);
  }

  createUser(json, password, callback) {
    const val = [json.email, password, json.municipality, json.county, 'Standard'];
    super.query(
      'insert into user (email, password, municipality_fk, county_fk, priority_fk) values (?,?,?,?,?)',
      val,
      callback
    );
  }

  createEntrepreneur(json, userID, callback) {
    const val = [json.bedriftNavn, json.org_nr, userID];
    super.query('insert into entrepreneur (bedriftnavn, org_nr, user_fk) values (?,?,?)', val, callback);
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

  patchOne(id, json, callback) {
    const val = [json.email, json.password, json.problem, json.event, id];
    super.query(
      'update user set email = ?, password = ?, problem_fk = ?, event_fk = ? where user_id = ?',
      val,
      callback
    );
  }

  deleteOne(id, callback) {
    super.query('delete from user where user_id = ?', [id], callback);
  }

  checkEmail(email, callback) {
    super.query('select user_id, password, priority_fk from user where email = ?', [email], callback);
  }
};
