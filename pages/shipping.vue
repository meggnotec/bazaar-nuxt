<template>
  <HeroAlt title="Shipping & Delivery" subtitle="Fast, reliable shipping with options to suit every order" badge="Delivery Info" />

  <!-- Domestic Shipping -->
  <section class="section">
    <div class="container-custom max-w-4xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-8">Domestic Shipping (United States)</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b-2 border-primary-200 dark:border-primary-800">
              <th class="px-4 py-3 text-start font-heading font-bold text-surface-900 dark:text-white">Method</th>
              <th class="px-4 py-3 text-start font-heading font-bold text-surface-900 dark:text-white">Delivery Time</th>
              <th class="px-4 py-3 text-start font-heading font-bold text-surface-900 dark:text-white">Cost</th>
              <th class="px-4 py-3 text-start font-heading font-bold text-surface-900 dark:text-white">Free Threshold</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in domesticShipping"
              :key="row.method"
              :class="[i % 2 === 0 ? 'bg-surface-50 dark:bg-surface-800/50' : '', 'border-b border-surface-200 dark:border-surface-700']"
            >
              <td class="px-4 py-3 font-semibold text-surface-900 dark:text-white">{{ row.method }}</td>
              <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.time }}</td>
              <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.cost }}</td>
              <td class="px-4 py-3">
                <span v-if="row.threshold !== '—'" class="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{{ row.threshold }}</span>
                <span v-else class="text-surface-400">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- International Shipping -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom max-w-4xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-8">International Shipping</h2>
      <p class="text-center text-surface-600 dark:text-surface-400 mb-8 max-w-2xl mx-auto">We ship to over 50 countries worldwide. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b-2 border-primary-200 dark:border-primary-800">
              <th class="px-4 py-3 text-start font-heading font-bold text-surface-900 dark:text-white">Region</th>
              <th class="px-4 py-3 text-start font-heading font-bold text-surface-900 dark:text-white">Delivery Time</th>
              <th class="px-4 py-3 text-start font-heading font-bold text-surface-900 dark:text-white">Standard Cost</th>
              <th class="px-4 py-3 text-start font-heading font-bold text-surface-900 dark:text-white">Express Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in internationalShipping"
              :key="row.region"
              :class="[i % 2 === 0 ? 'bg-white dark:bg-surface-800/50' : '', 'border-b border-surface-200 dark:border-surface-700']"
            >
              <td class="px-4 py-3 font-semibold text-surface-900 dark:text-white">{{ row.region }}</td>
              <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.time }}</td>
              <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.standard }}</td>
              <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.express }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Order Processing -->
  <section class="section">
    <div class="container-custom max-w-3xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-8">Order Processing</h2>
      <div class="space-y-6">
        <div
          v-for="item in processingInfo"
          :key="item.title"
          class="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700"
        >
          <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-2">{{ item.title }}</h3>
          <p class="text-sm text-surface-600 dark:text-surface-400">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA to Order Tracking -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom text-center">
      <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-4">Already Placed an Order?</h2>
      <p class="text-surface-600 dark:text-surface-400 mb-8 max-w-xl mx-auto">Track your package in real-time with your order number and email.</p>
      <NuxtLink to="/order-tracking" class="btn-primary">Track Your Order</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useBazaarSEO({
  title: 'Shipping & Delivery',
  description: 'Learn about Bazaar Studio shipping options, delivery times, and international shipping rates.',
});

const domesticShipping = [
  { method: 'Standard Shipping', time: '5-7 business days', cost: '$9.95', threshold: 'Orders $99+' },
  { method: 'Express Shipping', time: '2-3 business days', cost: '$19.95', threshold: 'Orders $199+' },
  { method: 'Overnight Shipping', time: '1 business day', cost: '$29.95', threshold: '—' },
  { method: 'In-Store Pickup', time: 'Same day', cost: 'Free', threshold: 'All orders' },
];

const internationalShipping = [
  { region: 'Canada', time: '5-8 business days', standard: '$14.95', express: '$29.95' },
  { region: 'European Union', time: '7-12 business days', standard: '$19.95', express: '$39.95' },
  { region: 'United Kingdom', time: '7-10 business days', standard: '$17.95', express: '$34.95' },
  { region: 'Australia & New Zealand', time: '10-15 business days', standard: '$24.95', express: '$44.95' },
  { region: 'Asia (Japan, S. Korea, Singapore)', time: '8-14 business days', standard: '$22.95', express: '$42.95' },
  { region: 'Rest of World', time: '12-20 business days', standard: '$29.95', express: '$49.95' },
];

const processingInfo = [
  { title: 'Processing Time', text: 'Orders are processed within 1-2 business days after payment confirmation. During peak seasons (holidays, major sales), processing may take up to 3 business days.' },
  { title: 'Order Confirmation', text: "You'll receive an email confirmation immediately after placing your order, and a shipping confirmation with tracking details once your order ships." },
  { title: 'Delivery Attempts', text: 'Our carriers will attempt delivery up to 3 times. If the package cannot be delivered, it will be held at a local pickup facility for 7 days.' },
  { title: 'P.O. Boxes & APO/FPO', text: 'We ship to P.O. boxes and military addresses via USPS. Express and overnight shipping are not available for these addresses.' },
];
</script>
