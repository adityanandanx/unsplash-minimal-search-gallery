<script setup lang="ts">
const query = ref<string>("");
const router = useRouter();

const inputEl = ref<HTMLInputElement | null>(null);

const handleInput = debounce(() => {
  router.replace(`?search=${query.value}`);
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
  <input
    v-model="query"
    @input="handleInput"
    ref="inputEl"
    class="border py-2 px-3 rounded-md focus:outline-primary focus:outline"
    type="text"
    placeholder="Start typing... (Ctrl+K to focus)"
  />
</template>
