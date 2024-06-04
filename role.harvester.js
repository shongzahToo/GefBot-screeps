var repairer = require('role.repairer')
var satisfactionCalculator = require('backend.sources.calculateSatisfaction')

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity
            });
            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                repairer.run(creep)
            }
        }
        else {

            var sources = creep.room.find(FIND_SOURCES).filter((source) => satisfactionCalculator.satisfied(source) == false)
            if (sources.length != 0) {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else {
                var energy = creep.pos.findClosestByRange(creep.room.find(FIND_DROPPED_RESOURCES).filter((resource) => resource.resourceType == RESOURCE_ENERGY))
                if(creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy)
                }
            }
        }
    }
};