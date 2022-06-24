const { connect, clearDatabase, closeConnection } = require("./db");
const {createNewChat, addMessage, getChat, getUsersChats} = require('../controllers/chat.controller');

beforeAll(async () => {
    await connect();
  });
  
  afterEach(async () => {
    await clearDatabase();
  });
  
  afterAll(async () => {
    await closeConnection();
  });

  describe("Testing MongoDB Chats collection", () => {
    const chatMembers = ['123', '124'];
    test("should create a new chat", async () => {
      const createdChat = await createNewChat({members: chatMembers});
      expect(createdChat.members[0]).toBe(chatMembers[0]);
    });
    test("should add a message to the chat", async () => {
        const createdChat = await createNewChat({members: chatMembers});
        const message = {room: createdChat._id, author: "barack.obama", message:'Hi Nadav!', time:'13:25'}
        const updatedChat = await addMessage(createdChat._id, message);
      expect(updatedChat.messages[0].message).toBe(message.message);
    });
    test("should find a chat by its id", async () => {
        const createdChat = await createNewChat({members: chatMembers});
        const foundChat = await getChat(createdChat._id)
        expect(foundChat.members[0]).toBe(createdChat.members[0]);
      });
    test("should find all active chats of a specific user by its id", async () => {
        const createdChat = await createNewChat({members: chatMembers});
        const chats = await getUsersChats('123')
        console.log(chats);
        expect(chats[0].members[0]).toBe(createdChat.members[0]);
      });
  });