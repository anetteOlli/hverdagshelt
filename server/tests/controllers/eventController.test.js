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

beforeAll(done => {
  runsqlfile('src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('src/dao/SQL/INSERT_SCRIPT.sql', pool, () => {
      done();
    });
  });
});


test("Testing events_create_event from eventController", (done) => {
  let json = {
    event_name: "TEST",
    event_description: "TEST",
    event_img: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/33335219_1930565946955617_4926743241346252800_o.jpg?_nc_cat=102&_nc_ht=scontent-arn2-1.xx&oh=4045e3465ad844be3be2fa56feb0e2e0&oe=5CFEFA28",
    date_starting: "2019-01-18 10:30:00",
    date_ending: "2019-01-20 23:59:59",
    status: "InProgress",
    municipality: "Trondheim",
    county: "Trøndelag",
    city: "Trondheim",
    street: "Klostergata",
    latitude: 63.422724,
    longitude: 10.395582
  };
  eventController.events_create_event(undefined,json, (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  });
});

test("Testing events_get_all from eventController", (done) => {
  eventController.events_get_all((status,data) => {
    expect(status).toBe(200);
    expect(data[0].event_id).toBe(1);
    expect(data[0].event_name).toBe("SNORRES FORTNITE DANSEKURS");
    expect(data.length).toBeGreaterThanOrEqual(2);
    expect(data.length).toBeLessThanOrEqual(2);
    done();
  })
});

test("Testing events_get_event from eventController", (done) => {
  let id = 1;
 eventController.events_get_event(id,(status,data) => {
   expect(status).toBe(200);
   expect(data.event_id).toBe(1);
   expect(data.event_name).toBe("SNORRES FORTNITE DANSEKURS");
   done();
 })
});

test("Testing events_delete_event", (done) => {
  let id = 1;
  eventController.events_delete_event(id,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toEqual(1);
    done();
  })
});

test("Testing events_get_from_municipality", (done) => {
  let json = {
    municipality: "Trondheim",
    county: "Trøndelag"
  };
  eventController.events_get_from_municipality(json, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThanOrEqual(1);
    expect(data.length).toBeLessThanOrEqual(3);
    expect(data[0].event_id).toBe(1);
    expect(data[0].event_name).toBe("SNORRES FORTNITE DANSEKURS");
    expect(data[0].county).toBe(json.county);
    expect(data[0].municipality).toBe(json.municipality);
    done();
  })
});

test("Testing events_edit_event", (done) => {
  let id = 1;
  let json = {
    event_name: "TEST",
    event_description: "TEST",
    event_img: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/33335219_1930565946955617_4926743241346252800_o.jpg?_nc_cat=102&_nc_ht=scontent-arn2-1.xx&oh=4045e3465ad844be3be2fa56feb0e2e0&oe=5CFEFA28",
    date_starting: "2019-01-18 10:30:00",
    date_ending: "2019-01-20 23:59:59",
    status: "InProgress",
    municipality: "Trondheim",
    county: "Trøndelag",
    city: "Trondheim",
    street: "Klostergata",
    latitude: 63.422724,
    longitude: 10.395582
  };
  eventController.events_edit_event(id,json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

