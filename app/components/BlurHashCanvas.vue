<script setup lang="ts">
import { decode } from "blurhash";

const props = defineProps<{
  hash: string;
  width?: number;
  height?: number;
  punch?: number;
}>();

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

const draw = () => {
  if (!canvas.value) return;

  // decode the blurhash
  const pixels = decode(
    props.hash,
    props.width ?? 32,
    props.height ?? 32,
    props.punch ?? 1
  );
  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;
  const imageData = ctx.createImageData(props.width ?? 32, props.height ?? 32);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);
};

watch(() => props.hash, draw);
onMounted(draw);
</script>
<template>
  <canvas
    ref="canvas"
    :width="props.width ?? 32"
    :height="props.height ?? 32"
    class="w-full h-full object-cover"
  ></canvas>
</template>
