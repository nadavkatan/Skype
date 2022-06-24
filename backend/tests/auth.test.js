const { connect, clearDatabase, closeConnection } = require("./db");
const createUser = require('../controllers/auth.controller');
const {getUserById, getAllUsers, getUserByName} = require('../controllers/user.controller');

beforeAll(async () => {
    await connect();
  });
  
  afterEach(async () => {
    await clearDatabase();
  });
  
  afterAll(async () => {
    await closeConnection();
  });
  describe("Testing MongoDB Users collection", () => {
    const newUser = { first_name: "Barack", last_name: "Obama", email: "barack@gmail.com", username: "barack.obama", password:"124124124" };
    test("should create new user", async () => {
      const createdUser = await createUser(newUser);
      expect(createdUser.first_name).toBe("Barack");
    });
    test("should find user by id", async () => {
      const createdUser = await createUser(newUser);
      const foundUser = await getUserById(createdUser._id);
      expect(foundUser.first_name).toBe("Barack");
    });
    test("should return all users", async () => {
        const createdUser = await createUser(newUser);
        const foundUser = await getUserByName(newUser.username);
        console.log(foundUser)
        expect(foundUser.username).toBe("barack.obama");
    });
  });