<template>
  <div>
    <label for="area-select">Wähle eine Area:</label>
    <select id="area-select" v-model="selectedName">
      <option v-for="area in areas" :key="area.name" :value="area.name">
        {{ area.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Area {
  name: string;
  manager: string;
  stores: any[];
  areas: Area[];
}

const props = defineProps<{
  areas: Area[];
  modelValue: Area | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Area | null): void;
}>();

// Hilfsvariable: speichert nur den Namen
const selectedName = ref(props.modelValue?.name || props.areas[0]?.name);

// Watcher: wandelt den Namen zurück in das Area-Objekt
watch(selectedName, (newName) => {
  const area = props.areas.find((a) => a.name === newName) || null;
  emit("update:modelValue", area);
});
</script>
