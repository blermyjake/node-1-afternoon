// Require express and body-parser
const express = require('express');
const bodyParser = require('body-parser');
//  Since we used module.exports in our server/controllers/messages_controller.js we can require it in our index.js. The entire index.js will have access to all the methods we put on the object ( create, read, update, and delete ).
const mc = require(__dirname + '/controllers/message_controller');


// Create an express app
const app = express();

const port = 3000;
// Configure the app to parse JSON from the body.
app.use(bodyParser.json());
// Use express.static to serve the public/build folder.
app.use( express.static(__dirname + '/../public/build'));



// We can then use the built-in methods express gives us to create endpoints. We'll use post for create; get for read; put for update; and delete for delete. We'll also make a messagesBaseUrl variable so that if the URL ever changes we won't have to update in four different places. The messagesBaseUrl should equal /api/messages. 
// For the put and delete endpoints, we need to add on a url parameter of id. A url paramter can be defined by adding :variableName when making the URL for an endpoint.
const messagesBaseUrl = '/api/messages';
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}/:id`, mc.update );
app.delete( `${messagesBaseUrl}/:id`, mc.delete );

// Now when a get request is sent to http://localhost:3000 our read function will be executed in our messages_controller. Which will then send a response of the messages array. Here is a map of what happens when certain requests come through:
// http://localhost:3000 ( POST ) - create from messages_controller executes - responds with messages array.
// http://localhost:3000 ( GET ) - read from messages_controller executes - responds with messages array.
// http://localhost:3000 ( PUT ) - update from messages_controller executes - responds with messages array.
// http://localhost:3000 ( DELETE ) - delete from messages_controller executes - responds with messages array.



// Configure the app to listen on port 3000 and display a message when it is listening.
app.listen(port, ()=>{ console.log(`Listening on port: ${port}`);
});
