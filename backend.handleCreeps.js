var builder = require('role.builder')
var harvester = require('role.harvester')
var hauler = require('role.hauler')
var repairer = require('role.repairer')
var staticHarvester = require('role.staticHarvest')
var upgrader = require('role.upgrader')



module.exports = {
    run: function(creep) {
        var role = creep.memory.role
        switch(role) {
            case 'builder': 
                builder.run(creep);
                break;
            case 'harvester': 
                harvester.run(creep);
                break;
            case 'hauler': 
                hauler.run(creep);
                break;
            case 'repairer': 
                repairer.run(creep);
                break;
            case 'staticHarvester': 
                staticHarvester.run(creep);
                break;
            case 'upgrader': 
                upgrader.run(creep);
                break;
        }
    }
};