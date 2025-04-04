const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Thought = require("./models/thought");
const methodOverride = require('method-override');
require("dotenv").config
const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

main()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

app.get("/", (req, res) => {
    res.redirect("/thought");
})

app.get("/thought", (req, res) => {
    res.render("./index");
});

app.post("/", async (req, res) => {
    let newThought = await new Thought(req.body);
    newThought.save();
    res.redirect("/thought")
});

app.get("/thoughts", async(req, res) => {
    let allThoughts = await Thought.find({});
    res.render("./thoughts", { allThoughts })
});

app.get("/admin", async (req, res) => {
    let allThoughts = await Thought.find({});
    res.render("./admin", { allThoughts });
});

app.get("/login", (req, res) => {
    res.render("./login");
});

app.post("/login", async (req, res) => {
    let { pass } = req.body;
    if(pass === "waterMAN!") {
        res.redirect("/admin")
    } else {
        return res.render("./login");
    }
})

app.delete("/admin/:id", async (req, res) => {
    await Thought.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
