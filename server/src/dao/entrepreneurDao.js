const Dao = require('./dao.js');

module.exports = class EntrepreneurDao extends Dao {
  
  /**
   * Retrieves all entrepreneurs from the database.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getAll(callback) {
    super.query('select * from entrepreneur', [], callback);
  }

  /**
   * Retrieves all entrepreneurs from a given municipality, working in a specific category, from the database.
   * @param json Object containing entrepreneur data.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getByCatAndMuni(json, callback) {
    const val = [json.municipality, json.county, json.category];
    console.log(val);
    super.query(
      'select * from entrepreneur WHERE entrepreneur_id IN (SELECT entrepreneur_id from entrepreneur_municipality where municipality = ? AND county = ?) AND entrepreneur_id IN (SELECT entrepreneur_id from entrepreneur_category where category = ?)',
      val,
      callback
    );
  }

  /**
   * Retrieves all entrepreneurs from a specified municipality from the database.
   * @param json Object containing entrepreneur data.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getByMuni(json, callback) {
    const val = [json.municipality, json.county];
    console.log(val);
    super.query(
      'select distinct * from entrepreneur WHERE entrepreneur_id in (SELECT entrepreneur_id from entrepreneur_municipality where municipality = ? AND county = ?)',
      val,
      callback
    );
  }

  /**
   * Retrieves an entrepreneur from the database.
   * @param id The ID of the entrepreneur.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getEntrepreneur(id, callback) {
    super.query('select * from entrepreneur WHERE entrepreneur_id = ?', [id], callback);
  }

  /**
   * Retrieves an entrepreneur from the database.
   * @param user_id ID of the user connected to the entrepreneur.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getEntrepreneurByUserID(user_id, callback) {
    super.query('select * from entrepreneur where user_id = ?', [user_id], callback);
  }

  /**
   * Retrieves an entrepreneur from the database.
   * @param org_nr The organisation ID of the entrepreneur.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  checkEntrepreneur(org_nr, callback) {
    super.query('select * from entrepreneur WHERE org_nr = ?', [org_nr], callback);
  }

  /**
   * Creates an entrepreneur row in the database.
   * @param json Object containing entrepreneur data.
   * @param user_id ID of the user connected to the entrepreneur.
   * @param callback Returns the response from MySQL (status and data).
   */
  createEntrepreneur(json, user_id, callback) {
    const val = [json.business_name, json.org_nr, user_id];
    super.query('insert into entrepreneur (business_name, org_nr, user_id) values (?,?,?)', val, callback);
  }

  /**
   * Sets a given entrepreneur's working municipalities and categories.
   * @param json Object containing entrepreneur data; should have an array of categories and municipalities.
   * @param id The ID of the entrepreneur.
   * @param callback Returns the response from MySQL (status and data).
   */
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
