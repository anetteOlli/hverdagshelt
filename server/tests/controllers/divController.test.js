import * as mysql from 'mysql';

const DivController = require('../../src/controllers/divController');
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

test("Testing municipalities_get_all",(done) => {
  DivController.municipalities_get_all((status,data) => {
    expect(status).toBe(200);
    done();
  })
});

