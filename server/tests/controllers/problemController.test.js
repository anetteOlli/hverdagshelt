import * as mysql from 'mysql';

const problemController = require('../../src/controllers/problemController');
const runsqlfile = require('../../src/dao/SQL/runsqlfile');

jest.setTimeout(30000);

let pool = mysql.createPool({
  connectionLimit: 1000000,
  host: 'mysql',
  user: 'root',
  password: 'abc12345!',
  database: 'testdb',
  debug: false,
  multipleStatements: true
});

beforeEach(done => {
  runsqlfile('src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('src/dao/SQL/INSERT_SCRIPT.sql', pool, done);
  });
});
afterAll(() => pool.end());

test(";)", (done) => {
  done();
});