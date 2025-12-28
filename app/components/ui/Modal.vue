<script setup lang="ts">
import { XIcon } from "lucide-vue-next";

import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <div>
    <slot name="trigger" :open="() => (isOpen = true)" />

    <ClientOnly>
      <Teleport to="body">
        <Transition name="fade">
          <div
            v-if="isOpen"
            class="bg-black/80 z-50 inset-0 fixed flex flex-col items-center justify-center p-0 md:p-4"
            @click.self="isOpen = false"
          >
            <div
              class="relative content bg-background/20 backdrop-blur-3xl shadow-2xl shadow-black/50 p-4 md:p-8 rounded-md max-h-screen h-full w-full max-w-[90vw] overflow-y-auto overflow-x-hidden"
            >
              <slot name="content" :close="() => (isOpen = false)" />
              <button
                class="rounded-md p-2 absolute right-2 top-2 cursor-pointer"
                @click="isOpen = false"
              >
                <XIcon />
              </button>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style scoped>
/* backdrop transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* content transition */
.fade-enter-active .content,
.fade-leave-active .content {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from .content,
.fade-leave-to .content {
  transform: translateY(100%);
}
</style>
