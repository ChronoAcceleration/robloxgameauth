const SimpleJsonDB = require("simple-json-db");
const db = new SimpleJsonDB("./connectedServers.json");

module.exports = {
    add: function (key, value) {
        db.set(key, value);
    },
    remove: function (key) {
        db.delete(key);
    },
    get: function (key) {
        return db.get(key);
    },
    getAll: function () {
        return db.JSON();
    },
};
