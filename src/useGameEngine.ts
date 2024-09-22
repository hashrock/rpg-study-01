import { onMounted, ref } from "vue";
import type { LogItem, Mode } from "./types";

export const useGameEngine = () => {
  const count = ref(0);
  const logs = ref<LogItem[]>([]);
  const waitTime = ref(0);

  const mode = ref<Mode>("normal");
  const iter = ref<Generator<string, void, unknown>>();
  const isButtonPressed = ref(false);

  onMounted(() => {
    requestAnimationFrame(update);
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

      default:
        if (iter.value) {
          const r = iter.value.next();
          if (r.value) {
            mode.value = r.value as Mode;
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

  function addLog(str: string) {
    logs.value.push({
      ts: Date.now(),
      message: str,
    });
  }

  return { count, logs, addLog, iter, wait, mode, isButtonPressed, waitKey };
};
