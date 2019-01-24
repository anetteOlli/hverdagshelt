import * as mysql from 'mysql';

const userController = require('../../src/controllers/userController');
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


test("Testing users_get_all from userController", (done) => {
  userController.users_get_all((status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBeLessThanOrEqual(5);
    expect(data.length).toBeGreaterThanOrEqual(3);
    done();
  });
});

test("Testing users_get_user from userController", (done) => {
  let id = 3;
  userController.users_get_user(id,(status,data) => {
    expect(status).toBe(200);
    expect(data.user_id).toBe(id);
    expect(data.email).toBe('entr@entr.entr');
    expect(data.priority).toBe('Entrepreneur');
    done();
  })
});

test("Testing users_activate from userController",(done) => {
  let json = {
    data: {
      email: "user@user.user"
    }
  };
  userController.user_activate(json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing users_validate_Email from userController", (done) => {
  let email = "user@user.user";
  userController.user_validate_email(email,(status,data) => {
    expect(status).toBe(200);
    expect(data.emailExist).toBe(true);
    done();
  })
});

test("Testing users_delete_user from userController", (done) => {
  let id = 3;
  userController.user_delete_user(id,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing users_ from userController", (done) => {
  let json = {
    email:"yarra@yarra.yar",
    password:"hacked"
  };
  let id = 1;
  userController.user_patch_user(id,json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
})

test("Testing users_create_user from userController", (done) => {
  let json = {
    email:"rar@rar.rar",
    municipality:"Nord-Fron",
    county:"Oppland",
    password: 'test'
  };
  userController.users_create_user(json, (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing users_patch_user from userController", (done) => {
  let json = {
    email:"user@user.user",
    password:"hacked"
  };
  let id = 1;
  userController.user_patch_user(id,json, (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing users_refresh from userController", (done) => {
  let user = {
    id: 1,
    priority:"Standard"
  };

  userController.users_refresh(user,(status,data) => {
    expect(status).toBe(200);
    expect(data.id).toBe(user.id);
    expect(data.priority).toBe(user.priority);
    done();
  })
});

test("Testing users_login from userController", (done) => {
  let user = {
    id: 1,
    priority:"Standard",
    email:"admin@admin.admin",
    password:"abc123"
  };
  userController.users_login(user,(status,data) => {
    expect(status).toBe(200);
    expect(data.id).toBe(4);
    user.password = "fasdfasd"
    userController.users_login(user, (status,data) => {
      expect(status).toBe(401);
      expect(data.message).toBe("WRONG_PASSWORD");
      user.email = "heihå@heiå.heiå";
      userController.users_login(json, (status,data) => {
        expect(status).toBe(404);
        expect(data.message).toBe("NOT_FOUND");
        done();
      })
    })
  });
});

test("Testing users_forgot_password from userController", (done) => {
  let user = {
    id: 1,
    priority:"Standard",
    email:"admin@admin.admin",
    password:"abc123"
  };
  userController.user_forgot_password(user,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
  })
})


