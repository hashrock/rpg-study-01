<script lang="ts" setup>
defineProps<{
  onClick: () => void;
}>();
</script>
<template>
  <button
    class="p-2 rounded-lg text-xl border-solid border-3 border-amber-700 bg-amber-600 min-w-32 color-white hover:bg-amber-700 active:bg-amber-800 transition-colors"
    @click="onClick"
  >
    <slot />
  </button>
</template>
