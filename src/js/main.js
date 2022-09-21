import { redRepository, yellowRepository, greenRepository, blueRepository } from "./repository/theaterRepository.js"
import { checkIfSeatInObject, seatsAreNeighbours, inputsAreValid } from "./helperMethods.js"
import { drawSeatElementsOnUI } from "./UserInterface.js";

var SEATS_LIMIT = 0;
document.getElementById("reloadBtn").addEventListener('click', () => window.location.reload());

//Összeszámoljuk, hogy repositorynként hány darab férőhely van (szinenként)
function getSeatsCountFromRepository(repository) {
    let seatsCount = 0;
    Object.keys(repository).map(zone => {
        repository[zone].map(row => {
            seatsCount += row.length;
        })
    })

    return Promise.resolve(seatsCount);
}

//Előkészítjük a férőhelyeket a véletlenszerű lefoglalásra.
async function setupSeats(reservedSeatsCount, neededSeatsCount) {
    //Összeszámoljuk, hogy összesen hány férőhely van.
    let redSeatsCount = getSeatsCountFromRepository(redRepository);
    let yellowSeatsCount = getSeatsCountFromRepository(yellowRepository);
    let blueSeatsCount = getSeatsCountFromRepository(blueRepository);
    let greenSeatsCount = getSeatsCountFromRepository(greenRepository);
    SEATS_LIMIT = await redSeatsCount + await blueSeatsCount + await greenSeatsCount + await yellowSeatsCount;

    //véletlenszerű lefoglalás, ha az inputok megfelelőek
    if(inputsAreValid(reservedSeatsCount, neededSeatsCount, SEATS_LIMIT)) {
        while(reservedSeatsCount !== 0) {
            reservedSeatsCount = reserveSeats(redRepository, reservedSeatsCount);
            reservedSeatsCount = reserveSeats(yellowRepository, reservedSeatsCount);
            reservedSeatsCount = reserveSeats(blueRepository, reservedSeatsCount)
            reservedSeatsCount = reserveSeats(greenRepository, reservedSeatsCount);
        }

        return Promise.resolve({successfulSetup: true})
    } else {
        return Promise.reject({errorMsg: "Az inputok nem megfelelőek!" });
    }
    
}

//véletlenszerú lefoglalás
function reserveSeats(repository, seatsCount) {
    Object.keys(repository).map(zone => {
        repository[zone].map(row => {
            row.forEach(seat => {
                if(seatsCount > 0 && Math.random() > 0.8 && !seat.reserved) {
                    seat.reserved = true;
                    seatsCount--;
                }
            })
        });
    })
    console.log(repository);

    return seatsCount;
}

//Összegyűjtjük a férőhelyeket szinenként.
function collectAvailableSeats(repository, neededSeatsCount, color) {
    drawSeatElementsOnUI(repository, color);
    let availableSeats = null;
    Object.keys(repository).forEach(zone => {
        repository[zone].forEach((row, rownum) => {
            let groupSeatsInRow = {group1 : []};
            let groupId = 1;
            for(let i=0; i<row.length-1; i++) {
                if(seatsAreNeighbours(row[i],row[i+1])) {
                    checkIfSeatInObject(groupSeatsInRow,groupId,row[i]) ? true /* do nothing */ : groupSeatsInRow[`group${groupId}`].push(row[i]) ;
                    checkIfSeatInObject(groupSeatsInRow,groupId,row[i+1]) ? true /* do nothing */ : groupSeatsInRow[`group${groupId}`].push(row[i+1]);
                } else {
                    if(groupSeatsInRow[`group${groupId}`].length > 0) {
                        groupId++;
                        groupSeatsInRow[`group${groupId}`] = [];
                    }
                }
            }
            if(!availableSeats) {
                availableSeats = findSeats(groupSeatsInRow, neededSeatsCount, zone, color, rownum, row.length);
            }
        })
    })
    return availableSeats;
}

//Ellenőrzöm, hogy van e olyan csoport, ahol van annyi férőhely egymás mellett, mint amennyit a felhasználó kért
//Ha igen, kigyűjtök mindent
function findSeats(groupSeatsInRow, neededSeatsCount, zonename, color, row, seatsCountInRow) {
    for(let i=1; i<=Object.keys(groupSeatsInRow).length; i++) {
        if(groupSeatsInRow[`group${i}`].length >= neededSeatsCount) {
            return { seats: groupSeatsInRow, neededSeats: neededSeatsCount, zone: zonename, color: color, row: row+1, seatsCountInRow: seatsCountInRow}
        }
    }
}

