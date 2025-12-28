<script setup lang="ts">
import { Loader2Icon } from "lucide-vue-next";
import Modal from "./ui/Modal.vue";
import SearchResultItemSkeleton from "./SearchResultItemSkeleton.vue";

const COLUMNS_MAP = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};

const props = defineProps<{
  images: ImageResponseItem[];
}>();

const emit = defineEmits({
  loadMore: () => true,
});

const { screenType } = useScreenType();
const columns = computed(() => COLUMNS_MAP[screenType.value]);

const regroupImages = (n: number) => {
  if (!props.images) return [];
  const grouped: ImageResponseItem[][] = Array.from({ length: n }, () => []);
  const heights: number[] = Array.from({ length: n }, () => 0);
  props.images.forEach((image) => {
    // find the column with the minimum height
    const minCol = heights.indexOf(Math.min(...heights));
    grouped[minCol]!.push(image);
    // update the height of the column
    heights[minCol]! += image.height / image.width;
  });
  return grouped;
};

const groupedImages = computed(() => regroupImages(columns.value));
const sentinels = useTemplateRef("sentinels");

let observer: IntersectionObserver | null = null;

watch(
  [sentinels, screenType],
  ([newSentinels]) => {
    if (!import.meta.client) return;
    observer?.disconnect();
    if (!newSentinels) return;
    console.log(screenType.value);
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("INTSES");
            emit("loadMore");
          }
        });
      },
      {
        threshold: 0.0,
      }
    );
    newSentinels.forEach((sentinel) => {
      console.log(sentinel?.$el);
      observer?.observe(sentinel?.$el);
    });

    onWatcherCleanup(() => {
      observer?.disconnect();
    });
  },
  { immediate: true, flush: "post" }
);
</script>

<template>
  <div>
    <p class="text-center mb-10" v-if="!images || images.length <= 0">
      No images found. Please try a different query.
    </p>

    <div class="flex gap-2" v-else>
      <TransitionGroup
        name="fade"
        tag="div"
        appear
        v-for="i in columns"
        :key="i"
        class="flex flex-col gap-2 flex-1"
      >
        <Modal
          v-for="(image, j) in groupedImages[i - 1]"
          :key="image.id"
          :style="{ transitionDelay: `${(j + (i - 1) * groupedImages[i - 1]!.length) * 25}ms` }"
        >
          <template #trigger="{ open }">
            <SearchResultItem :image="image" @click="open()" />
          </template>

          <template #content="{ close }">
            <div class="flex flex-col items-center masonry-column">
              <NuxtImg
                :placeholder="image.urls.small_s3"
                :src="image.urls.full"
                :alt="image.alt_description || 'Unsplash Image'"
                :width="image.width"
                :height="image.height"
                class="max-w-full h-[80vh] rounded-sm w-full object-contain mb-4"
              />

              <p>{{ image.description || image.alt_description }}</p>

              <p class="text-sm text-muted-foreground mb-2">
                Photo by
                <a
                  :href="image.user.links.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary underline"
                >
                  {{ image.user.name }}
                </a>
              </p>
            </div>
          </template>
        </Modal>
        <SearchResultItemSkeleton
          :key="`sentinel-${i}`"
          ref="sentinels"
          height="100%"
          class="min-h-37.5"
        />
      </TransitionGroup>
    </div>
    <button class="block mx-auto p-10 cursor-pointer" @click="emit('loadMore')">
      Load More
    </button>
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
