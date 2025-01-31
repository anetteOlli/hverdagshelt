// @flow
import CategoryDAO from '../../src/dao/categoryDao';
const mysql = require('mysql');
const runsqlfile = require('../../src/dao/SQL/runsqlfile');


let pool = mysql.createPool({
  connectionLimit: 1000000,
  host: 'mysql',
  user: 'root',
  password: 'abc12345!',
  database: 'testdb',
  debug: false,
  multipleStatements: true
});
let dao = new CategoryDAO(pool);

jest.setTimeout(30000);

beforeAll(done => {
  runsqlfile('src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('src/dao/SQL/testINSERT.sql', pool, () => {
      done();
    });
  });
});


test("Tester getAll fra categoryDao", (done) => {
  dao.getAll((status,data) => {
    expect(status).toEqual(200);
    expect(data.length).toBeLessThanOrEqual(5);
    expect(data.length).toBeGreaterThanOrEqual(3);
    //expect(data[0]).toBeString(); Not a function, but is a void function to check if the element is a string
    //expect(data[0]).toBeArray();
    expect(data[0].category).toEqual('Hole in road');
    done();
  });
});


test("Tester getOne fra categoryDao", (done) => {
  let catName = {"category":"Tree in road"};
  dao.getOne(catName.category, (status,data) => {
   expect(status).toEqual(200);
   expect(data[0]).toEqual(catName);
   //expect(data).toBeArray(); Not a function, but is a void function to check if the element is a array
   done();
  });
});

test("Tester deleteOne fra categoryDao", (done) => {
  let catname = "Hole in road";
  dao.deleteOne(catname, (status,data) => {
    expect(status).toEqual(200);
    expect(data.affectedRows).toEqual(1);
    done();
  });
});

test("Tester createOne fra categoryDao", (done) => {
  let newCat = {"category": "yeeeeet"};
  dao.createOne(newCat,(status,data) => {
    expect(status).toEqual(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});