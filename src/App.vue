<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGameEngine } from "./useGameEngine";

const { count, logs, addLog, iter, wait } = useGameEngine();

onMounted(() => {
  iter.value = inn();
});
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
