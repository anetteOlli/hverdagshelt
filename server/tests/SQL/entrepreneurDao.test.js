import entrepreneurDAO from '../../src/dao/entrepreneurDao';
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
let dao = new entrepreneurDAO(pool);

jest.setTimeout(30000);

beforeAll(done => {
  runsqlfile('src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('src/dao/SQL/INSERT_SCRIPT.sql', pool, () => {
      done();
    });
  });
});

test("Testing getAll from entrepreneurDao", (done) => {
  dao.getAll((status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThanOrEqual(2);
    expect(data.length).toBeLessThanOrEqual(4);
    done();
  })
});

test("Testing getEntrepreneur from entrepreneurDao", (done) => {
  dao.getEntrepreneur(1, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].business_name).toBe("Arbeidsjøinn");
    done();
  })
});

test("Testing createEntrepreneur from userDao", (done) => {
  let json = {
    business_name: "Test",
    org_nr: "01010"
  };
  let id = 3;
  dao.createEntrepreneur(json,id,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing linkEntrepreneur from userDao", (done) => {
  let json = {
    categories : ["Testing", "Hole in road"],
    municipalities: [
      {"municipality":"Nord-Fron", "county":"Oppland"},
      {"municipality":"Sør-Fron", "county":"Oppland"}
    ]
  };
  let id = 1;
  dao.linkEntrepreneur(json,id,(status,data) => {
    expect(status).toBe(200);
    done();
  })
});

test("Testing checkEntrepreneur from entrepreneurDao", (done)=> {
  let orgNr = "01";
  dao.checkEntrepreneur(orgNr, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].business_name).toBe("Arbeidsjøinn");
    done();
  })
});

test("Testing  from entrepreneurDao", (done) => {
  let json = {
    municipality: "Oslo",
    county: "Oslo",
    category: "Snowplow"
  };
  dao.getByCatAndMuni(json,(status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].business_name).toBe("Arbeidsjøinn");
    done();
  })
});

