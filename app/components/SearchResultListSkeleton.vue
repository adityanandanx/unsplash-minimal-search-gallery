<script setup lang="ts">
// choose random heights for skeleton items
const heights = [32, 40, 48, 56, 64, 72, 30, 20, 30, 50, 30, 20].map(
  (h) => `${h}vh`
);
</script>

<template>
  <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 px-4">
    <Transition name="fade" appear v-for="(n, i) in heights.length" :key="n">
      <div
        :style="{ height: heights[n], transitionDelay: `${i * 25}ms` }"
        class="bg-gray-300 dark:bg-gray-700 rounded-md overflow-hidden animate-pulse"
      ></div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease, transform 300ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
