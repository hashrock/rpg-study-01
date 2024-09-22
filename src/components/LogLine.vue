<script lang="ts" setup>
import { computed } from "vue";
import { LogItem } from "../types";

const props = defineProps<{
  log: LogItem;
  isWaiting: boolean;
}>();

const isMyMessage = computed(() => props.log.message.startsWith("コン"));
const isGameOver = computed(() => props.log.message === "GAME OVER");
</script>

<template>
  <div :class="{ 'text-orange-800': isMyMessage, 'text-4xl': isGameOver }">
    {{ log.message }}

    <span v-if="isWaiting" class="animate-ping text-xs">▽</span>
  </div>
</template>
