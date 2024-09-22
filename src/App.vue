<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGameEngine } from "./useGameEngine";
import LogPane from "./components/LogPane.vue";

const {
  count,
  logs,
  addLog,
  iter,
  wait,
  waitKey,
  isButtonPressed,
  mode,
  done,
} = useGameEngine();

function* storyIntro() {
  yield* wait(10);
  addLog("1s passed");
  yield* waitKey();
  addLog("2s passed");
  yield* wait(10);
  addLog("3s passed");
}

function onClickStart() {
  count.value = 0;
  iter.value = storyIntro();
}
</script>

<template>
  <div class="w-[600px] h-[800px] bg-white rounded-xl p-4">
    <!-- <div class="text-red-500">
      {{ count }}
    </div> -->
    <LogPane class="h-[200px] bg-gray-100" :logs="logs" />

    <!-- <div>{{ mode }} {{ isButtonPressed }}</div> -->
    <div v-if="mode === 'normal' && done">
      <button @click="onClickStart">ゲームを始める</button>
    </div>
    <div v-if="mode === 'waitKey'">
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
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3283d4;
}
</style>
