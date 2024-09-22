<script lang="ts" setup>
import { watch, ref, nextTick, computed } from "vue";
import type { LogItem } from "../types";
import LogLine from "./LogLine.vue";
const props = defineProps<{
  logs: LogItem[];
  isWaiting: boolean;
}>();

const logEl = ref<HTMLElement | null>(null);
const limit = 20;
const limitedLogs = computed(() => props.logs.slice(-limit));

watch(
  () => props.logs.length,
  (_logs) => {
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
    <LogLine
      v-for="(item, index) in limitedLogs"
      :key="item.ts"
      :log="item"
      :is-waiting="index === limitedLogs.length - 1 && isWaiting"
    />
  </div>
</template>
