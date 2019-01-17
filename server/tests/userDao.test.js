// @flow
import UserDAO from '../src/dao/userDao';
const mysql = require('mysql');
const runsqlfile = require('../src/dao/SQL/runsqlfile');


let pool = mysql.createPool({
  connectionLimit: 1000000,
  host: 'mysql',
  user: 'root',
  password: 'abc123',
  database: 'testdb',
  debug: false,
  multipleStatements: true
});
let dao = new UserDAO(pool);

jest.setTimeout(30000);

beforeEach(done => {
  runsqlfile('src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('src/dao/SQL/INSERT_SCRIPT.sql', pool, done);
  });
});
afterAll(() => pool.end());

test("Testing getAll from userDao", (done) => {
  done();
})