<script lang="ts" setup>
defineProps<{
  onClick: () => void;
}>();
</script>
<template>
  <button class="p-2 rounded-lg text-xl" @click="onClick"><slot /></button>
</template>
