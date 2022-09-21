// Ellenőrzi, hogy egy adott szék benne van e már a sorokban kialakított csoportokban 
// (hiszen ugye minden székhez csak 1 szám tartozhat, ami a number property, így minden szép egyszer szerepelhet egy csoportban

export function checkIfSeatInObject(rowGroupArray, groupId, seat) {
    return rowGroupArray[`group${groupId}`].includes(seat)
}

// Ellenőrzi, hogy egy két szék szomszédos -e és hogy szabad -e
export function seatsAreNeighbours(seat1, seat2) {
    return Math.abs(seat2.number - seat1.number) === 1 && !seat1.reserved && !seat2.reserved;
}

//Beviteli mezők ellenőrzése a szabályoknak megfelelően
export function inputsAreValid(reservedSeats, neededSeats, seatsLimit) {
    return reservedSeats > seatsLimit * 0.2 && reservedSeats <= seatsLimit && neededSeats >= 2 && neededSeats <= 8
}