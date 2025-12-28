<script setup lang="ts">
import { MonitorIcon, MoonIcon, PcCaseIcon, SunIcon } from "lucide-vue-next";
import Button from "./ui/Button.vue";

const { theme } = useThemeMode();
</script>

<template>
  <Button
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
    variant="outline"
  >
    <!-- class="border block rounded-sm p-2 hover:bg-muted/50 cursor-pointer" -->
    <Transition name="slide" mode="out-in">
      <SunIcon v-if="theme === 'light'" />
      <MoonIcon v-else-if="theme === 'dark'" />
      <MonitorIcon v-else />
    </Transition>
  </Button>
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
