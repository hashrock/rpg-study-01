import { useImageStore } from "../store/useImageStore";
import { useLogStore } from "../store/useLogStore";
import { useModeStore } from "../store/useModeStore";
import { PromptItem } from "../types";

function randomBool(threshold: number) {
  return Math.random() < threshold;
}

function randomInt(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

let fieldLength = 100;

function addLog(message: string) {
  const logStore = useLogStore();
  logStore.addLine(message);
}

function* wait(time: number) {
  const modeStore = useModeStore();
  modeStore.waitTime = time;
  yield "wait";
}

function* waitKey() {
  yield "waitKey";
}

function* prompt(items: PromptItem[]) {
  const modeStore = useModeStore();
  modeStore.selectedPromptItem = null;
  modeStore.promptItems = [];
  for (const item of items) {
    modeStore.promptItems.push(item);
  }
  yield "prompt";
  // @ts-ignores yield後には値が入っている
  return modeStore.selectedPromptItem.value;
}

export function* storyIntro() {
  const logStore = useLogStore();
  const imageStore = useImageStore();
  const modeStore = useModeStore();
  imageStore.setImageSrc("intro");

  logStore.clear();

  addLog(
    "ある森の中に、きつねのコンとおばあさんが二人で静かに暮らしておりました。",
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
    "コン「してほしいことがあるなら、はっきり言ってもらわないと。甘えだよそれは」",
  );
  yield* waitKey();
  addLog("おばあちゃん「冷たいねえ。現代っ子は」");
  yield* waitKey();
  addLog(
    "おばあちゃん「それじゃ単刀直入に言うけれど、裏山に行って薬草を採ってきてくれないかい」",
  );
  const okng = yield* prompt([
    { label: "いいよ", value: "y" },
    { label: "やだ", value: "n" },
  ]);
  console.log(okng);

  if (okng === "y") {
    addLog("コン「いいよ」");
    yield* waitKey();
    addLog("おばあちゃん「ありがとう、気を付けて行ってきてね」");
    yield* waitKey();
    modeStore.iter = storyMountain();
  } else {
    addLog("コン「嫌です」");
    yield* wait(20);
    addLog("おばあちゃん「ええ〜」");
    yield* wait(50);
    addLog("GAME OVER");

    const retry = yield* prompt([{ label: "リトライ", value: "retry" }]);
    if (retry === "retry") {
      modeStore.iter = storyIntro();
    }
  }
}

export function* storyMountain() {
  const imageStore = useImageStore();
  const modeStore = useModeStore();
  imageStore.setImageSrc("road");

  addLog("コン「裏山に到着した」");
  yield* waitKey();
  addLog("コン「薬草を探すか」");

  while (true) {
    const okng = yield* prompt([
      { label: "登る", value: "next" },
      { label: "戻る", value: "prev" },
    ]);

    if (okng === "next") {
      modeStore.fieldPosition += 1;
      addLog("コンは山道を進んだ");
      yield* wait(10);

      addLog("コン「ふう、ふう」");
      if (randomBool(0.3)) {
        addLog("コン「茂みになにかありそう」");
        const selection = yield* prompt([
          { label: "探す", value: "search", style: "primary" },
          { label: "通り過ぎる", value: "pass", style: "secondary" },
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

      if (modeStore.fieldPosition >= fieldLength) {
        addLog("コン「薬草を見つけた」");
        yield* waitKey();
        break;
      }
    } else {
      modeStore.fieldPosition -= 1;
      if (modeStore.fieldPosition <= 0) {
        addLog("コン「裏山を下りた」");
        yield* waitKey();
        break;
      }
    }
  }
}
