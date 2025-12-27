<script setup>
const { query } = useRoute();

const { images, refresh, pending, error } = useUnsplashImages(
  query.search || ""
);
</script>
<template>
  <main>
    <pre>
      {{ JSON.stringify(images, null, 2) }}
    </pre>
  </main>
</template>
