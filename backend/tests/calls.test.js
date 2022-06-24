const { connect, clearDatabase, closeConnection } = require("./db");
const {storeCall, getParticipantCalls} = require('../controllers/call.controller');

beforeAll(async () => {
    await connect();
  });
  
  afterEach(async () => {
    await clearDatabase();
  });
  
  afterAll(async () => {
    await closeConnection();
  });

  describe("Testing MongoDB Calls collection", () => {
    const newCall = { 
      participants: [
        {participant_username: "barack.obama", participant_id: "123", participant_avatar:"https://res.cloudinary.com/disyvovh2/image/upload/v1655660093/avatars/avatar-1655660092535.png"},
        {participant_username: "nadav.katan", participant_id: "124", participant_avatar:"https://res.cloudinary.com/disyvovh2/image/upload/v1655452675/avatars/avatar-1655452674660.png"}],
      call_duration: "00:00:14"};
    test("should create a new call", async () => {
      const createdCall = await storeCall(newCall);
      expect(createdCall.call_duration).toBe(newCall.call_duration);
    });
    test("should find the user's calls list by user's id", async () => {
         await storeCall(newCall);
      const calls = await getParticipantCalls(newCall.participants[0].participant_id);
      expect(calls[0].call_duration).toBe(newCall.call_duration);
    });
  });