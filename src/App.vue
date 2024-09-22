<script setup lang="ts">
import { ref, onMounted } from "vue";

const waitTime = ref(0);

import { useRafFn } from "@vueuse/core";

const count = ref(0);
const logs = ref<string[]>([]);
type Mode = "wait" | "normal";
const mode = ref<Mode>("normal");
const iter = ref<Generator<string, void, unknown>>();

onMounted(() => {
  iter.value = inn();
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
          mode.value = r.value;
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

function* inn() {
  yield* wait(10);
  addLog("1s passed");
  yield* wait(10);
  addLog("2s passed");
  yield* wait(10);
  addLog("3s passed");
}
</script>

<template>
  <div>
    {{ count }}
  </div>
  <div>
    {{ logs }}
  </div>
</template>

<style scoped></style>
