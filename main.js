var spawnHandler = require('backend.handleSpawns')
var creepHandler = require('backend.handleCreeps')
var handleRoom = require('backend.handleRoomSetup')


for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }


for (const i in Game.creeps) {
    var creep = Game.creeps[i]
    creepHandler.run(creep)
}

for (const i in Game.spawns) {
    spawnHandler.run(Game.spawns[i])
    handleRoom.run(Game.spawns[i].room)
    if(Game.time % 20 == 0) {
        handleRoom.run(Game.spawns[i].room)
    }
}

