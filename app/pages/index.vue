<script setup lang="ts">
const PER_PAGE = 10;
const route = useRoute();
// make the search query reactive
const searchQuery = computed<string>(() => route.query.search as string);
const { images, loadMore, isLoading, pending, error } =
  useInfiniteUnsplashImages(searchQuery, PER_PAGE);

// initial load
onMounted(() => {
  if (searchQuery.value) {
    loadMore();
  }
});
</script>

<template>
  <main>
    <!-- <SearchResultListSkeleton class="max-w-7xl mx-auto" v-if="pending" />-->
    <p v-if="error" class="text-red-500">Error: {{ error.message }}</p>
    <SearchResultList
      v-else
      @loadMore="loadMore"
      class="max-w-7xl mx-auto"
      :images="images"
    />
  </main>
</template>
