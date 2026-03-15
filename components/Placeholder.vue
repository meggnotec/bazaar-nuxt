<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
    role="img"
    :aria-label="displayLabel"
  >
    <rect :width="width" :height="height" :fill="bgColor" />
    <text
      x="50%"
      y="50%"
      dominant-baseline="middle"
      text-anchor="middle"
      fill="rgba(255,255,255,0.7)"
      font-family="system-ui, sans-serif"
      font-size="14"
      font-weight="500"
    >
      {{ displayLabel }}
    </text>
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  width: number;
  height: number;
  label?: string;
  bgColor?: string;
  class?: string;
}>(), {
  bgColor: '#c4a882',
  class: '',
});

const displayLabel = computed(() => props.label ?? `${props.width}\u00D7${props.height}`);
const className = computed(() => props.class);
</script>
