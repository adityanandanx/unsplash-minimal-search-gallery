<script setup lang="ts">
import { LoaderIcon } from "lucide-vue-next";

const PER_PAGE = 10;
const route = useRoute();
// make the search query reactive
const searchQuery = computed<string>(() => route.query.search as string);
const { images, loadMore, pending, error } = useInfiniteUnsplashImages(
  searchQuery,
  PER_PAGE
);

// initial load
onMounted(() => {
  loadMore();
});
</script>

<template>
  <main class="max-w-7xl mx-auto">
    <!-- only initial loading skeleton -->
    <SearchResultListSkeleton class="" v-if="pending && images.length === 0" />

    <p v-if="error" class="text-red-500 text-center">
      Error: {{ error.data.data ?? error.message }}
    </p>
    <SearchResultList v-else @loadMore="loadMore" :images="images" />
    <!-- loading spinner -->
    <div
      :style="{ opacity: pending ? 1 : 0 }"
      class="fixed right-0 bottom-0 transition-opacity p-4 pl-24 pt-24 bg-radial-[at_100%_100%] from-background from-20% to-transparent to-70% pointer-events-none"
      aria-label="Loading images"
    >
      <LoaderIcon class="animate-spin" />
    </div>
  </main>
</template>
