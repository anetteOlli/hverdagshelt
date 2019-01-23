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
afterAll(() => pool.end());

test("Testing municipalities_get_all from DivController", (done) => {
  DivController.municipalities_get_all((status,data) => {
    expect(data.length).toBe(422);
    expect(status).toBe(200);
    done();
  })
});

test("Testing counties_get_all from DivController", (done) => {
  DivController.counties_get_all((status,data) => {
   expect(status).toBe(200);
   expect(data.length).toBe(18);
   expect(data[0].name).toBe("Akershus");
   expect(data[14].name).toBe("Trøndelag");
   done();
  })
});


test("Testing get_municipalities_by_county from DivController", (done) => {
  DivController.get_municipalities_by_county("Trøndelag", (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(48);
    expect(data[2].municipality).toBe("Flatanger");
    expect(data[9].municipality).toBe("Holtålen");
    done();
  })
});

test("Testing verifyMail from DivController", (done) => {
  DivController.verify_email("102492350345023450234",(status,data) => {
    expect(status).toBe(200);
    done();
  })
});