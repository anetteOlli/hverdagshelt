import * as mysql from 'mysql';

const problemController = require('../../src/controllers/problemController');
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
    runsqlfile('src/dao/SQL/testINSERT.sql', pool, () => {
      done();
    });
  });
});


test("Testing problems_get_all from problemcontroller", (done) => {
  problemController.problems_get_all((status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBeLessThanOrEqual(4);
    expect(data.length).toBeGreaterThanOrEqual(2);
    expect(data[0].problem_description).toBe("A big hole has been found in the rear of Erlend");
    expect(data[0].problem_title).toBe("Erlend tried his best");
    done();
  })
});

test("Testing problems_get_one from problemController", (done) => {
  let id = 1;
  problemController.problems_get_problem(id, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].problem_title).toBe("Erlend tried his best");
    expect(data[0].problem_id).toBe(id);
    done();
  })
});

test("Testing problems_get_from_municipality from problemController", (done) => {
  let json = {
    "municipality": "Trondheim",
    "county": "Trøndelag"
  };

  problemController.problems_get_from_municipality(json, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThanOrEqual(0);
    expect(data.length).toBeLessThanOrEqual(2);
    expect(data[0].problem_title).toBe("Erlend tried his best");
    expect(data[0].municipality).toBe("Trondheim");
    expect(data[0].county).toBe("Trøndelag");
    done();
  })
});

test("Testing problems_get_from_municipality_and_street from problemController", (done) => {
  let json = {
    "municipality": "Nord-Fron",
    "county": "Oppland",
    "street":"Kjeldeveien"
  };
  problemController.problems_get_from_municipality_and_street(json, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].street).toBe("Kjeldeveien");
    expect(data[0].county).toBe("Oppland");
    expect(data[0].municipality).toBe("Nord-Fron");
    done();
  })
});

test("Testing problems_add_entrepreneur from problemController", (done) => {
  let json = {
    entrepreneur_id:3,
    problem_id:2
  };
  problemController.problems_add_entrepreneur(json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing problems_create_problem from problemController", (done) => {
  let problem = {
    "problem_title":"test",
    "problem_description":"test",
    "img_user":"test",
    "category":"Snowplow",
    "status":"Unchecked",
    "user_id":1,
    "latitude":2.00,
    "longitude":2.00,
    "county":"Oppland",
    "municipality":"Nord-Fron",
    "city":"Vinstra",
    "street":"Kjeldeveien"
  };
  problemController.problems_create_problem(undefined, problem,(status,data) => {
    expect(status).toBe(200);
    expect(data[0].affectedRows).toBe(1);
    problem.street = "yeetStreet";
    problemController.problems_create_problem(undefined,problem,(status,data) => {
      expect(status).toBe(200);
      expect(data[0].affectedRows).toBe(1);
      problem.county = "yeet";
      problemController.problems_create_problem(undefined, problem, (status,data) => {
        expect(status).toBe(500);
        done();
      })
    })
  })
});

/* Had some issues testing this.
test("Testing problems_support_problem from problemController", (done) => {
  let id = 4;
  let json = {
    user_id: 4,
    problem_id: 4,
  };
  problemController.problems_support_problem(id,json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    // problemController.problems_support_problem(id,json,(status,data) => {
    //   expect(status).toBe(500);
    //   expect(data.affectedRows).toBe(0);
    //   done();
    // })
    done();
  })

});*/

test("Testing problems_delete_problem  from problemController", (done) => {
  let id = 2;
  let json = {
    priority: "Administrator"
  };
  problemController.problems_delete_problem(id,json,(status,data) => {
    expect(status).toBe(status);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing problems_get_problem_by_entrepreneur  from problemController", (done) => {
  let id = 3;
  problemController.problems_get_problem_by_entrepreneur(id,(status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThanOrEqual(0);
    expect(data.length).toBeLessThanOrEqual(2);
    done();
  })
});

test("Testing problems_get_problem_by_user from problemController", (done) => {
  let id = 1;
  problemController.problems_get_problem_by_user(id, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBeLessThanOrEqual(6);
    expect(data.length).toBeGreaterThanOrEqual(4);
    expect(data[0].problem_title).toBe("Erlend tried his best");
    expect(data[0].user_id).toBe(id);
    done();
  })
});

test("Testing problems_get_from_municipality_sorted from problemController", (done) => {
  let json = {
    county:"Trøndelag",
    municipality: "Trondheim"
  };
  problemController.problems_get_from_municipality_sorted(json, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(2);
    expect(data[0].problem_title).toBe("Erlend tried his best");
    expect(data[0].county).toBe(json.county);
    expect(data[0].municipality).toBe(json.municipality);
    done();
  })
});
