import { onMounted, ref } from "vue";

export const useGameEngine = () => {
  const count = ref(0);
  const logs = ref<string[]>([]);
  const waitTime = ref(0);
  type Mode = "wait" | "normal";
  const mode = ref<Mode>("normal");
  const iter = ref<Generator<string, void, unknown>>();
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

  function addLog(str: string) {
    logs.value.push(str);
  }

  return { count, logs, addLog, iter, wait };
};
