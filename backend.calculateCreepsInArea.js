module.exports = {
    sourceIsFree: function(source) {
        var sourcePos = source.pos
        if(source.room.lookAtArea(sourcePos.y-1, sourcePos.x-1, sourcePos.y+1, sourcePos.x+1, true).filter((thing) => thing.type == 'creep').map(obj => obj.creep).filter((creep) => creep.memory.target != undefined).length > 0) {
            return false
        } else {
            return true
        }
    }
}