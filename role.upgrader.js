var roadBuilder = require('backend.buildRoad')

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.memory.working == true && creep.room.find(FIND_MY_CREEPS).length > 15) {
            if(creep.room.memory.controllerHasRoad == undefined) {
                roadBuilder.run(creep.pos, creep.room.controller.pos, creep.room)
                creep.room.memory.controllerHasRoad = true
            }
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};