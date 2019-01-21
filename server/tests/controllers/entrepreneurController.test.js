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
    expect(data.length).toBe(1);
    expect(data[0].businessName).toBe("Arbeidsjøinn");
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
    //This will fail on the first step, email already exists for user
    entrepreneurController.entrepreneurs_create_entrepreneur(json,(status,data) => {
      expect(status).toBe(500);
      expect(data.affectedRows).toBe(0);
      json.user.email = "terrible@terrible.practice";
      //This will fail on the second step
      entrepreneurController.entrepreneurs_create_entrepreneur(json, (status,data) => {
        expect(status).toBe(500);
        expect(data.affectedRows).toBe(0);
        json.user.email = "terrible@test.test";
        json.entrepreneur.municipalities[0].municipality = "Yeeet";
        //This will fail on the thirds step Yeeet is no municipality
        entrepreneurController.entrepreneurs_create_entrepreneur(json, (status,data) => {
          expect(status).toBe(500);
          expect(data.affectedRows).toBe(0);
        })
      })
    })
  })
});

test("Testing checkEntrepreneur from entrepreneurDao", (done)=> {
  let orgNr = "01";
  entrepreneurController.validate_org_nr(orgNr, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].businessName).toBe("Arbeidsjøinn");
    done();
  })
});