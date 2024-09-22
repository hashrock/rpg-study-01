<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGameEngine } from "./useGameEngine";
import LogPane from "./components/LogPane.vue";
import introImage from "./assets/event/intro.png";
import Button from "./components/Button.vue";

const imageSrc = ref(introImage);

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
  <div class="w-[600px] h-[800px] bg-white rounded-xl p-4 flex flex-col">
    <!-- <div class="text-red-500">
      {{ count }}
    </div> -->
    <div class="w-[600px] h-[600px] flex items-center">
      <img :src="imageSrc" alt="image" class="w-full object-contain" />
    </div>
    <div class="flex flex-col">
      <div class="flex gap-4">
        <img
          src="./assets/chr/face.png"
          alt="chara"
          class="w-[160px] h-[160px]"
        />
        <LogPane
          class="flex-1 h-[130px] bg-gray-100 p-4 rounded-lg"
          :logs="logs"
        />
      </div>
      <div class="h-16 p-2 flex items-center">
        <div v-if="mode === 'normal' && done">
          <Button @click="onClickStart">ゲームを始める</Button>
        </div>
        <div v-if="mode === 'waitKey'">
          <Button @click="isButtonPressed = true">OK</Button>
        </div>
      </div>
    </div>
    <!-- <div>{{ mode }} {{ isButtonPressed }}</div> -->
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
