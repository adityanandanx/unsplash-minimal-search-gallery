<script setup lang="ts">
import { MonitorIcon, MoonIcon, PcCaseIcon, SunIcon } from "lucide-vue-next";

const { theme } = useThemeMode();
</script>
<template>
  <header class="w-full">
    <nav class="max-w-7xl mx-auto flex flex-col items-center my-10 px-10">
      <h1 class="font-bold tracking-tighter text-3xl">NoSplash</h1>
      <p class="text-muted-foreground tracking-tight">
        Interactive search tool to search for images from unsplash
      </p>
      <div class="flex items-center gap-2 w-full justify-center mt-4">
        <SearchBar class="max-w-md w-full" />
        <button
          @click="
            () => {
              if (theme === 'light') {
                theme = 'dark';
              } else if (theme === 'dark') {
                theme = 'system';
              } else {
                theme = 'light';
              }
            }
          "
          aria-label="Toggle theme"
          class="border block rounded-sm p-2 hover:bg-muted/50 cursor-pointer"
        >
          <Transition name="slide" mode="out-in">
            <SunIcon v-if="theme === 'light'" />
            <MoonIcon v-else-if="theme === 'dark'" />
            <MonitorIcon v-else />
          </Transition>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
