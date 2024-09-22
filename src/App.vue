<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGameEngine } from "./useGameEngine";
import LogPane from "./components/LogPane.vue";
import introImage from "./assets/event/intro.png";
import Button from "./components/Button.vue";
import { onClickOutside } from "@vueuse/core";
import { PropmtItem } from "./types";

const imageSrc = ref(introImage);
const commandEl = ref<HTMLElement | null>(null);

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
  prompt,
  promptItems,
  selectedPromptItem,
} = useGameEngine();

function* storyIntro() {
  addLog(
    "ある森の中に、きつねのコンとおばあさんが二人で静かに暮らしておりました。"
  );
  yield* waitKey();
  addLog("おばあちゃん「ちょっと体の調子が悪くてねえ」");
  yield* waitKey();
  addLog("コン「おばあちゃん…。大丈夫？」");
  yield* waitKey();
  addLog("おばあちゃん「本当に、体の調子が悪いんだよ」");
  yield* waitKey();
  addLog("コン「おばあちゃん…」");
  yield* waitKey();
  addLog(
    "コン「してほしいことがあるなら、はっきり言ってもらわないと。それじゃ子どもと一緒だよ」"
  );
  yield* waitKey();
  addLog("おばあちゃん「冷たいねえ。現代っ子は」");
  yield* waitKey();
  addLog(
    "おばあちゃん「それじゃ単刀直入に言うけれど、裏山に行って薬草を採ってきてくれないかい」"
  );
  const okng = yield* prompt([
    { label: "いいよ", value: "y" },
    { label: "やだ", value: "n" },
  ]);
  if (okng === "y") {
    addLog("コン「わかったよ。行ってくる」");
  } else {
    addLog("コン「嫌です」");
    yield* wait(20);
    addLog("おばあちゃん「ヒエ〜」");
    yield* wait(50);
    addLog("GAME OVER");
  }
}

function onClickStart() {
  count.value = 0;
  iter.value = storyIntro();
}

onClickOutside(commandEl, (event) => {
  if (mode.value === "waitKey") {
    isButtonPressed.value = true;
  }
});

function onClickPrompt(item: PropmtItem) {
  selectedPromptItem.value = item;
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
          :isWaiting="mode === 'waitKey'"
        />
      </div>
      <div class="h-16 p-2 flex items-center" ref="commandEl">
        <div v-if="mode === 'normal' && done">
          <Button @click="onClickStart">ゲームを始める</Button>
        </div>
        <div v-if="mode === 'waitKey'">
          <Button @click="isButtonPressed = true">OK</Button>
        </div>
        <div v-if="mode === 'prompt'">
          <Button
            v-for="item in promptItems"
            :key="item.value"
            @click="onClickPrompt(item)"
            class="mr-2"
          >
            {{ item.label }}
          </Button>
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
