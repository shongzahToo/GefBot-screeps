module.exports = {
    run: function(room) {
        if(room.memory.sources == undefined) {
            room.memory.sources = room.find(FIND_SOURCES)
        }
    }
};