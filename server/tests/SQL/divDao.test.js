import DivDAO from '../../src/dao/divDao';
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
let dao = new DivDAO(pool);

jest.setTimeout(30000);

beforeEach(done => {
  runsqlfile('src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('src/dao/SQL/INSERT_SCRIPT.sql', pool, done);
  });
});
afterAll(() => pool.end());

test("Testing getAllMunicipalities from DivDao", (done) => {
  dao.getAllMunicipalities((status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(422);
    expect(data[0].municipality).toBe("Halden");
    expect(data[47].municipality).toBe("Eidskog");
    done();
  })
});

test("Testing getAllCounties from DivDao", (done) => {
  dao.getAllCounties((status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(18);
    expect(data[0].name).toBe("Akershus");
    expect(data[14].name).toBe("Buskerud");
    done();
  })
});

test("Testing getMunicipalitiesByCounty from DivDao", (done) => {
  let county = "Trøndelag";
  dao.getMunicipalitiesByCounty(county,(status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(48);
    expect(data[2].municipality).toBe("Namsos");
    expect(data[9].municipality).toBe("Agdenes");
    done();
  })
});

test("Testing createCity from DivDao", (done) => {
  let city = "Test";
  dao.createCity(city,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing createStreet from DivDao", (done) => {
  let street = "Test";
  dao.createStreet(street, (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});
