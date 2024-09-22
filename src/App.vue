<script setup lang="ts">
import { ref } from "vue";

const waitTime = ref(0);

import { useRafFn } from "@vueuse/core";

const count = ref(0);

const { pause, resume } = useRafFn(() => {
  count.value++;
  console.log(count.value);
});
</script>

<template>
  <div>
    {{ count }}
  </div>
</template>

<style scoped></style>
