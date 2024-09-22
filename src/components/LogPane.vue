<script lang="ts" setup>
import { watch, ref, nextTick, computed } from "vue";
import type { LogItem } from "../types";
const props = defineProps<{
  logs: LogItem[];
  isWaiting: boolean;
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
  <div class="overflow-y-hidden" ref="logEl">
    <div v-for="({ message, ts }, index) in limitedLogs" :key="ts">
      {{ message }}

      <span v-if="index === limitedLogs.length - 1">
        <span v-if="props.isWaiting" class="animate-ping text-xs">▽</span>
      </span>
    </div>
  </div>
</template>
