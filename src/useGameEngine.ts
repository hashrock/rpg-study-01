import { onMounted, ref, watch } from "vue";
import type { Mode, PromptItem as PromptItem } from "./types";

export const useGameEngine = () => {
  const count = ref(0);
  const waitTime = ref(0);

  const mode = ref<Mode>("normal");
  const iter = ref<Generator<string, void, unknown>>();
  const isButtonPressed = ref(false);
  const done = ref(true);
  const promptItems = ref<PromptItem[]>([]);
  const selectedPromptItem = ref<PromptItem | null>(null);

  onMounted(() => {
    requestAnimationFrame(update);
  });

  watch(iter, (newIter) => {
    if (newIter) {
      done.value = false;
    }
  });

  function update() {
    count.value++;

    switch (mode.value) {
      case "wait":
        waitTime.value--;
        if (waitTime.value <= 0) {
          mode.value = "normal";
        }
        break;

      case "waitKey":
        if (isButtonPressed.value) {
          mode.value = "normal";
          isButtonPressed.value = false;
        }
        break;

      case "prompt":
        if (selectedPromptItem.value) {
          mode.value = "normal";
        }

        break;

      default:
        if (iter.value) {
          const r = iter.value.next();
          if (r.value) {
            mode.value = r.value as Mode;
          }
          if (r.done) {
            done.value = true;
          }
        }
        break;
    }

    requestAnimationFrame(update);
  }
  function* wait(time: number) {
    waitTime.value = time;
    yield "wait";
  }

  function* waitKey() {
    yield "waitKey";
  }

  function* prompt(items: PromptItem[]) {
    selectedPromptItem.value = null;
    promptItems.value = [];
    for (const item of items) {
      promptItems.value.push(item);
    }
    yield "prompt";
    // @ts-ignores yield後には値が入っている
    return selectedPromptItem.value?.value;
  }

  return {
    count,
    iter,
    wait,
    mode,
    isButtonPressed,
    waitKey,
    done,
    prompt,
    promptItems,
    selectedPromptItem,
  };
};
