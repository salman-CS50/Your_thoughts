const Thought = require("../models/thought");
const initDb = require("./data");

const init = async () => {
    let newThought = await Thought.insertMany(initDb.data);
    console.log(newThought);

}

init()
