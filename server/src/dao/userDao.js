//@flow

const Dao = require('./dao.js');

module.exports = class UserDao extends Dao {

  /**
   * Retrieves all users from the database.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getAll(callback) {
    super.query('select user_id, email, created, active, municipality, county, priority from user', [], callback);
  }

  /**
   * Retrieves a user from the database.
   * @param id The ID of the user.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getOneById(id, callback) {
    console.log('getOneById id: ', id);
    super.query(
      'select user_id, email, created, active, municipality, county, priority from user where user_id = ?',
      [id],
      callback
    );
  }

  /**
   * Creates a user row in the database.
   * @param json Object containing user data.
   * @param password Hashed password.
   * @param priority Type of user.
   * @param callback Returns the response from MySQL (status and data).
   */
  createUser(json, password, priority, callback) {
    const val = [json.email, password, json.municipality, json.county, priority];
    super.query(
      'insert into user (email, password, created,municipality, county, priority) values (?,?,NOW(),?,?,?)',
      val,
      callback
    );
  }

  /**
   * Updates the email for a user row in the database.
   * @param id The ID of the user.
   * @param json Object containing user email.
   * @param callback Returns the response from MySQL (status and data).
   */
  patchOne(id, json, callback) {
    const val = [json.email, id];
    super.query('update user set email = ? where user_id = ?', val, callback);
  }

  /**
   * Updates the password and email for a user row in the database.
   * @param json Object containing user data.
   * @param password Hashed password.
   * @param callback Returns the response from MySQL (status and data).
   */
  changePassword(json, password, callback) {
    const val = [json.email, password, json.user_id];
    console.log(val);
    super.query('update user set email = ?, password = ? where user_id = ?', val, callback);
  }

  /**
   * Deletes a user from the database.
   * @param id The ID of the user.
   * @param callback Returns the response from MySQL (status and data).
   */
  deleteOne(id, callback) {
    super.query('delete from user where user_id = ?', [id], callback);
  }

  /**
   * Retrieves a user from the database if the email is in use.
   * @param email Email address of a user.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  checkEmail(email, callback) {
    super.query('select user_id, password, priority from user where email = ? AND active = TRUE', [email], callback);
  }

  /**
   * Sets the user corresponding to a given email to active.
   * @param email Email address of a user.
   * @param callback Returns the response from MySQL (status and data).
   */
  activateUser(email, callback) {
    super.query('UPDATE user SET active = TRUE WHERE email = ?', [email], callback);
  }
};
