<script setup lang="ts">
import Modal from "./ui/Modal.vue";

defineProps<{
  images: ImageResponseItem[] | undefined;
}>();
</script>

<template>
  <div>
    <p
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      v-if="!images || images.length <= 0"
    >
      No images found. Please try a different query.
    </p>
    <TransitionGroup
      name="fade"
      tag="div"
      class="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 px-4 relative"
      appear
      v-else
    >
      <Modal
        v-for="(image, i) in images"
        :key="image.id"
        :style="{ transitionDelay: `${i * 25}ms` }"
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

            <p class="text-sm text-gray-600 mb-2">
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
    <!-- <SearchResultItem v-for="image in images" :key="image.id" :image="image" /> -->
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
