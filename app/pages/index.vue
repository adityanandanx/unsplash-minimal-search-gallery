<script setup lang="ts">
import { LoaderIcon, SearchIcon } from "lucide-vue-next";
import SearchBar from "~/components/SearchBar.vue";
import ThemeSwitcher from "~/components/ThemeSwitcher.vue";
import Button from "~/components/ui/Button.vue";

const PER_PAGE = 20;
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
    <div
      class="flex items-center max-w-xl w-full bg-linear-to-b from-background/90 backdrop-blur-3xl to-background/60 border border-t-0 gap-2 px-4 py-3 rounded-b-md shadow-xl sticky top-0 z-10 mx-auto justify-center mb-10"
    >
      <SearchIcon class="mr-2 text-muted-foreground" />
      <SearchBar class="w-full" />
      <ThemeSwitcher />
    </div>
    <SearchResultListSkeleton class="" v-if="pending && images.length === 0" />
    <Transition name="fade">
      <div
        v-if="error"
        class="z-50 text-red-500 fixed left-5 bottom-5 bg-background/80 backdrop-blur-md px-4 py-2 rounded-md shadow-md"
      >
        Error: {{ error.data.data ?? error.message }}
        <Button variant="outline" class="ml-4 text-foreground" @click="loadMore"
          >Retry</Button
        >
      </div>
    </Transition>
    <SearchResultList v-if="!error" @loadMore="loadMore" :images="images" />
    <!-- only initial loading skeleton -->
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
