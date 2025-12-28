<script setup lang="ts">
import { Search } from "lucide-vue-next";

// choose random heights for skeleton items
const heights = [32, 40, 48, 56, 64, 72, 30, 20, 30, 50, 30, 20].map(
  (h) => `${h}vh`
);
</script>

<template>
  <TransitionGroup
    name="fade"
    tag="div"
    class="columns-1 sm:columns-2 lg:columns-3 gap-2 space-y-2 px-2 relative"
    appear
  >
    <SearchResultItemSkeleton
      v-for="(n, i) in heights.length"
      :key="`skeleton-${i}`"
      :height="heights[i]"
      :style="{ transitionDelay: `${i * 25}ms` }"
    />
  </TransitionGroup>
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
