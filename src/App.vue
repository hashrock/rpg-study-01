<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGameEngine } from "./useGameEngine";
import LogPane from "./components/LogPane.vue";
import titleImage from "./assets/event/title.jpg";
import introImage from "./assets/event/intro.png";
import roadImage from "./assets/bg/road.png";

import Button from "./components/Button.vue";
import { onClickOutside } from "@vueuse/core";
import { PropmtItem } from "./types";

const imageSrc = ref(titleImage);
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
  imageSrc.value = introImage;

  logs.value = [];

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
    "コン「してほしいことがあるなら、はっきり言ってもらわないと。甘えだよそれは」"
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
    addLog("コン「いいよ」");
    yield* waitKey();
    addLog("おばあちゃん「ありがとう、気を付けて行ってきてね」");
    yield* waitKey();
    iter.value = storyMountain();
  } else {
    addLog("コン「嫌です」");
    yield* wait(20);
    addLog("おばあちゃん「ええ〜」");
    yield* wait(50);
    addLog("GAME OVER");
  }
}

let fieldLength = 100;
let fieldPosition = ref(0);

function randomBool(threshold: number) {
  return Math.random() < threshold;
}

function randomInt(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

function* storyMountain() {
  imageSrc.value = roadImage;

  addLog("コン「裏山に到着した」");
  yield* waitKey();
  addLog("コン「薬草を探すか」");

  while (true) {
    const okng = yield* prompt([
      { label: "登る", value: "next" },
      { label: "戻る", value: "prev" },
    ]);

    if (okng === "next") {
      fieldPosition.value += 1;
      addLog("コンは山道を進んだ");
      yield* wait(10);

      addLog("コン「ふう、ふう」");
      if (randomBool(0.3)) {
        addLog("コン「茂みになにかありそう」");
        const selection = yield* prompt([
          { label: "探す", value: "search" },
          { label: "通り過ぎる", value: "pass" },
        ]);
        if (selection === "search") {
          switch (randomInt(2)) {
            case 0:
              addLog("コン「ありそうで何もなかった」");
              break;
            case 1:
              addLog("コン「なんもないな〜」");
              break;
            case 2:
              addLog("かっこいい枝を見つけた");
              break;
          }
        }
      }

      if (fieldPosition.value >= fieldLength) {
        addLog("コン「薬草を見つけた」");
        yield* waitKey();
        break;
      }
    } else {
      fieldPosition.value -= 1;
      if (fieldPosition.value <= 0) {
        addLog("コン「裏山を下りた」");
        yield* waitKey();
        break;
      }
    }
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
  <div
    class="w-[600px] h-[800px] bg-white rounded-xl p-4 flex flex-col select-none"
  >
    <div class="w-[600px] h-[550px] flex items-center overflow-clip">
      <img
        :src="imageSrc"
        alt="image"
        class="w-full object-contain pointer-events-none"
      />
    </div>
    <div class="flex flex-col">
      <div class="flex gap-4">
        <img
          src="./assets/chr/face.png"
          alt="chara"
          class="w-[160px] h-[160px]"
        />
        <LogPane
          class="flex-1 h-[130px] bg-orange-50 p-4 rounded-lg"
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
