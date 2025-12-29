<script setup lang="ts">
import SearchResultItemSkeleton from "./SearchResultItemSkeleton.vue";
import SearchResultModalContent from "./SearchResultModalContent.vue";
import Modal from "./ui/Modal.vue";

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
  () => [sentinels.value, screenType.value, props.images],
  () => {
    if (!import.meta.client) return;
    observer?.disconnect();
    if (!sentinels.value) return;
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            emit("loadMore");
          }
        });
      },
      {
        threshold: 0.0,
        rootMargin: "400px",
      }
    );
    sentinels.value.forEach((sentinel) => {
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
    <div class="flex gap-2 px-2">
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
          <template #title> Image by {{ image.user.name }} </template>

          <template #description>
            {{ image.description || image.alt_description || "No description" }}
          </template>

          <template #trigger="{ open }">
            <SearchResultItem :image="image" @click="open()" />
          </template>

          <template #content="{ close }">
            <SearchResultModalContent :image="image" />
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
