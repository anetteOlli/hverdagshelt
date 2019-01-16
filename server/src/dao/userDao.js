const Dao = require('./dao.js');

module.exports = class UserDao extends Dao {
  getAll(callback) {
    super.query('select * from user', [], callback);
  }

  getOneById(id, callback) {
    super.query('select * from user where user_id = ?', [id], callback);
  }

  createUser(json, callback) {
    const val = [json.email, json.password, json.municipality, json.priority];
    super.query('insert into user (email, password, municipality_fk, priority_fk) values (?,?,?,?)', val, callback);
  }

  createEntrepreneur(json, callback) {
    const val = [json.bedriftnavn, json.org_nr, json.user_fk];
    super.query('insert into entrepreneur (bedriftnavn, org_nr, user_fk) values (?,?,?)', val, callback);
  }

  linkEntrepreneur(json, id, callback) {
    const catLength = json.categories.length;
    const muniLength = json.municipalities.length;

    let val = [];
    for (let i = 0; i < catLength; i++) {
      val.push(id, json.categories[i]);
    }
    for (let i = 0; i < muniLength; i++) {
      val.push(id, json.municipalities[i]);
    }

    let queryCat = 'INSERT INTO entrepreneur_category(entrepreneur_fk, category_fk) VALUES (?,?)';
    queryCat += ',(?, ?)'.repeat(catLength - 1);

    let queryMuni = 'INSERT INTO entrepreneur_municipality(entrepreneur_fk, municipality_fk) VALUES (?,?)';
    queryMuni += ',(?, ?)'.repeat(muniLength - 1);

    let queries = queryCat + '; ' + queryMuni;

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
