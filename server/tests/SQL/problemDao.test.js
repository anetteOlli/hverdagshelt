// @flow
import ProblemDAO from '../../src/dao/problemDao';
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
let dao = new ProblemDAO(pool);

jest.setTimeout(30000);

beforeEach(done => {
  runsqlfile('src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('src/dao/SQL/INSERT_SCRIPT.sql', pool, done);
  });
});
afterAll(() => pool.end());

test("Testing getAll from problem", (done) => {
  dao.getAll((status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(3);
    expect(data[0].problem_description).toBe("A big hole has been found in the rear of Erlend");
    expect(data[0].problem_title).toBe("Erlend tried his best");
    done();
  })
});

test("Testing getOne from problemDao", (done) => {
  let id = 1;
  dao.getOne(id, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].problem_title).toBe("Erlend tried his best");
    expect(data[0].problem_id).toBe(id);
    done();
  })
});

test("Testing getFromMunicipality from problemDao", (done) => {
  let json = {
    "municipality": "Trondheim",
    "county": "Trøndelag"
  };
  dao.getFromMunicipality(json, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].problem_title).toBe("Erlend tried his best");
    expect(data[0].municipality_fk).toBe("Trondheim");
    expect(data[0].county_fk).toBe("Trøndelag");
    done();
  })
});

test("Testing getFromCity from problemDao", (done) => {
  let json = {
    "municipality": "Nord-Fron",
    "county": "Oppland",
    "city":"Vinstra"
  };
  dao.getFromCity(json, (status,data) => {
    expect(status).toBe(200);
    expect(data[0].county_fk).toBe("Oppland");
    expect(data[0].city_fk).toBe("Vinstra");
    expect(data[0].municipality_fk).toBe("Nord-Fron");
    expect(data.length).toBe(1);
    done();
  })
});

test("Testing getFromStreet from problemDao", (done) => {
  let json = {
    "municipality": "Nord-Fron",
    "county": "Oppland",
    "street":"Kjeldeveien"
  };
  dao.getFromStreet(json, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].street_fk).toBe("Kjeldeveien");
    expect(data[0].county_fk).toBe("Oppland");
    expect(data[0].municipality_fk).toBe("Nord-Fron");
    done();
  })
});

test("Testing createOne from problemDao", (done) => {
  let problem = {
    "problem_title":"test",
    "problem_description":"test",
    "img_user":"test",
    "category_fk":"Snowplow",
    "status_fk":"Unchecked",
    "user_fk":1,
    "latitude":2.00,
    "longitude":2.00,
    "county_fk":"Oppland",
    "municipality_fk":"Nord-Fron",
    "city_fk":"Vinstra",
    "street_fk":"Kjeldeveien"
  };
  dao.createOne(problem,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing patchEntrepreneur from problemDao", (done) => {
  let json = {
    description_entrepreneur:"yeeeeeeet",
    img_entrepreneur: "yeeted",
    status: "InProgress"
  };
  let id = 1;
  dao.patchEntrepreneur(id,json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing patchMunicipality from problemDao", (done) => {
  let json = {
    problem_title:"test",
    problem_description:"yeet",
    status:"Finished"
  };
  let id = 1;
  dao.patchMunicipality(id,json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing patchStandard from problemDao", (done) => {
  let json = {
    problem_title:"test",
    problem_description:"test",
    img_user: ''
  };
  let id = 1;
  dao.patchStandard(id,json, (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  });
});

test("Testing deleteOne from problemDao", (done) => {
  let id = 3;
  dao.deleteOne(id, (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

