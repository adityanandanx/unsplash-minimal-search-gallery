<script setup lang="ts">
const route = useRoute();
// make the search query reactive
const searchQuery = computed<string>(() => route.query.search as string);
const { images, loadMore, isLoading, pending, error } =
  useInfiniteUnsplashImages(searchQuery);

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
