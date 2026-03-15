<template>
  <div class="flex items-center gap-2 flex-wrap">
    <template v-if="isOnSale">
      <span :class="['font-heading font-bold text-primary-600 dark:text-primary-400', textSize]">
        ${{ salePrice!.toFixed(2) }}
      </span>
      <span :class="['font-heading text-surface-400 line-through', crossedSize]">
        ${{ price.toFixed(2) }}
      </span>
      <span class="badge-sale text-[10px]">-{{ discount }}%</span>
    </template>
    <template v-else>
      <span :class="['font-heading font-bold text-surface-900 dark:text-white', textSize]">
        ${{ price.toFixed(2) }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  price: number;
  salePrice?: number | null;
  size?: 'sm' | 'md' | 'lg';
}>(), {
  size: 'md',
});

const isOnSale = computed(() => props.salePrice !== null && props.salePrice !== undefined);
const discount = computed(() => isOnSale.value ? Math.round((1 - props.salePrice! / props.price) * 100) : 0);

const textSizeMap: Record<string, string> = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' };
const crossedSizeMap: Record<string, string> = { sm: 'text-xs', md: 'text-sm', lg: 'text-lg' };

const textSize = computed(() => textSizeMap[props.size] || 'text-lg');
const crossedSize = computed(() => crossedSizeMap[props.size] || 'text-sm');
</script>
