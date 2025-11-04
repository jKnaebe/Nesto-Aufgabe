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

const getAllStores = (hq: Headquarter): string[] => {
  const result: string[] = []

  const traverseArea = (area: Area): void => {
    area.stores.forEach(store => result.push(store.name))
    area.areas.forEach(subArea => traverseArea(subArea))
  }

  hq.areas.forEach(area => traverseArea(area))

  return result
}

// Ausgabe
console.log("Stores of BestFood Company:")
getAllStores(bestFoodCompany).forEach(store => console.log(`* ${store}`))