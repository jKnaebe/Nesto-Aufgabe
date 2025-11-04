<template>
  <div>
    <h1>{{ headquarter.name }}</h1>

    <label for="store-select">Wähle einen Store:</label>
    <select id="store-select" v-model="selectedStoreName">
      <option v-for="store in allStores" :key="store.name" :value="store.name">
        {{ store.name }}
      </option>
    </select>

    <div v-if="selectedStore">
      <ShiftTimeline :store="selectedStore" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ShiftTimeline from "./components/ShiftTimeline.vue";
import data from "./data/organization.json";

interface ShiftTime {
  beginning: string;
  ending: string;
}

interface Store {
  name: string;
  employees: string[];
  shifts: Record<string, ShiftTime[]>;
}

interface Area {
  name: string;
  manager: string;
  areas: Area[];
  stores: Store[];
}

interface Headquarter {
  name: string;
  areas: Area[];
  stores: Store[];
}

const headquarter: Headquarter = data.headquarter;

// Rekursiv alle Stores aus allen Areas sammeln
const getAllStores = (areas: Area[]): Store[] => {
  let result: Store[] = [];
  areas.forEach((area) => {
    result = result.concat(area.stores);
    if (area.areas.length) {
      result = result.concat(getAllStores(area.areas));
    }
  });
  return result;
};

const allStores = getAllStores(headquarter.areas);

// Ausgewählter Store
const selectedStoreName = ref(allStores[0]?.name || "");
const selectedStore = computed(() =>
  allStores.find((s) => s.name === selectedStoreName.value)
);
</script>
