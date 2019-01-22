import * as mysql from 'mysql';

const eventController = require('../../src/controllers/eventController');
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

test("Testing tested my life right here", (done) => {
  let file = require('./testImg.jpg');
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
  eventController.events_create_event(file,json, (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  });
});