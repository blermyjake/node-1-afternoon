// Create an array to hold the messages.
let messages = [];
// Create a variable that will keep track of what id to assign to messages.
// The id should start at 0 and increment after every creation.
let id = 0;


// Export an object with methods to create, read, update, and delete messages.
// Create - Should be able to create a message using text and time off of the request body.
// Should be able to assign a unique id to the message.
// Read - Should be able to return the messages array.
// Update - Should be able to update the text property of a message using the request body.
// Should be able to determine which message to update using an id url parameter.
// Delete - Should be able to delete a message using an id url parameter.
// All methods should send a response of the updated messages array.

module.exports = {
// The create method should create a new message object using text and time from the request body and also the global id variable.
    create: (req, res) =>{
        const {text, time } = req.body;
// It should then push this new messsage object into the messages array.
        messages.push({id, text, time });
//After a new message object is created, id should be incremented by one so that the previous id won't be used on any other future messages. This will effectively keep the id unique for every message. 
        id++;
// We'll then want to send the updated messages array.
        res.status(200).send( messages );
    },
// The read method should return the entire messages array. 200 is the error protocols whereas 200 let's you know it worked.
    read: (req, res)=>{
        res.status(200).send( messages );
    },

// It should also determine which message to update based on the value of id from the request url parameters. We can use .findIndex to get the index where the ids match. We can then get the object using the index and update the object. Then we can return the updated messages array.
    update: (req, res)=>{
// The update method should update the text property of a message using the text value from the request body. 
    const {text} = req.body 
//It should also determine which message to update based on the value of id from the request url parameters. We can use .findIndex to get the index where the ids match.
    const updateID= req.params.id
    const messageIndex = messages.findIndex( message => message.id == updateID);
    let message = messages[ messageIndex];

    messages[ messageIndex ] = {
        id: message.id, 
        text: text || message.text, 
        time: message.time
    };
    res.status(200).send( messages );
    },

// The delete method should delete a message using the value of id from the request url parameters. We can use .findIndex again with the id to get the index of the message object and then use .splice to remove it from the messages array. We'll then want to send the updated messages array.
    delete: (req, res)=>{
        const deleteID = req.params.id;    
        messageIndex = messages.findIndex( message => message.id == deleteID );
        messages.splice(messageIndex, 1);
        res.status(200).send( messages );
    },
}





