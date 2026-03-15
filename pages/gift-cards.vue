<template>
  <div>
    <HeroAlt title="Gift Cards" subtitle="Give the gift of style — let them choose what they love" badge="Gift Ideas" />

    <section class="section">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Gift Card Preview -->
          <div class="sticky top-24">
            <div class="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
              <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" role="img" aria-label="Bazaar gift card preview">
                <defs>
                  <linearGradient id="gc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e11d48" />
                    <stop offset="50%" style="stop-color:#7c3aed" />
                    <stop offset="100%" style="stop-color:#6366f1" />
                  </linearGradient>
                </defs>
                <rect width="640" height="400" rx="16" fill="url(#gc-grad)" />
                <circle cx="520" cy="80" r="120" fill="white" opacity="0.05" />
                <circle cx="560" cy="320" r="80" fill="white" opacity="0.05" />
                <text x="48" y="80" font-family="system-ui" font-size="28" font-weight="700" fill="white">BAZAAR</text>
                <text x="48" y="105" font-family="system-ui" font-size="12" fill="white" opacity="0.7">GIFT CARD</text>
                <text x="48" y="260" font-family="system-ui" font-size="48" font-weight="700" fill="white">${{ selectedAmount }}</text>
                <text x="48" y="290" font-family="system-ui" font-size="14" fill="white" opacity="0.7">Your Style, Your Story</text>
                <text x="48" y="360" font-family="system-ui" font-size="13" fill="white" opacity="0.5">XXXX-XXXX-XXXX-XXXX</text>
              </svg>
            </div>
          </div>

          <!-- Gift Card Form -->
          <div>
            <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-6">Choose an Amount</h2>

            <!-- Amount Presets -->
            <div class="grid grid-cols-3 gap-3 mb-4">
              <button
                v-for="amount in presetAmounts"
                :key="amount"
                :data-amount="amount"
                class="px-4 py-3 rounded-xl font-heading font-bold text-center transition-all duration-200 border-2"
                :class="selectedAmount === amount && !customActive
                  ? 'border-primary-600 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 dark:border-primary-500'
                  : 'border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-primary-300 dark:hover:border-primary-600'"
                @click="selectPreset(amount)"
              >
                ${{ amount }}
              </button>
            </div>

            <!-- Custom Amount -->
            <div class="mb-8">
              <label for="custom-amount" class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Or enter a custom amount</label>
              <div class="relative">
                <span class="absolute start-4 top-1/2 -translate-y-1/2 text-surface-400 font-semibold">$</span>
                <input
                  type="number"
                  id="custom-amount"
                  v-model.number="customAmount"
                  min="10"
                  max="500"
                  placeholder="Enter amount"
                  class="w-full ps-8 pe-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  @input="handleCustomInput"
                />
              </div>
              <p class="text-xs text-surface-400 mt-1">Min $10 — Max $500</p>
            </div>

            <!-- Recipient Details -->
            <h3 class="text-lg font-heading font-bold text-surface-900 dark:text-white mb-4">Recipient Details</h3>
            <div class="space-y-4 mb-8">
              <div>
                <label for="gc-recipient-name" class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Recipient Name</label>
                <input
                  type="text"
                  id="gc-recipient-name"
                  placeholder="Their name"
                  class="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label for="gc-recipient-email" class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Recipient Email</label>
                <input
                  type="email"
                  id="gc-recipient-email"
                  placeholder="their@email.com"
                  class="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label for="gc-message" class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Personal Message (optional)</label>
                <textarea
                  id="gc-message"
                  rows="3"
                  placeholder="Write a personal note..."
                  class="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                ></textarea>
              </div>
            </div>

            <button class="btn-primary w-full text-lg py-4" @click="addToCart">
              Add Gift Card to Cart — ${{ selectedAmount }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section bg-surface-50 dark:bg-surface-900">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">How Gift Cards Work</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="step in steps" :key="step.step" class="text-center">
            <div class="w-14 h-14 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="step.icon" />
              </svg>
            </div>
            <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-2">{{ step.title }}</h3>
            <p class="text-sm text-surface-600 dark:text-surface-400">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useBazaarSEO({
  title: 'Gift Cards',
  description: 'Give the gift of style with Bazaar Studio gift cards. Available in amounts from $25 to $200.',
});

const presetAmounts = [25, 50, 75, 100, 150, 200];
const selectedAmount = ref(50);
const customAmount = ref<number | null>(null);
const customActive = ref(false);

function selectPreset(amount: number) {
  selectedAmount.value = amount;
  customAmount.value = null;
  customActive.value = false;
}

function handleCustomInput() {
  if (customAmount.value !== null && customAmount.value >= 10 && customAmount.value <= 500) {
    selectedAmount.value = customAmount.value;
    customActive.value = true;
  }
}

function addToCart() {
  alert(`Gift card ($${selectedAmount.value}) added to cart! This is a demo.`);
}

const steps = [
  {
    step: '1',
    title: 'Choose an Amount',
    desc: 'Select a preset amount or enter a custom value from $10 to $500.',
    icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
  },
  {
    step: '2',
    title: 'Send It Their Way',
    desc: 'We\'ll deliver a beautifully designed digital gift card straight to their inbox.',
    icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
  },
  {
    step: '3',
    title: 'They Shop & Enjoy',
    desc: 'The recipient can use their gift card on any item in our store \u2014 no expiration date.',
    icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
  },
];
</script>
