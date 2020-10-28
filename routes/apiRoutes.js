const path = require("path");
const fs = require("fs");
const UUID = require("uuid");

module.exports = (app) => {

    app.get("/api/notes", (req, res) => {
        console.log("route success");
        fs.readFile('./db/db.json', "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            return res.json(notes);
        });
    })

    app.post("/api/notes", (req, res) => {

        req.body.id = UUID.v1()
        console.log(req.body);
        fs.readFile('./db/db.json', "utf8", (err, data) => {
            let notePost = JSON.parse(data);
            notePost.push(req.body);
            fs.writeFile('./db/db.json', JSON.stringify(notePost), (err) => {
                if (err) throw err;
                res.end();
            });
        })
    })

    app.delete("/api/notes/:id", (req, res) => {
        fs.readFile('./db/db.json', "utf8", (err, data) => {
            let notePost = JSON.parse(data);
        const filtered = notePost.filter(element => element.id !== req.params.id)
        fs.writeFileSync('./db/db.json', JSON.stringify(filtered), "utf8");
        res.end();
        })
    })
};


















for(let i = 0; i < path.length; i++) {
    if(req.params.id === path[i].id) {
        path.splice([i], 1);
    }
}