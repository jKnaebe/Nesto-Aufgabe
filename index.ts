/* Erstellen der Objekte */

interface Shift {
    beginning: string
    ending: string
}

interface Store {
    name: string
    employees: string[]
    shifts: Record<string, Shift[]>
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
                            {
                                name: "Karlsruhe", 
                                employees: ["Daisy", "Daniel"], 
                                shifts:{ 
                                    "Daisy": [
                                        {beginning: "12:00", ending: "20:00"}
                                    ],
                                    "Daniel": [
                                        {beginning: "11:00", ending: "13:00"},
                                        {beginning: "15:00", ending: "21:00"}
                                    ]
                                }
                            },
                            {
                                name: "Stuttgart",
                                employees: ["Emil"],
                                shifts: {
                                    "Emil": [
                                        {beginning: "13:00", ending: "23:00"}
                                    ]
                                }
                            },
                            {
                                name: "München",
                                employees: ["Fred"],
                                shifts: {
                                    "Fred": [
                                        {beginning: "12:00", ending: "18:00"}
                                    ]
                                }
                            }
                    ]
                }
            ],
            stores: [
                {
                    name: "Hamburg",
                    employees: ["Claus", "Claire"],
                    shifts: {
                        "Claus": [
                            {beginning: "08:00", ending: "17:00"}
                        ],
                        "Claire": [
                            {beginning: "10:00", ending: "14:00"}
                        ]
                    }
                }
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