<script lang="ts" setup>
import { watch, ref, nextTick, computed } from "vue";
import type { LogItem } from "../types";
const props = defineProps<{
  logs: LogItem[];
}>();

const logEl = ref<HTMLElement | null>(null);
const limit = 20;
const limitedLogs = computed(() => props.logs.slice(-limit));

watch(
  () => props.logs.length,
  (logs) => {
    nextTick(() => {
      if (logEl.value) {
        logEl.value.scrollTop = logEl.value.scrollHeight;
      }
    });
  }
);
</script>

<template>
  <div class="overflow-y-auto" ref="logEl">
    <div v-for="{ message, ts } in limitedLogs" :key="ts">{{ message }}</div>
  </div>
</template>
