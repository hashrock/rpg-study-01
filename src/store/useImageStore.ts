import { defineStore } from "pinia";
import { computed, ref } from "vue";
import titleImage from "../assets/event/title.jpg";
import introImage from "../assets/event/intro.png";
import roadImage from "../assets/bg/road.png";

const srcMap = {
  title: titleImage,
  intro: introImage,
  road: roadImage,
};

type ImageSrc = keyof typeof srcMap;

export const useImageStore = defineStore("image", () => {
  const imageSrc = ref<ImageSrc>("title");

  const setImageSrc = (src: ImageSrc) => {
    imageSrc.value = src;
  };

  const imageData = computed(() => {
    return srcMap[imageSrc.value];
  });

  return {
    imageSrc,
    setImageSrc,
    imageData,
  };
});
