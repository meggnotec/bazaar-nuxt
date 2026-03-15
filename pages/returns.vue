<template>
  <HeroAlt title="Returns & Exchanges" subtitle="Hassle-free returns within 30 days of purchase" badge="Customer Care" />

  <!-- Policy Highlights -->
  <section class="section">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-8 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <div class="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
          </div>
          <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-2">30-Day Returns</h3>
          <p class="text-sm text-surface-600 dark:text-surface-400">Return any unworn item within 30 days of delivery for a full refund.</p>
        </div>
        <div class="text-center p-8 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <div class="w-14 h-14 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-secondary-600 dark:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
          </div>
          <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-2">Free Return Shipping</h3>
          <p class="text-sm text-surface-600 dark:text-surface-400">We cover return shipping costs within the US. International returns ship at flat rate.</p>
        </div>
        <div class="text-center p-8 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <div class="w-14 h-14 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-accent-600 dark:text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
          </div>
          <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-2">Easy Exchanges</h3>
          <p class="text-sm text-surface-600 dark:text-surface-400">Need a different size or color? Exchange any item for free within 30 days.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Step by Step Process -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom max-w-4xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">How It Works</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div v-for="item in steps" :key="item.step" class="text-center">
          <div class="w-12 h-12 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4 text-white font-heading font-bold text-lg">{{ item.step }}</div>
          <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-2">{{ item.title }}</h3>
          <p class="text-sm text-surface-600 dark:text-surface-400">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Eligibility -->
  <section class="section">
    <div class="container-custom max-w-4xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">Return Eligibility</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800">
          <h3 class="font-heading font-bold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            Eligible for Return
          </h3>
          <ul class="space-y-2 text-sm text-surface-700 dark:text-surface-300">
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-0.5">&#10003;</span> Unworn items with original tags attached</li>
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-0.5">&#10003;</span> Items in original packaging</li>
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-0.5">&#10003;</span> Items purchased within the last 30 days</li>
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-0.5">&#10003;</span> Defective or damaged items (contact us first)</li>
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-0.5">&#10003;</span> Incorrect items received</li>
          </ul>
        </div>
        <div class="p-6 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
          <h3 class="font-heading font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            Not Eligible
          </h3>
          <ul class="space-y-2 text-sm text-surface-700 dark:text-surface-300">
            <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">&#10007;</span> Worn, washed, or altered items</li>
            <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">&#10007;</span> Items without original tags</li>
            <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">&#10007;</span> Swimwear and intimates (hygiene reasons)</li>
            <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">&#10007;</span> Gift cards and final sale items</li>
            <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">&#10007;</span> Items purchased more than 30 days ago</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Start a Return Form -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom max-w-lg">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-8">Start a Return</h2>
      <form class="space-y-4" @submit.prevent="handleReturnSubmit">
        <div>
          <label for="return-order" class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Order Number</label>
          <input type="text" id="return-order" placeholder="BZR-2026-XXXXX" required class="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" />
        </div>
        <div>
          <label for="return-email" class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Email Address</label>
          <input type="email" id="return-email" placeholder="you@example.com" required class="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" />
        </div>
        <div>
          <label for="return-reason" class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Reason for Return</label>
          <select id="return-reason" required class="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition">
            <option value="">Select a reason</option>
            <option value="size">Wrong size</option>
            <option value="color">Color not as expected</option>
            <option value="quality">Quality issue</option>
            <option value="wrong-item">Received wrong item</option>
            <option value="changed-mind">Changed my mind</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" class="btn-primary w-full">Submit Return Request</button>
      </form>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section">
    <div class="container-custom max-w-3xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-8">Common Questions</h2>
      <div class="space-y-4">
        <details
          v-for="faq in returnsFaq"
          :key="faq.q"
          class="group bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden"
        >
          <summary class="flex items-center justify-between p-5 cursor-pointer font-heading font-semibold text-surface-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {{ faq.q }}
            <svg class="w-5 h-5 text-surface-400 transition-transform group-open:rotate-180 shrink-0 ms-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </summary>
          <div class="px-5 pb-5 text-sm text-surface-600 dark:text-surface-400">{{ faq.a }}</div>
        </details>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom text-center">
      <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-4">Need More Help?</h2>
      <p class="text-surface-600 dark:text-surface-400 mb-8 max-w-xl mx-auto">Our customer care team is available Monday through Friday, 9AM to 6PM EST.</p>
      <NuxtLink to="/contact" class="btn-primary">Contact Support</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useBazaarSEO({
  title: 'Returns & Exchanges',
  description: 'Easy 30-day returns and exchanges at Bazaar Studio. Free return shipping on all orders.',
});

const steps = [
  { step: '1', title: 'Start Your Return', desc: 'Enter your order number and email below to initiate a return or exchange.' },
  { step: '2', title: 'Print Your Label', desc: "We'll email you a prepaid shipping label. Print it and attach to your package." },
  { step: '3', title: 'Ship It Back', desc: 'Drop off your package at any UPS or USPS location near you.' },
  { step: '4', title: 'Get Your Refund', desc: 'Once received and inspected, your refund is processed within 3-5 business days.' },
];

const returnsFaq = [
  { q: 'How long does a refund take?', a: 'Once we receive your return, refunds are processed within 3-5 business days. It may take an additional 5-10 business days for the refund to appear on your statement depending on your bank.' },
  { q: 'Can I exchange for a different item?', a: "Yes! You can exchange for a different size, color, or even a completely different item of equal or lesser value. If the new item costs more, you'll be charged the difference." },
  { q: 'What if my item arrived damaged?', a: "Contact our support team immediately with photos of the damage. We'll send a replacement right away at no additional cost and arrange a free return pickup." },
  { q: 'Do sale items have a different return policy?', a: 'Items marked as "Final Sale" cannot be returned or exchanged. All other sale items follow our standard 30-day return policy.' },
];

function handleReturnSubmit() {
  alert('This is a demo — return request submitted successfully!');
}
</script>
