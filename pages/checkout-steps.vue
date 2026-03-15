<template>
  <HeroAlt title="Checkout" subtitle="Complete your purchase" />

  <section class="section">
    <div class="container-custom max-w-3xl">
      <CheckoutMultiStep />
    </div>
  </section>
</template>

<script setup lang="ts">
useBazaarSEO({
  title: 'Checkout',
  description: 'Complete your order step by step.',
});
</script>
