This is my final project for the fullstack web development course. <br />
I have chosen to create a clone of Skype. The final result can be viewed here: https://my-skype-clone.herokuapp.com/<br />
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

**Technologies used in creating the app:** <br />
MERN (Mongoose, Express, React, and Node), Material Ui for design and responsivity, Passport js for local authentication, react hook form and yup for validation, and Redux toolkit for state management (which proved to be extremely essential). The chat functionality was built with socket.io in order to allow fast, live communication between users. The live notifications functionality was built using a combination of mongodb change streams (that provides live updates on any modification in the database collections) and socket.io (that communicates these updates to the frontend, presenting them to the user). To allow users to upload their profile picture, I used multer and cloudinary. Finally, the video call functionality was built with Peerjs, which allows simpler development of webRTC.
<br />

**My general approach in developing the app:** <br />
For the final project, I wanted to build an app that is less conventional as a final project, and to also use this opportunity challenge myself with learning technologies that haven't been taught in the course of the Bootcamp. Nevertheless, I have decided to break it down into predefined steps. I started by building the authentication functionality, moved on to allow the search of users, then I worked on the basic ui design. I tried the mobile-first strategy which was pretty handly. I loosely relied on the original design of Skype and mainly on the wireframes that I made in figma. The design was improved along the process of building the app. I then worked on the friend requests functionality, and the option to respond to it etc. After this was established, I went on to build that chat. I had to search for the best technology to use and from my search, socket.io seemed to be extremely popular in building live chats. It turned out to be fairly simple technology to use and very handy indeed for developing chat apps. I then went on to build the live notifications in such a way that when friend requests (for instance) would be presented to the user without the need to refresh the page. As explained above, this was achieved with mongodb change stream (which is awesome) and socket.io. Finally, I tried several technologies to implement video call functionality. The most straightforward one which I ended up using was peerjs.
