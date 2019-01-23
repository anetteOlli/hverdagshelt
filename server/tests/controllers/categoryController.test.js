import * as mysql from 'mysql';

const categoryController = require('../../src/controllers/categoryController');
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
    runsqlfile('src/dao/SQL/INSERT_SCRIPT.sql', pool, () => {
      done();
    });
  });
});
afterAll(() => pool.end());

test("Testing get_all_categories", (done) => {
  categoryController.categories_get_all((status,data) => {
   expect(status).toBe(200);
   expect(data.length).toBe(4);
   expect(data[3].category).toBe("Tree in road");
   expect(data[0].category).toBe("Hole in road");
   done();
  })
});

test("Testing create_category", (done) => {
 categoryController.categories_create_category({category:"Yeeet"}, (status,data) => {
   expect(status).toBe(200);
   expect(data.affectedRows).toBe(1);
   done();
 })
});

test("Testing delete_category", (done) => {
  categoryController.categories_delete_category("Hole in road", (status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});