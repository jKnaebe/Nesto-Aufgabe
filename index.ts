/* Erstellen der Objekte */

interface Store {
    name: string
    employees: string[]
}

interface Area {
    name: string
    manager: string
    areas: Area[]
    stores: Store[]
}

interface Headquarter {
    name: string
    areas: Area[]
    stores: Store[]
}

interface Shift {
    beginning: number
    ending: number
}

/* Erstellen der Baumstruktur */

const bestFoodCompany: Headquarter = {
    name: "BestFood Company",
    areas: [
        {
            name: "Deutschland",
            manager: "Alice",
            areas: [
                {
                    name: "Süd",
                    manager: "Bob",
                    areas: [],
                    stores: [
                            {name: "Karlsruhe", employees: ["Daisy", "Daniel"]},
                            {name: "Stuttgart", employees: ["Emil"]},
                            {name: "München", employees: ["Fred"]}
                    ]
                }
            ],
            stores: [
                {name: "Hamburg", employees: ["Claus", "Claire"]}
            ]
        }
    ],
    stores: []
}

/* Erstellen der Funktionen*/

const getAllStores = (hq: Headquarter): string[] => {
  const result: string[] = []

  const traverseArea = (area: Area): void => {
    area.stores.forEach(store => result.push(store.name))       //Durchsuchen von Stores in einer Area
    area.areas.forEach(subArea => traverseArea(subArea))        //Durchsuchen ob innerhalb einer Area eine Subarea enthält
  }

  hq.areas.forEach(area => traverseArea(area))                  //Durchsuchen von Areas innerhalb des HQ

  return result
}

const getAllEmployees = (hq: Headquarter): string[] => {
  const result: string[] = []

  const traverseArea = (area: Area): void => {
    area.stores.forEach(store => result.push(...store.employees))
    area.areas.forEach(subArea => traverseArea(subArea))
  }

  hq.areas.forEach(area => traverseArea(area))

  return result
}

/* Ausgaben */
console.log("Stores of BestFood Company:")
getAllStores(bestFoodCompany).forEach(store => console.log(`* ${store}`))

console.log("\nEmployees of BestFood Company:")
getAllEmployees(bestFoodCompany).forEach(employee => console.log(`* ${employee}`))