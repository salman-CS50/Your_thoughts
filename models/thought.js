const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let thoughtSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    thought: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Thought", thoughtSchema);
