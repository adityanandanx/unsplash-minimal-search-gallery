<script setup lang="ts">
import { DownloadIcon, ExternalLinkIcon, HeartIcon } from "lucide-vue-next";
import BlurHashCanvas from "./BlurHashCanvas.vue";
import Button from "./ui/Button.vue";

const props = defineProps<{
  image: ImageResponseItem;
}>();
</script>

<template>
  <div class="flex flex-col w-auto items-center justify-center h-full gap-2">
    <BlurHashCanvas
      class="opacity-50 absolute left-0 top-0 -z-10"
      :hash="image.blur_hash"
      :width="32"
      :height="32"
    />
    <div class="relative overflow-hidden rounded-sm w-fit self-center">
      <BlurHashCanvas
        class="absolute left-0 top-0 -z-10"
        :hash="image.blur_hash"
        :width="32"
        :height="32"
      />
      <NuxtImg
        :src="image.urls.full"
        :alt="image.alt_description || 'Unsplash Image'"
        :width="image.width"
        :height="image.height"
        fit="contain"
        class="block bg-transparent z-20 max-h-[80vh] w-auto"
      />
    </div>

    <div class="flex flex-col gap-2 max-w-xl w-full mt-4">
      <div
        class="flex justify-between gap-2 md:items-center sm:flex-row flex-col"
      >
        <div class="flex items-center gap-2 text-sm">
          <NuxtImg
            :placeholder="image.user.profile_image.small"
            :src="image.user.profile_image.medium"
            :alt="image.user.name"
            width="40"
            height="40"
            class="block rounded-sm"
          />
          <div class="flex flex-col">
            <p>
              Photo by
              <a
                :href="image.user.links.html"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary underline leading-none"
              >
                {{ image.user.name }}
              </a>
            </p>
            <span class="text-muted-foreground text-xs leading-none">{{
              image.user.location
            }}</span>
          </div>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">
            <HeartIcon
              class="inline-block align-middle -translate-y-0.5"
              :size="16"
            />
            {{ image.likes }} Likes
          </p>
        </div>
      </div>

      <h1 class="font-bold sm:text-center line-clamp-2">
        {{ image.description || image.alt_description }}
      </h1>

      <div class="flex gap-2 sm:justify-center">
        <a :href="image.links.html" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">
            <ExternalLinkIcon
              class="inline-block align-middle -translate-y-0.5"
              :size="14"
            />
            Visit Page
          </Button>
        </a>
        <a :href="image.links.download" target="_blank">
          <Button variant="outline">
            <DownloadIcon
              class="inline-block align-middle -translate-y-0.5"
              :size="14"
            />
            Download
          </Button>
        </a>
      </div>
      <!-- <pre class="fixed left-0 top-0">{{ JSON.stringify(image, null, 2) }}</pre> -->
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
