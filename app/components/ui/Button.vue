<script setup lang="ts">
const props = defineProps<{
  variant?: "primary" | "secondary" | "outline";
}>();
</script>
<template>
  <button
    class="text-sm px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 cursor-pointer"
    :class="{
      'bg-primary text-primary-foreground hover:bg-primary/80':
        props.variant === 'primary',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80':
        props.variant === 'secondary',
      'border hover:bg-primary/10': props.variant === 'outline',
    }"
  >
    <slot />
  </button>
</template>