//Végig megyek a csoportokon, és amik már megfelelnek a kritériumoknak, kigyűjtöm őket
function selectBestSeats(array, neededSeatsCount) {
    console.log(array);
    let possibleSeats = [];
    Object.keys(array.seats).map(s => {
        if(array.seats[s].length >= neededSeatsCount) {
            possibleSeats.push(array.seats[s]);
        }
    })
    console.log(possibleSeats);
    
    let results = searchForMidSeats(possibleSeats, array, neededSeatsCount);

    showResults(results, array, neededSeatsCount);
}

//Felhasználói felületen megjelenítem a megoldásokat
function showResults(results, seatsArray, neededSeatsCount) {
    let text = document.getElementById("text");
    text.innerHTML = "A következő lehetséges megoldást találtam:";
    let resultsElement = document.getElementById("possible-results")
    Object.keys(results).map(result => {
        let wrapper = document.createElement("div");
        let resultElement = document.createElement("div");
        resultElement.classList = `uk-card uk-card-default uk-card-body`;
        resultElement.innerHTML = 
            `<div>Szín: ${seatsArray.color} Zóna: ${seatsArray.zone} Sor: ${seatsArray.row}</div>
            <div>Az általad kért ${neededSeatsCount} darab férőhely a ${results[result].firstReserve} - ${results[result].lastReserve} között elérhető legoptimálisabban.</div>`
        console.log(results, seatsArray, neededSeatsCount);
        wrapper.appendChild(resultElement);
        resultsElement.appendChild(wrapper)
    })
}

//Keresem a sorokon belül a mégoptimálisabb helyeket (lehetőség szerint középre megyek)
function searchForMidSeats(possibleSeats, seatsArray, neededSeatsCount) {
    let possibleFinalSeats = {};
    let possibleResultCount = 1;
    Object.keys(possibleSeats).map(i => {
        possibleFinalSeats[`result${possibleResultCount}`] = {};
        //Első férőhely amit megfogok
        let firstReserve = possibleSeats[i][0].number;
        //Utolsó férőhely, ameddig összefogom a férőhelyeket
        let lastReserve = possibleSeats[i][neededSeatsCount-1].number;
        //Középső férőhely az összefogott férőhelyek közül
        let midReserve = parseInt(((lastReserve+firstReserve)/2).toFixed(0));
        //Soron belüli középső férőhely
        let midSeat = seatsArray.seatsCountInRow / 2;

        //Amíg nem éri el az általam ,,megfogott" utolsó férőhelyszáma az adott csoportban lévő utolsó férőhely számát
        while(lastReserve < possibleSeats[i][possibleSeats[i].length-1].number) {
            //Ha a középső elem meghaladta az adott sorban szereplő középső férőhelyet
            if(midReserve >= midSeat) {
                break;
            }
            firstReserve++;
            midReserve++;
            lastReserve++;
        }
        //Megoldás rögzítése objektumban
        possibleFinalSeats[`result${possibleResultCount}`].firstReserve = firstReserve;
        possibleFinalSeats[`result${possibleResultCount}`].lastReserve = lastReserve;
        possibleFinalSeats[`result${possibleResultCount}`].midReserve = midReserve;

        possibleResultCount++;
    })

    return possibleFinalSeats;
}

//fő függvény, ezzel indul az alkalmazás
async function main() {
    var reservedSeatsCount = parseInt(window.prompt("Mennyi foglalt hely van?"));
    var neededSeatsCount = parseInt(window.prompt("Mennyi helyet szeretnél foglalni egymás mellé?"));
    setupSeats(reservedSeatsCount, neededSeatsCount).then(value => {
        if(value.successfulSetup) {
            const availableRedSeats = collectAvailableSeats(redRepository, neededSeatsCount, 'red')
            const availableYellowSeats = collectAvailableSeats(yellowRepository, neededSeatsCount, 'yellow');
            const availableBlueSeats = collectAvailableSeats(blueRepository, neededSeatsCount, 'blue');
            const availableGreenSeats = collectAvailableSeats(greenRepository, neededSeatsCount, 'green');
            if(availableRedSeats) {
                selectBestSeats(availableRedSeats, neededSeatsCount);
            } else if(availableYellowSeats) {
                selectBestSeats(availableYellowSeats, neededSeatsCount)
            } else if(availableBlueSeats) {
                selectBestSeats(availableBlueSeats, neededSeatsCount)
            } else if(availableGreenSeats) {
                selectBestSeats(availableGreenSeats, neededSeatsCount);
            } else {
                alert("Sajnos nem találtunk számodra helyet.")
            }
        }
    }).catch(error => {
        alert(error.errorMsg)
        return;
    });
}

main();