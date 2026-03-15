<template>
  <span :class="['badge-sale', pulse && 'animate-pulse-soft']">
    -{{ discount }}% OFF
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  discount: number;
  pulse?: boolean;
}>(), {
  pulse: false,
});
</script>
