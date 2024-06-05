module.exports = {
    run: function(pos1, pos2, room) {
        var path = PathFinder.search(pos1, pos2).path
        for(const i in path) {
            room.createConstructionSite(path[i], STRUCTURE_ROAD)
        }
    }
};