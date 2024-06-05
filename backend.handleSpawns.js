var satisfactionCalculator = require('backend.sources.calculateSatisfaction')
var buildClosest = require('backend.buildClosest')

module.exports = {
    run: function(spawn) {
        //setup for spawner needs
        if(spawn.memory.needs == undefined) {
            spawn.memory.needs = {
                'harvesters': 3,
                'builders': 0,
                'haulers': 0,
                'repairers': 0,
                'upgraders': 0,
                'staticHarvesters': 0
            }
        }
        
        //uses the needs array to calculate when creep needs creating
        needs = spawn.memory.needs
        if(_.sum(Game.creeps, (c) => c.memory.role == 'hauler') < needs.haulers) {
            spawn.createCreep([CARRY, MOVE, CARRY, MOVE], 'hauler' + Game.time, {role: 'hauler', working: false})
        } else if(_.sum(Game.creeps, (c) => c.memory.role == 'staticHarvester') < needs.staticHarvesters) {
            spawn.createCreep([WORK, WORK, MOVE], 'staticHarvester' + Game.time, {role: 'staticHarvester', working: false})
        } else if(_.sum(Game.creeps, (c) => c.memory.role == 'harvester') < needs.harvesters && !spawn.memory.staticSpawning) {
            spawn.createCreep([WORK, WORK, CARRY, MOVE], 'harvester' + Game.time, {role: 'harvester', working: false})
        } else if(_.sum(Game.creeps, (c) => c.memory.role == 'builder') < needs.builders) {
            spawn.createCreep([WORK, WORK, CARRY, MOVE], 'builder' + Game.time, {role: 'builder', working: false})
        } else if(_.sum(Game.creeps, (c) => c.memory.role == 'repairer') < needs.repairers) {
            spawn.createCreep([WORK, WORK, CARRY, MOVE], 'repairer' + Game.time, {role: 'repairer', working: false})
        } else if(_.sum(Game.creeps, (c) => c.memory.role == 'upgrader') < needs.upgraders) {
            spawn.createCreep([WORK, WORK, CARRY, MOVE], 'upgrader' + Game.time, {role: 'upgrader', working: false})
        }
        
        //logic for calculating what to do when the spawner is full and where resources should be placed next
        if(spawn.spawning == null && spawn.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            //switching to static harvesting when certain conditions are met and increasing the amount of static miners when the satisfaction for sources is not met
            if(_.sum(Game.creeps, (c) => c.memory.role == 'harvester') > 2 || spawn.memory.staticMining == true && _.sum(Game.creeps, (c) => c.memory.role == 'staticHarvesters') == spawn.memory.needs.staticHarvesters) {
                //initiation for staticHarvesting
                if (spawn.memory.needs.staticHarvesters == undefined) {
                    spawn.memory.needs.staticHarvesters++
                } else {
                    //calculation for source satisfaction
                    spawn.memory.staticMining = true
                    var totalSatisfaction = 0
                    var sources = spawn.room.find(FIND_SOURCES)
                    for (const i in sources) {
                        totalSatisfaction += satisfactionCalculator.total(sources[i])
                    }
                    if (totalSatisfaction > 0) {
                        spawn.memory.needs.staticHarvesters += 1
                    }
                }
            }
            //start of hauler calculations
            var droppedEnergy = spawn.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            })
            var totalDropped = 0
            for(const i in droppedEnergy) {
                totalDropped += droppedEnergy[i].amount
            }
            
            //using total dropped energy in the room to estimate when a new hauler needs creating.
            if(totalDropped > 50 && _.sum(Game.creeps, (c) => c.memory.role == 'hauler') >= needs.haulers) {
                if (needs.haulers < needs.staticHarvesters) {
                    spawn.memory.needs.haulers = spawn.memory.needs.haulers + 1
                } else {
                    if (spawn.room.find(FIND_MY_CONSTRUCTION_SITES).filter((site) => site.type = STRUCTURE_EXTENSION) == 0) {
                        buildClosest.run(spawn.room.roomName, STRUCTURE_EXTENSION, spawn.pos)
                    }
                }
            }
            if(totalDropped > 1000 && spawn.room.find(FIND_MY_CONSTRUCTION_SITES).filter((site) => site.type = STRUCTURE_CONTAINER) == 0) {
                buildClosest.run(spawn.room.roomName, STRUCTURE_CONTAINER, spawn.pos)
            }
        }
    }
};