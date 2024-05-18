let connectedServersCache = {}

module.exports = {
    add: function (key, value) {
        connectedServersCache[key] = value
    },
    remove: function (key) {
        delete connectedServersCache[key]
    },
    get: function (key) {
        return connectedServersCache[key]
    },
    getAll: function () {
        return connectedServersCache
    },
}