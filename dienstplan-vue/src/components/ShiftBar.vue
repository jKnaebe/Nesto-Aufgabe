<template>
  <div class="shift-bar" :style="barStyle">
    {{ shift.employee }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ShiftTime {
  employee: string;
  beginning: string;
  ending: string;
}

const props = defineProps<{ shift: ShiftTime; color?: string }>();

const parseTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
};

const barStyle = computed(() => {
  const start = parseTime(props.shift.beginning);
  const end = parseTime(props.shift.ending);
  const widthPercent = ((end - start) / 24) * 100;
  const leftPercent = (start / 24) * 100;

  return {
    position: "absolute",
    top: "0",
    height: "100%",
    backgroundColor: props.color || "#4CAF50",
    color: "#fff",
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "0.8rem",
    left: `${leftPercent}%`,
    width: `${widthPercent}%`,
    padding: "0 2px",
    boxSizing: "border-box",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };
});
</script>

<style scoped>
.shift-bar {
  box-sizing: border-box;
}
</style>
