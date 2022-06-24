This project is s Skype clone! <br />
<br />

**Technologies used in creating the app:** <br />
MERN (Mongoose, Express, React, and Node), Material Ui for design and responsivity, Passport js for local authentication, react hook form and yup for validation, and Redux toolkit for state management (which proved to be extremely essential). The chat functionality was built with socket.io in order to allow fast, live communication between users. The live notifications functionality was built using a combination of mongodb change streams (that provides live updates on any modification in the database collections) and socket.io (that communicates these updates to the frontend, presenting them to the user). To allow users to upload their profile picture, I used multer and cloudinary. Finally, the video call functionality was built with Peerjs, which allows simpler development of webRTC.
<br />

**This project includes the following features:** <br />

- Users can register to the app. <br />
- Once they are registered, they can search for other members that use the app and send them a friend request. <br />
- The user receiving the request will be immediately notified of having received a friend request. <br />
- The user receiving the request will be able to either confirm or decline the friend request. Should he/she choose to confirm the request, the connection between the users will be established and both of them will immediately receive a connection confirmation notification. Declining the request will simply remove the friend request notification. <br />
- Once the two users are connected, they will be able to chat and video call. <br />
- Their chat history will be continuously stored and updated as well as their video call history, which will also include call durations. <br />
- Users will additionally be able to edit their profile. They will be able to change any of their personal information, as well as their login password, as long as it passes the standard validations. Furthermore, the users will also be able to modify their default profile picture to a picture of their own which will be displayed to other users of the app.
  <br />
  <br />
  Check out the README at the testing branch for a more elaborate description of my working process and approach. <br/>
  The project can be viewed here: https://my-skype-clone.herokuapp.com/<br />
