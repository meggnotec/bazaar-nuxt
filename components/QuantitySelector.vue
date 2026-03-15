<template>
  <div class="inline-flex items-center rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800">
    <button
      type="button"
      class="w-10 h-10 flex items-center justify-center text-surface-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      aria-label="Decrease quantity"
      :disabled="currentValue <= min"
      @click="decrease"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
      </svg>
    </button>
    <input
      type="number"
      class="qty-input w-12 h-10 text-center border-x border-surface-300 dark:border-surface-600 bg-transparent text-surface-900 dark:text-white font-semibold text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      :value="currentValue"
      :min="min"
      :max="max"
      readonly
      aria-label="Quantity"
    />
    <button
      type="button"
      class="w-10 h-10 flex items-center justify-center text-surface-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      aria-label="Increase quantity"
      :disabled="currentValue >= max"
      @click="increase"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  min?: number;
  max?: number;
  modelValue?: number;
}>(), {
  min: 1,
  max: 99,
  modelValue: 1,
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const currentValue = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  currentValue.value = val;
});

function decrease() {
  if (currentValue.value > props.min) {
    currentValue.value--;
    emit('update:modelValue', currentValue.value);
  }
}

function increase() {
  if (currentValue.value < props.max) {
    currentValue.value++;
    emit('update:modelValue', currentValue.value);
  }
}
</script>
