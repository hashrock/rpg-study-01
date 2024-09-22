<script lang="ts" setup>
import { PromptItemStyle } from "../types";

defineProps<{
  onClick: () => void;
  buttonStyle?: PromptItemStyle;
}>();
</script>
<template>
  <button
    class="p-2 rounded-lg text-xl border-solid border-3 min-w-32 color-white transition-colors"
    :class="{
      'border-blue-900 bg-blue-700 hover:bg-blue-800 active:bg-blue-800':
        buttonStyle === 'primary',
      'border-gray-900 bg-gray-700 hover:bg-gray-800 active:bg-gray-800':
        buttonStyle === 'secondary',
      'border-amber-700 bg-amber-600  hover:bg-amber-700 active:bg-amber-800':
        !buttonStyle,
    }"
    @click="onClick"
  >
    <slot />
  </button>
</template>
