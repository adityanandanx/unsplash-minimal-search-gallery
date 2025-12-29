<script setup lang="ts">
const route = useRoute();
const query = ref<string>((route.query.search as string) || "");
const router = useRouter();

const inputEl = ref<HTMLInputElement | null>(null);

const handleInput = debounce(() => {
  router.replace({ path: "/", query: { search: query.value } });
}, 800);

const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    inputEl.value?.focus();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
<template>
  <div
    class="border rounded-md focus-within:outline-primary focus-within:outline"
  >
    <input
      v-model="query"
      @input="handleInput"
      ref="inputEl"
      type="text"
      class="py-2 px-3 w-full outline-none"
      placeholder="Start typing... (Ctrl+K to focus)"
    />
  </div>
</template>
