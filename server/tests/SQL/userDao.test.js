// @flow
import UserDAO from '../../src/dao/userDao';
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
let dao = new UserDAO(pool);

jest.setTimeout(30000);

beforeEach(done => {
  runsqlfile('src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('src/dao/SQL/INSERT_SCRIPT.sql', pool, done);
  });
});

test("Testing getAll from userDao", (done) => {
  dao.getAll((status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(4);
    expect(data[0].email).toBe("user@user.user");
    done();
  });
});

test("Testing getOneById from userDao", (done) => {
  let id = 3;
  dao.getOneById(id, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].email).toBe('entr@entr.entr');
    expect(data[0].priority).toBe('Entrepreneur');
    done();
  })
});

test("Testing getCreateUser from userDao", (done) => {
  let json = {
    email:"rar@rar.rar",
    municipality:"Nord-Fron",
    county:"Oppland"
  };
  let password = 'test';
  let standard = "standard";
  dao.createUser(json,password,standard, (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});


test("Testing patchOne from userDao", (done) => {
  let json = {
    email:"yarra@yarra.yar",
    password:"hacked"
  };
  let id = 1;
  dao.patchOne(id,json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing deleteOne from userDao", (done) => {
  let id = 3;
  dao.deleteOne(id,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing checkMail from userDao", (done) => {
  let email = "user@user.user";
  dao.checkEmail(email,(status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].user_id).toBe(1);
    expect(data[0].priority).toBe("Standard");
    done();
  })
});

test("Testing activateUser from userDao", (done) => {
  let email = "user@user.user";
  dao.activateUser(email, (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing changePassword from userDao", (done) => {
  let json = {
    email: "user@user.user",
    password: "test",
    user_id : 1
  };
  dao.changePassword(json, json.password, (status,data) => {
   expect(status).toBe(200);
   expect(data.affectedRows).toBe(1);
   done();
  });
});