var findCreeps = require('backend.sources.calculateSatisfaction')


module.exports = {
    run: function(creep) {
        if(creep.memory.target == undefined) {
            var freeSources = []
            var sources = creep.room.find(FIND_SOURCES)
            for (var i in sources) {
                console.log(findCreeps.total(sources[i]))
                if(findCreeps.total(sources[i]) > 0) {
                    freeSources.push(sources[i])
                }
            }
            if (freeSources.length > 0) {
                creep.memory.target = creep.pos.findClosestByPath(freeSources).id
            }
        } else { 
            target = Game.getObjectById(creep.memory.target)
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
        }
    }
};