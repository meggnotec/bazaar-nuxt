<template>
  <div>
    <div class="flex gap-2">
      <input
        v-model="code"
        type="text"
        placeholder="Promo code"
        class="input flex-1"
        @keydown.enter="applyCode"
      />
      <button
        type="button"
        class="btn-outline text-sm whitespace-nowrap"
        @click="applyCode"
      >
        Apply
      </button>
    </div>
    <p
      v-if="message"
      :class="['text-sm mt-2', isSuccess ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500']"
    >
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
const code = ref('');
const message = ref('');
const isSuccess = ref(false);

function applyCode() {
  const trimmed = code.value.trim().toUpperCase();
  if (!trimmed) return;

  if (trimmed === 'BAZAAR10' || trimmed === 'WELCOME15') {
    message.value = `Code "${trimmed}" applied successfully!`;
    isSuccess.value = true;
  } else {
    message.value = 'Invalid promo code. Try BAZAAR10 or WELCOME15.';
    isSuccess.value = false;
  }
}
</script>
