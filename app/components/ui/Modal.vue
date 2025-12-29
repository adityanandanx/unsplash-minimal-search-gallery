<script setup lang="ts">
import { XIcon } from "lucide-vue-next";

const isOpen = ref(false);
const prevFocus = ref<HTMLElement | null>(null);
const dialog = useTemplateRef<HTMLElement | null>("dialog");

// manage body scroll lock and focus trapping
const prepareToOpen = () => {
  prevFocus.value = document.activeElement as HTMLElement;
  document.body.style.overflow = "hidden";
  const mainEl = document.querySelector("main");
  if (mainEl) {
    mainEl.setAttribute("aria-hidden", "true");
    mainEl.setAttribute("inert", "true");
  }
  // focus the dialog after it's rendered
  nextTick(() => {
    dialog.value?.focus();
  });
};

const prepareToClose = () => {
  document.body.style.overflow = "auto";
  if (prevFocus.value) {
    prevFocus.value.focus();
  }
  const mainEl = document.querySelector("main");
  if (mainEl) {
    mainEl.removeAttribute("aria-hidden");
    mainEl.removeAttribute("inert");
  }
};

watch(isOpen, (open) => {
  open ? prepareToOpen() : prepareToClose();
});
onUnmounted(prepareToClose);
</script>

<template>
  <div>
    <slot name="trigger" :open="() => (isOpen = true)" />

    <ClientOnly>
      <Teleport to="body">
        <Transition name="fade">
          <div
            @keydown.esc.stop.prevent="isOpen = false"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            tabindex="-1"
            v-if="isOpen"
            ref="dialog"
            class="bg-black/80 z-50 inset-0 fixed flex flex-col items-center justify-center p-0 md:p-4"
            @click.self="isOpen = false"
          >
            <div
              class="relative content bg-background/20 backdrop-blur-3xl shadow-2xl shadow-black/50 p-4 md:p-8 rounded-md max-h-screen h-full w-full max-w-[90vw] overflow-y-auto overflow-x-hidden"
            >
              <h2 id="modal-title" class="sr-only">
                <slot name="title">Dialog</slot>
              </h2>
              <p id="modal-description" class="sr-only">
                <slot name="description">Dialog Description</slot>
              </p>
              <slot name="content" :close="() => (isOpen = false)" />
              <button
                class="rounded-md p-2 absolute right-2 top-2 cursor-pointer"
                @click="isOpen = false"
                aria-label="Close modal"
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
