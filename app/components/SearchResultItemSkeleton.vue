<script setup lang="ts">
const props = defineProps<{
  width?: number | string;
  height?: number | string;
}>();
</script>

<template>
  <div
    class="bg-muted rounded-md overflow-hidden animate-pulse"
    :style="{ width: width, height: height }"
  ></div>
</template>
