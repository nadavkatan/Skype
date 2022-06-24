const { connect, clearDatabase, closeConnection } = require("./db");
const {createNotification, getAllUserNotification, deleteNotification, deleteAllConnectionNotifications} = require('../controllers/notification.controller');

beforeAll(async () => {
    await connect();
  });
  
  afterEach(async () => {
    await clearDatabase();
  });
  
  afterAll(async () => {
    await closeConnection();
  });

  describe("Testing MongoDB Notifications collection", () => {
    const friendRequestData = {
        user_id: '123',
        sender_id: '124',
        title: "friend_request",
        content: {
          sender_name: 'barack.obama',
          receiver_id: '123',
          receiver_name: 'nadav.katan',
          confirmation_text: "",
        },
      };
      const connectionConfirmation = {
        user_id: '123',
        sender_id: '124',
        title: "connection_confirmation",
        content: {
          sender_name: 'barack.obama',
          receiver_id: '123',
          receiver_name: 'nadav.katan',
          confirmation_text: "You are now connected with",
        },
      };
    test("should create a new chat", async () => {
      const createdNotification = await createNotification(friendRequestData);
      expect(createdNotification.user_id).toBe(friendRequestData.user_id);
    });
    test("should get all notifications related to specific user by its id", async () => {
        const createdNotification = await createNotification(friendRequestData);
        const notifications= await getAllUserNotification('123');
      expect(notifications[0].title).toBe(friendRequestData.title);
    });
    test("should delete notification", async () => {
        const createdNotification = await createNotification(friendRequestData);
        await deleteNotification({user_id:'123', sender_id:'124'});
        const notifications= await getAllUserNotification('123');
        expect(notifications.length).toBeFalsy();
      });
      test("should delete connection_confirmation notification", async () => {
        const createdNotification = await createNotification(connectionConfirmation);
        await deleteAllConnectionNotifications({user_id:'123'});
        const notifications= await getAllUserNotification('123');
        expect(notifications.length).toBeFalsy();
      });
  });