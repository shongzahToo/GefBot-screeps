module.exports = {
    satisfied: function(source) {
        var satisfaction = source.energyCapacity / 300
        for (const i in Game.creeps) {
            if(Game.getObjectById(Game.creeps[i].memory.target) == source) {
                satisfaction -= _.sum(Game.creeps[i].body, (part) => part.type == WORK) * 2
            }
        }
        if (satisfaction > 0) {
            return false 
        } else {
            return true
        }
    },
    total: function(source) {
        var satisfaction = source.energyCapacity / 300
        for (const i in Game.creeps) {
            if(Game.getObjectById(Game.creeps[i].memory.target) == source) {
                satisfaction -= _.sum(Game.creeps[i].body, (part) => part.type == WORK) * 2
            }
        }
        return satisfaction
    }
};