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
            class="bg-background/80 inset-0 fixed flex flex-col items-center justify-center p-4"
            @click.self="isOpen = false"
          >
            <div
              class="relative content bg-background shadow-2xl p-10 rounded-md max-h-screen max-w-[90vw] overflow-y-auto"
            >
              <slot name="content" :close="() => (isOpen = false)" />
              <button
                class="rounded-md bg-background p-2 absolute right-0 top-0 cursor-pointer"
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
