<script setup lang="ts">
const props = defineProps<{
  image: ImageResponseItem;
}>();
</script>

<template>
  <button
    class="group relative border rounded-md overflow-hidden block w-full text-left cursor-pointer"
  >
    <NuxtImg
      :placeholder="image.urls.thumb"
      :src="image.urls.small_s3"
      :alt="image.alt_description || 'Unsplash Image'"
      class="w-full h-full object-cover"
    />
    <div
      class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 pt-20 absolute bottom-0 left-0 right-0 bg-linear-to-t from-background to-background/0"
    >
      <span class="capitalize">
        {{ image.alt_description }}
      </span>
      <p class="text-sm text-gray-600">
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
  </button>
</template>
