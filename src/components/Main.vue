<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import LogPane from "./LogPane.vue";

import Button from "./Button.vue";
import { onClickOutside } from "@vueuse/core";
import { PromptItem } from "../types";
import { useLogStore } from "../store/useLogStore";
import { useImageStore } from "../store/useImageStore";
import { storyIntro } from "./story";
import { useModeStore } from "../store/useModeStore";
import { useGameEngine } from "../useGameEngine";

const logStore = useLogStore();
const imageStore = useImageStore();
const modeStore = useModeStore();
const commandEl = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d');
    drawImage();
  }
});

function drawImage() {
  if (ctx.value) {
    const img = new Image();
    img.onload = () => {
      ctx.value!.drawImage(img, 0, 0, 600, 550);
    };
    img.src = imageStore.imageData;
  }
}

watch(() => imageStore.imageData, drawImage);

function onClickStart() {
  modeStore.count = 0;
  modeStore.iter = storyIntro();
}

onClickOutside(commandEl, (_event) => {
  if (modeStore.mode === "waitKey") {
    modeStore.isButtonPressed = true;
  }
});

function onClickPrompt(item: PromptItem) {
  modeStore.selectedPromptItem = item;
}

useGameEngine();
</script>

<template>
  <div
    class="w-[600px] h-[800px] bg-white rounded-xl p-4 flex flex-col select-none"
  >
    <div class="w-[600px] h-[550px] flex items-center overflow-clip">
      <canvas
        ref="canvasRef"
        width="600"
        height="550"
        class="w-full object-contain pointer-events-none"
      ></canvas>
    </div>
    <div class="flex flex-col">
      <div class="flex gap-4">
        <img
          src="../assets/chr/face.png"
          alt="chara"
          class="w-[160px] h-[160px]"
        />
        <LogPane
          class="flex-1 h-[130px] bg-orange-50 p-4 rounded-lg"
          :logs="logStore.logs"
          :isWaiting="modeStore.mode === 'waitKey'"
        />
      </div>
      <div class="h-16 p-2 flex items-center" ref="commandEl">
        <div v-if="modeStore.mode === 'normal' && modeStore.done">
          <Button @click="onClickStart">ゲームを始める</Button>
        </div>
        <div v-if="modeStore.mode === 'waitKey'">
          <Button @click="modeStore.isButtonPressed = true">OK</Button>
        </div>
        <div v-if="modeStore.mode === 'prompt'">
          <Button
            v-for="item in modeStore.promptItems"
            :key="item.value"
            @click="onClickPrompt(item)"
            class="mr-2"
            :buttonStyle="item.style"
          >
            {{ item.label }}
          </Button>
        </div>
      </div>
    </div>
    <!-- <div>{{ mode }} {{ isButtonPressed }}</div> -->
  </div>
</template>
