export class Seat {
    number
    reserved
    
    /**
     * 
     * @param {int} number - szék száma egy adott sorban.
     * @param {boolean} reserved - adott szék levan -e foglalva avagy nem
     */

    constructor(number, reserved = false) {
        this.number = number,
        this.reserved = reserved
    }
}