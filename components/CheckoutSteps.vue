<template>
  <div class="flex items-center justify-center gap-4 mb-8">
    <template v-for="(step, index) in steps" :key="step.number">
      <div class="flex items-center gap-2">
        <div
          :class="[
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors',
            step.number < currentStep
              ? 'bg-emerald-500 text-white'
              : step.number === currentStep
                ? 'gradient-cta text-white'
                : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400',
          ]"
        >
          <svg v-if="step.number < currentStep" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span v-else>{{ step.number }}</span>
        </div>
        <span
          :class="[
            'text-sm font-medium hidden sm:inline',
            step.number <= currentStep
              ? 'text-surface-900 dark:text-white'
              : 'text-surface-400 dark:text-surface-500',
          ]"
        >
          {{ step.label }}
        </span>
      </div>
      <div
        v-if="index < steps.length - 1"
        :class="[
          'w-12 h-0.5 rounded',
          step.number < currentStep
            ? 'bg-emerald-500'
            : 'bg-surface-200 dark:bg-surface-700',
        ]"
      ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  currentStep?: number;
}>(), {
  currentStep: 1,
});

const steps = [
  { number: 1, label: 'Shipping' },
  { number: 2, label: 'Payment' },
  { number: 3, label: 'Review' },
];
</script>
