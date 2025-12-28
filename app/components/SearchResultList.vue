<script setup lang="ts">
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

const groupedImages = ref<ImageResponseItem[][]>([]);
const { screenType } = useScreenType();
const columns = computed(() => COLUMNS_MAP[screenType.value]);

const groupImages = (n: number) => {
  if (!props.images) return [];
  const grouped: ImageResponseItem[][] = Array.from({ length: n }, () => []);

  for (let col = 0; col < n; col++) {
    for (let i = col; i < props.images.length; i += n) {
      const image = props.images[i];
      if (image) grouped[col]!.push(image);
    }
  }
  return grouped;
};

watch(
  () => [props.images, columns.value],
  () => {
    groupedImages.value = groupImages(columns.value);
  }
);
</script>

<template>
  <div>
    <p
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      v-if="!images || images.length <= 0"
    >
      No images found. Please try a different query.
    </p>

    <div class="flex gap-2" v-else>
      <TransitionGroup
        name="fade"
        tag="div"
        appear
        v-for="i in columns"
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
            <div class="flex flex-col items-center">
              <NuxtImg
                :placeholder="image.urls.small_s3"
                :src="image.urls.full"
                :alt="image.alt_description || 'Unsplash Image'"
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
