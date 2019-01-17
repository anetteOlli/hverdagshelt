// @flow
import EventDAO from '../src/dao/eventDao';
const mysql = require('mysql');
const runsqlfile = require('../src/dao/SQL/runsqlfile');


let pool = mysql.createPool({
  connectionLimit: 1000000,
  host: 'mysql',
  user: 'root',
  password: 'abc12345!',
  database: 'testdb',
  debug: false,
  multipleStatements: true
});
let dao = new EventDAO(pool);

jest.setTimeout(30000);

beforeEach(done => {
  runsqlfile('src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('src/dao/SQL/INSERT_SCRIPT.sql', pool, done);
  });
});
afterAll(() => pool.end());


test("Testing getAll from eventsDao", (done) => {
  dao.getAll((status,data) => {
    expect(status).toBe(200);
    //expect(data).toBeArray();
    expect(data[0]).toBe({
      event_id: 1,
      event_name: "SNORRES FORTNITE DANSEKURS",
      event_description: "HAR DU LYST TIL Å BLI DEN KULESTE PÅ DANSEGOLVET?!?! NÅ ER MULIGHETEN DIN HER. SNORRES BRAND NEW AND FRESH DANSE KURS SKAL STARTE OPP",
      event_img: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/33335219_1930565946955617_4926743241346252800_o.jpg?_nc_cat=102&_nc_ht=scontent-arn2-1.xx&oh=4045e3465ad844be3be2fa56feb0e2e0&oe=5CFEFA28",
      date_starting: "2019-01-18 10:30:00",
      date_ending: "2019-01-20 23:59:59",
      status_fk: "InProgress",
      municipality_fk: "Trondheim",
      county_fk: "Trøndelag",
      city_fk: "Trondheim",
      street_fk: "Klostergata",
      latitude: 63.422724,
      longitude: 10.395582
    });
    expect(data.length).toBeGreaterThanOrEqual(2);
    expect(data.length).toBeLessThanOrEqual(4);
    done();
  })
});

test('Testing getOne from eventDao', (done) => {
  let id = 1;
  dao.getOne(id,(status,data) => {
   expect(status).toBe(200);
   expect(data).toBeArrayOfSize(1);
   expect(data[0]).toEqual({
     event_id: 1,
     event_name: "SNORRES FORTNITE DANSEKURS",
     event_description: "HAR DU LYST TIL Å BLI DEN KULESTE PÅ DANSEGOLVET?!?! NÅ ER MULIGHETEN DIN HER. SNORRES BRAND NEW AND FRESH DANSE KURS SKAL STARTE OPP",
     event_img: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/33335219_1930565946955617_4926743241346252800_o.jpg?_nc_cat=102&_nc_ht=scontent-arn2-1.xx&oh=4045e3465ad844be3be2fa56feb0e2e0&oe=5CFEFA28",
     date_starting: "2019-01-18 10:30:00",
     date_ending: "2019-01-20 23:59:59",
     status_fk: "InProgress",
     municipality_fk: "Trondheim",
     county_fk: "Trøndelag",
     city_fk: "Trondheim",
     street_fk: "Klostergata",
     latitude: 63.422724,
     longitude: 10.395582
   });
   done();
  })
});

test("Testing getAllMunicipalities from eventDao", (done) => {
  let json = {
    municipality_fk: "Trondheim",
    county_fk: "Trøndelag"
  };
  dao.getByMunicipality(json,(status,data) => {
    expect(status).toBe(200);
    expect(data).toBeArrayOfSize(2);
    expect(data[0]).toBe({
      event_id: 1,
      event_name: "SNORRES FORTNITE DANSEKURS",
      event_description: "HAR DU LYST TIL Å BLI DEN KULESTE PÅ DANSEGOLVET?!?! NÅ ER MULIGHETEN DIN HER. SNORRES BRAND NEW AND FRESH DANSE KURS SKAL STARTE OPP",
      event_img: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/33335219_1930565946955617_4926743241346252800_o.jpg?_nc_cat=102&_nc_ht=scontent-arn2-1.xx&oh=4045e3465ad844be3be2fa56feb0e2e0&oe=5CFEFA28",
      date_starting: "2019-01-18 10:30:00",
      date_ending: "2019-01-20 23:59:59",
      status_fk: "InProgress",
      municipality_fk: "Trondheim",
      county_fk: "Trøndelag",
      city_fk: "Trondheim",
      street_fk: "Klostergata",
      latitude: 63.422724,
      longitude: 10.395582
    });
    expect(data[0].county_fk && data[1].county_fk).toBe(json.county_fk);
    expect(data[0].municipality_fk && data[1].municipality_fk).toBe(json.municipality_fk);
    done();
  })
});

test("Testing createOne from eventDao", (done) => {
  let json = {
    event_name: "TEST",
    event_description: "TEST",
    event_img: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/33335219_1930565946955617_4926743241346252800_o.jpg?_nc_cat=102&_nc_ht=scontent-arn2-1.xx&oh=4045e3465ad844be3be2fa56feb0e2e0&oe=5CFEFA28",
    date_starting: "2019-01-18 10:30:00",
    date_ending: "2019-01-20 23:59:59",
    status_fk: "InProgress",
    municipality_fk: "Trondheim",
    county_fk: "Trøndelag",
    city_fk: "Trondheim",
    street_fk: "Klostergata",
    latitude: 63.422724,
    longitude: 10.395582
  };
  dao.createOne(json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing deleteOne from eventDao", (done) => {
  let id = 1;
  dao.deleteOne(id, (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toEqual(1);
    done();
  })
});

test("Testing patch from eventDao", (done) => {
  let id = 1;
  let json = {
    event_name: "TEST",
    event_description: "TEST",
    event_img: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/33335219_1930565946955617_4926743241346252800_o.jpg?_nc_cat=102&_nc_ht=scontent-arn2-1.xx&oh=4045e3465ad844be3be2fa56feb0e2e0&oe=5CFEFA28",
    date_starting: "2019-01-18 10:30:00",
    date_ending: "2019-01-20 23:59:59",
    status_fk: "InProgress",
    municipality_fk: "Trondheim",
    county_fk: "Trøndelag",
    city_fk: "Trondheim",
    street_fk: "Klostergata",
    latitude: 63.422724,
    longitude: 10.395582
  };
  dao.patch(id,json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("TESTING delete from eventDAO", (done) => {
  let id = 1;
  dao.deleteOne(id,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});
