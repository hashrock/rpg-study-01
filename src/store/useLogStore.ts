import { defineStore } from "pinia";
import { ref } from "vue";
import { LogItem } from "../types";

export const useLogStore = defineStore("log", () => {
  const logs = ref<LogItem[]>([]);

  function addLine(message: string) {
    logs.value.push({ ts: Date.now(), message });
  }

  function clear() {
    logs.value = [];
  }

  return {
    logs,
    addLine,
    clear,
  };
});
