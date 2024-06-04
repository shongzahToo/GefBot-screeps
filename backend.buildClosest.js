module.exports = {
    run: function(room, buildingType, pos) {
        function position(n) {
            const k = Math.ceil((Math.sqrt(n) - 1) / 2);
            let t = 2 * k + 1;
            let m = Math.pow(t, 2);
        
            t -= 1;
        
            if (n >= m - t) {
                return [k - (m - n), -k];
            }
        
            m -= t;
        
            if (n >= m - t) {
                return [-k, -k + (m - n)];
            }
        
            m -= t;
        
            if (n >= m - t) {
                return [-k + (m - n), k];
            }
        
            return [k, k - (m - n - t)];
        }

        var counter = 0
        do {
            var spot = position(counter)
            console.log(pos.x + spot[0], pos.y + spot[1], room.name)
            spot = new RoomPosition(pos.x + spot[0], pos.y + spot[1], room.name)
            var err = room.createConstructionSite(spot, buildingType)
        } while(err == ERR_INVALID_TARGET)
    }
}