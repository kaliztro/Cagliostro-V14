const { Schema, model } = require(`mongoose`);

const DonoSchema = new Schema({
    _id: String,
    Status: {
        mensagem: String,
    },    
});

module.exports = model("outro", DonoSchema)

