import { onMounted, watch } from "vue";
import type { Mode } from "./types";
import { useModeStore } from "./store/useModeStore";

export const useGameEngine = () => {
  const modeStore = useModeStore();
  onMounted(() => {
    requestAnimationFrame(update);
  });

  watch(() => modeStore.iter, (newIter) => {
    if (newIter) {
      modeStore.done = false;
    }
  });

  function update() {
    modeStore.count++;

    switch (modeStore.mode) {
      case "wait":
        modeStore.waitTime--;
        if (modeStore.waitTime <= 0) {
          modeStore.mode = "normal";
        }
        break;

      case "waitKey":
        if (modeStore.isButtonPressed) {
          modeStore.mode = "normal";
          modeStore.isButtonPressed = false;
        }
        break;

      case "prompt":
        if (modeStore.selectedPromptItem) {
          modeStore.mode = "normal";
        }

        break;

      default:
        if (modeStore.iter) {
          const r = modeStore.iter.next();
          if (r.value) {
            modeStore.mode = r.value as Mode;
          }
          if (r.done) {
            modeStore.mode = "normal";
          }
        }
        break;
    }

    requestAnimationFrame(update);
  }
};
