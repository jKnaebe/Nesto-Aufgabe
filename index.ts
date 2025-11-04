interface Store {
    name: string
    mitarbeiter: string[]
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