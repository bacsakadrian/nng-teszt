//létrehozza a megfelelő diveket, és kialakítja az alkalmazás layoutját, hozzárendeli a seateket, és beállítja a színeket
export function drawSeatElementsOnUI(repository, color) {
    let repositoryElement = document.createElement("div");
    Object.keys(repository).map(zone => {
        let zoneElement = document.createElement("div")
        repository[zone].map((row, rownum) => {
            let rowElement = document.createElement("div");
            if(row.length > 0) {
                let infoRowElement = document.createElement("div");
                infoRowElement.innerText = `Szín: ${color} | zóna: ${zone} | sor: ${rownum+1}`
                rowElement.appendChild(infoRowElement);
            }
            for(let i=0; i<row.length; i++) {
                let seatElement = document.createElement("span");
                seatElement.classList = `uk-badge ${row[i].reserved ? 'black' : color}`;
                seatElement.innerHTML = row[i].number;

                rowElement.appendChild(seatElement);
            }
            zoneElement.appendChild(rowElement);
        })
        repositoryElement.appendChild(zoneElement);
        createUIElement(repositoryElement);
    })

}

//szinenként készítünk egy wrappert
export function createUIElement(repositoryElement) {
    let seatWrapper = document.getElementById("seatwrapper");
    seatWrapper.appendChild(repositoryElement);
}

//Felhasználói felületen megjelenítem a megoldásokat
export function showResults(results, seatsArray, neededSeatsCount) {
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