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