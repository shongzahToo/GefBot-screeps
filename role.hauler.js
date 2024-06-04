var repairer = require('role.repairer')

module.exports = {
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            })
            if(creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            }).filter((extension) => extension.store.getFreeCapacity > 0) > 0) {
                const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)
                if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDroppedEnergy);
                }
            } else {
                droppedEnergy = droppedEnergy.filter((energy) => energy.pos.lookFor(LOOK_CREEPS).filter((creep) => creep.memory.role == 'staticHarvester').length > 0)
                const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)
                if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDroppedEnergy);
                }
            }
            
        } else {
            const spawns = creep.room.find(FIND_MY_SPAWNS)
            const closestSpawn = creep.pos.findClosestByRange(spawns)
            var err = creep.transfer(closestSpawn, RESOURCE_ENERGY)
            if (err == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSpawn);
            } else if (err == ERR_FULL) {
                creep.drop(RESOURCE_ENERGY)
            } 
        }
    }
};