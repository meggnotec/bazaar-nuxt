<template>
  <section class="relative gradient-sale py-12 md:py-16 overflow-hidden" id="sale-banner">
    <!-- Decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div class="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
      <div class="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-white/30 animate-pulse-soft"></div>
      <div class="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-white/20 animate-pulse-soft" style="animation-delay: 0.7s;"></div>
    </div>

    <div class="container-custom relative z-10 text-center">
      <!-- Badge -->
      <span class="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white uppercase tracking-wider mb-4">
        Limited Time
      </span>

      <!-- Heading -->
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-3">
        Flash Sale — Up to 60% Off
      </h2>
      <p class="text-white/80 text-base md:text-lg max-w-lg mx-auto mb-8">
        Hurry — these deals are not around forever. Grab your favorites before time runs out.
      </p>

      <!-- Countdown timer -->
      <div class="flex justify-center gap-3 sm:gap-4 mb-10" role="timer" aria-label="Sale countdown timer" aria-live="polite">
        <div class="flex flex-col items-center">
          <div class="bg-white/20 backdrop-blur-sm rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <span class="text-2xl sm:text-3xl font-heading font-bold text-white">{{ days }}</span>
          </div>
          <span class="text-xs text-white/70 mt-2 font-medium uppercase tracking-wider">Days</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-white/20 backdrop-blur-sm rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <span class="text-2xl sm:text-3xl font-heading font-bold text-white">{{ hours }}</span>
          </div>
          <span class="text-xs text-white/70 mt-2 font-medium uppercase tracking-wider">Hours</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-white/20 backdrop-blur-sm rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <span class="text-2xl sm:text-3xl font-heading font-bold text-white">{{ mins }}</span>
          </div>
          <span class="text-xs text-white/70 mt-2 font-medium uppercase tracking-wider">Mins</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-white/20 backdrop-blur-sm rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <span class="text-2xl sm:text-3xl font-heading font-bold text-white">{{ secs }}</span>
          </div>
          <span class="text-xs text-white/70 mt-2 font-medium uppercase tracking-wider">Secs</span>
        </div>
      </div>

      <!-- CTA -->
      <NuxtLink
        to="/sale"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-heading font-semibold text-sm tracking-wide text-accent-600 shadow-lg shadow-black/10 transition-all duration-200 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent-500"
      >
        Shop Sale
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const days = ref('00');
const hours = ref('00');
const mins = ref('00');
const secs = ref('00');

let interval: ReturnType<typeof setInterval> | null = null;

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

onMounted(() => {
  const target = new Date();
  target.setDate(target.getDate() + 3);
  target.setHours(23, 59, 59, 0);
  const targetTime = target.getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      days.value = '00';
      hours.value = '00';
      mins.value = '00';
      secs.value = '00';
      return;
    }

    days.value = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
    hours.value = pad(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    mins.value = pad(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    secs.value = pad(Math.floor((diff % (1000 * 60)) / 1000));
  }

  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>
