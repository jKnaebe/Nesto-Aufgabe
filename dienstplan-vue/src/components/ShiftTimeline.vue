<template>
  <div class="store">
    <h2>{{ store.name }}</h2>

    <!-- Stundenleiste -->
    <div class="hour-line">
      <div
        v-for="h in 25"
        :key="h"
        class="hour-mark"
        :style="{ left: `${(h / 24) * 100}%` }"
      >
        {{ h % 24 }}
      </div>
    </div>

    <div class="timeline">
      <!-- Pro Mitarbeiter eine Zeile -->
      <div
        v-for="employee in store.employees"
        :key="employee"
        class="employee-row"
      >
        <div class="employee-shifts">
          <ShiftBar
            v-for="(shift, idx) in store.shifts[employee]"
            :key="employee + idx"
            :shift="{ ...shift, employee }"
            :color="employeeColors[employee]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShiftBar from "./ShiftBar.vue";
import { computed } from "vue";

interface ShiftTime {
  beginning: string;
  ending: string;
}

interface Store {
  name: string;
  employees: string[];
  shifts: Record<string, ShiftTime[]>;
}

const props = defineProps<{ store: Store }>();

// Farben für Mitarbeiter automatisch zuweisen
const colors = [
  "#4CAF50",
  "#2196F3",
  "#FF9800",
  "#9C27B0",
  "#F44336",
  "#00BCD4",
  "#FFEB3B",
  "#795548",
  "#607D8B",
];

const employeeColors = computed(() => {
  const mapping: Record<string, string> = {};
  props.store.employees.forEach((employee, index) => {
    mapping[employee] = colors[index % colors.length];
  });
  return mapping;
});
</script>

<style scoped>
.store {
  margin-bottom: 2rem;
  position: relative;
}

.hour-line {
  position: relative;
  height: 20px;
  border-bottom: 1px solid #aaa;
  margin-bottom: 0.5rem;
}

.hour-mark {
  position: absolute;
  top: 0;
  width: 0;
  text-align: center;
  font-size: 0.7rem;
  transform: translateX(-50%);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.employee-row {
  position: relative;
  height: 30px;
}

.employee-shifts {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
