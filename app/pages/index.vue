<script setup lang="ts">
const route = useRoute();
// make the search query reactive
const searchQuery = computed<string>(() => route.query.search as string);
const { images, refresh, execute, pending, error } =
  useUnsplashImages(searchQuery);
</script>

<template>
  <main>
    <!-- <pre> -->
    <!-- {{ JSON.stringify(images[0], null, 2) }} -->
    <!-- </pre> -->
    <SearchResultListSkeleton class="max-w-7xl mx-auto" v-if="pending" />
    <p v-else-if="error" class="text-red-500">Error: {{ error.message }}</p>
    <SearchResultList class="max-w-7xl mx-auto" v-else :images="images" />
  </main>
</template>
