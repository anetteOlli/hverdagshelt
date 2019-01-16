// @flow
import CategoryDAO from '../src/dao/categoryDao';
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
let dao = new CategoryDAO(pool);

jest.setTimeout(3000);

beforeAll(done => {
  runsqlfile('../src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('../src/dao/SQL/INSERT_SCRIPT.sql', pool, done);
  });
});
afterAll(() => pool.end());

test("Tester getAll fra categoryDao", (done) => {
  dao.getAll((status,data) => {
    expect(status).toEqual(200);
    expect(data).toBeArray();
    expect(data.length).toBeGreaterThanOrEqual(2);
    expect(data.length).toBeLessThanOrEqual(4);
    expect(data[0]).toBeString();
    expect(data[0]).toEqual('Hole in road');
    done();
  });
});


test("Tester getOne fra categoryDao", (done) => {
  let catName = "Hole in road";
  dao.getOne(catName, (status,data) => {
   expect(status).toEqual(200);
   expect(data).toBeArray();
   expect(data[0]).toEqual(catName);
   done();
  });
});

test("Tester deleteOne fra categoryDao", (done) => {
  let catname = "Tree in road";
  dao.deleteOne(catname, (status) => {
    expect(status).toEqual(200);
    done();
  });
});

test("Tester createOne fra categoryDao", (done) => {
  let newCat = "yeeeeet";
  dao.createOne(newCat,(status) => {
    expect(status).toEqual(200);
    done();
  })
});