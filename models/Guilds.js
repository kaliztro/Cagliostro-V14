const { Schema, model } = require(`mongoose`);

const prefixSchema = new Schema({
    _id: String,
    Prefix: {
        prefix: String,
    },
    Welcome: {
        canal: String,
    },
    Saida: {
        canal: String,
    },
    AutoCargo: {
        cargo: String,
    },
    Botao: {
        cargo: String,
    },
    
});

module.exports = model("Guilds", prefixSchema)

