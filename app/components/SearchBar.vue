<script setup lang="ts">
const query = ref<string>("");
const router = useRouter();

const handleInput = debounce(() => {
  router.replace(`?search=${query.value}`);
}, 800);
</script>
<template>
  <input
    v-model="query"
    @input="handleInput"
    class="border py-2 px-3 rounded-md focus:outline-primary focus:outline"
    type="text"
    placeholder="Start typing... (Ctrl+K to focus)"
  />
</template>
