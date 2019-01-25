// @flow
module.exports = class Dao {
  pool: Object;
  constructor(pool: Object) {
    // Dependency Injection
    this.pool = pool;
  }

  /**
   *
   * @param sql The given prepared query to be executed against the MySQL server
   * @param params Array of parameters to be injected into the prepared statement
   * @param callback Returns table rows and code 200 if the query was successful, or an error code if not.
   */
  query(sql: string, params: Array<any>, callback: any) {
    this.pool.getConnection((err, connection) => {
      console.log('dao: connected to database');
      if (err) {
        console.log(err);
        console.log('dao: error connecting');
        callback(500, { message: 'feil ved ved oppkobling' });
      } else {
        console.log('dao: running sql: ' + sql);
        connection.query(sql, params, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            callback(500, { message: 'error querying' });
          } else {
            console.log('dao: returning rows');
            callback(200, rows);
          }
        });
      }
    });
  }
};
