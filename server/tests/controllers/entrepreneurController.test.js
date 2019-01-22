import * as mysql from 'mysql';

const entrepreneurController = require('../../src/controllers/entrepreneurController');
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


test("Testing getAll from entrepreneurDao", (done) => {
  entrepreneurController.entrepreneurs_get_all((status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    done();
  })
});

test("Testing getEntrepreneur from entrepreneurDao", (done) => {
  entrepreneurController.entrepreneurs_get_one(1, (status,data) => {
    expect(status).toBe(200);
    expect(data.businessName).toBe("Arbeidsjøinn");
    done();
  })
});

test("Testing createEntrepreneur from userDao", (done) => {

  let json = {
    entrepreneur:{
      businessName: "Test",
      org_nr: "01010",
      categories : ["Testing", "Hole in road"],
      municipalities: [
        {"municipality":"Nord-Fron", "county":"Oppland"},
        {"municipality":"Sør-Fron", "county":"Oppland"}
      ]
    },
    user: {
      email:"rar@rar.rar",
      municipality:"Nord-Fron",
      county:"Oppland",
      password: "YEEEEEEEET",
    }
  };
  //This will succeed
  entrepreneurController.entrepreneurs_create_entrepreneur(json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing checkEntrepreneur from entrepreneurDao", (done)=> {
  let orgNr = "01";
  entrepreneurController.validate_org_nr(orgNr, (status,data) => {
    expect(status).toBe(200);
    expect(data.orgNrExist).toBe(true);
    done();
  })
});