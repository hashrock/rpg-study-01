import { defineStore } from "pinia";
import { ref } from "vue";
import { Mode, PromptItem } from "../types";

export const useModeStore = defineStore("mode", () => {
  const count = ref(0);
  const waitTime = ref(0);

  const mode = ref<Mode>("normal");
  const iter = ref<Generator<string, void, unknown>>();
  const isButtonPressed = ref(false);
  const done = ref(true);
  const promptItems = ref<PromptItem[]>([]);
  const selectedPromptItem = ref<PromptItem | null>(null);
  const fieldPosition = ref(0);

  return {
    mode,
    iter,
    isButtonPressed,
    done,
    promptItems,
    selectedPromptItem,
    count,
    waitTime,
    fieldPosition,
  };
});
