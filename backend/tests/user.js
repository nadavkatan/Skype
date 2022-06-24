const app = require('../server');
const request = require('supertest');

describe("Users route", ()=>{
    describe('GET /users', ()=>{
        test("should send status code 200", async () => {
            const response = await request(app).get("/users");
            expect(response.status).toBe(200);
          });
          test("should send a json", async () => {
            const response = await request(app).get("/users");
            expect(response.headers["content-type"]).toMatch(/json/);
          });
    });

    describe("GET /users/:id", () => {
        test("should send status code 200", async () => {
          const response = await request(app).get("/users/62b2fb035df106beba511fdb");
          expect(response.status).toBe(200);
        });
        test("should send a json", async () => {
          const response = await request(app).get("/users/62b2fb035df106beba511fdb");
          expect(response.headers["content-type"]).toMatch(/json/);
        });
        test("should send a json with the property 'username'", async () => {
          const response = await request(app).get("/users/62b2fb035df106beba511fdb");
          expect(response.body).toHaveProperty("username");
        });
        test("username property has the value of 'nadav.katan'", async () => {
          const response = await request(app).get("/users/62b2fb035df106beba511fdb");
          expect(response.body.username).toEqual("nadav.katan");
        });
      });

    describe("GET/users/contacts/:id", () => {
        test("should send status code 200", async () => {
            const response = await request(app).get("/users/contacts/62b2fb035df106beba511fdb");
            expect(response.status).toBe(200);
        });
        test("should send a json", async () => {
            const response = await request(app).get("/users/contacts/62b2fb035df106beba511fdb");
            expect(response.headers["content-type"]).toMatch(/json/);
          });
          test("should send a json with the property 'username'", async () => {
            const response = await request(app).get("/users/contacts/62b2fb035df106beba511fdb");
            expect(response.body[0]).toHaveProperty("username");
          });
          test("username property has the value of 'nadav.katan'", async () => {
            const response = await request(app).get("/users/contacts/62b2fb035df106beba511fdb");
            expect(response.body[0].username).toEqual("john.doe");
          });
    });

    describe("PUT/users", () => {
        const body = {id: '62b2fb035df106beba511fdb', username:'nadav.katan', friendId: '62b2fb3c5df106beba511fee', friendName:'john.doe'};
        test('should send status code 200', async () => {
            const response = await request(app).put("/users").send(body);
            expect(response.status).toBe(200);
        });
        test("should send a json", async () => {
            const response = await request(app).put("/users").send(body);
            expect(response.headers["content-type"]).toMatch(/json/);
        });
        test("should send a json that has a 'friends array' with property 'friendName'", async () => {
            const response = await request(app).put("/users").send(body);
            expect(response.body.friends[0]).toHaveProperty("friendName")
        });
        test("friendName property has the value of the new friend", async () => {
          const response = await request(app).put("/users").send(body);
          expect(response.body.friends[0].friendName).toEqual(body.friendName);
        });
    });

    describe("PUT/users/request", () => {
        const friendRequest = {id: '62b2fb035df106beba511fdb', friendName:'john.doe', friendId: '62b2fb3c5df106beba511fee'};
        test('should send status code 200', async () => {
            const response = await request(app).put("/users/request").send(friendRequest);
            expect(response.status).toBe(200);
        });
        test("should send a json", async () => {
            const response = await request(app).put("/users/request").send(friendRequest);
            expect(response.headers["content-type"]).toMatch(/json/);
        });
        test("should send a json with the property 'message'", async () => {
            const response = await request(app).put("/users/request").send(friendRequest);
            expect(response.body).toHaveProperty("message");
          });
        test("message property has the value of 'Friend request sent'", async () => {
            const response = await request(app).put("/users/request").send(friendRequest);
            expect(response.body.message).toEqual("Friend request sent");
          });
    });
    describe("PUT/edit-credentials/62b2fb035df106beba511fdb", () => {
        const formData = {first_name: 'UpdatedName', last_name:'Katan', email: 'nadav@gmail.com', username:'nadav.katan'};
        test('should send status code 200', async () => {
            const response = await request(app).put("/users/edit-credentials/62b2fb035df106beba511fdb").send(formData);
            expect(response.status).toBe(200);
        });
        test("should send a json", async () => {
            const response = await request(app).put("/users/edit-credentials/62b2fb035df106beba511fdb").send(formData);
            expect(response.headers["content-type"]).toMatch(/json/);
        });
        test("should send a json with the property 'first_name'", async () => {
            const response = await request(app).put("/users/edit-credentials/62b2fb035df106beba511fdb").send(formData);;
            expect(response.body).toHaveProperty("first_name");
          });
        test("The property has the value of the formdata.first_name", async () => {
            const response = await request(app).put("/users/edit-credentials/62b2fb035df106beba511fdb");
            expect(response.body.first_name).toEqual(formData.first_name);
          });
    });
    describe("PUT/users/change-password/62b2fb035df106beba511fdb", () => {
        const formData = {currentPassword: '124124124', newPassword:'125125125'};
        test('should send status code 200', async () => {
            const response = await request(app).put("/users/change-password/62b2fb035df106beba511fdb").send(formData);
            expect(response.status).toBe(200);
        });
        test("should send a json", async () => {
            const response = await request(app).put("/users/change-password/62b2fb035df106beba511fdb").send(formData);
            expect(response.headers["content-type"]).toMatch(/json/);
        });
        // test("should send a json with the property 'first_name'", async () => {
        //     const response = await request(app).put("/users/change-password/62b2fb035df106beba511fdb").send(formData);;
        //     expect(response.body).toHaveProperty("first_name");
        //   });
    });
})