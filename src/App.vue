<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGameEngine } from "./useGameEngine";
import LogPane from "./components/LogPane.vue";

const { count, logs, addLog, iter, wait, waitKey, isButtonPressed, mode } =
  useGameEngine();

function* inn() {
  yield* wait(10);
  addLog("1s passed");
  yield* waitKey();
  addLog("2s passed");
  yield* wait(10);
  addLog("3s passed");
}

function onClickStart() {
  count.value = 0;
  iter.value = inn();
}
</script>

<template>
  <div class="w-[600px] h-[600px] bg-white">
    <div class="text-red-500">
      {{ count }}
    </div>
    <LogPane class="h-[200px] bg-gray-100" :logs="logs" />

    <div>{{ mode }} {{ isButtonPressed }}</div>
    <div>
      <button @click="onClickStart">ゲームを始める</button>
      <button @click="isButtonPressed = true">OK</button>
    </div>
  </div>
</template>

<style>
body,
html {
  height: 100%;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
}
</style>
