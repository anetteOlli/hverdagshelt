const DivController = require('../../src/controllers/divController');
const runsqlfile = require('../../src/dao/SQL/runsqlfile');

jest.setTimeout(30000);

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

