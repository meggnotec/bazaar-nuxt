<template>
  <HeroAlt title="Rewards Program" subtitle="Earn points every time you shop, share, and engage" badge="Bazaar Rewards" />

  <!-- How It Works -->
  <section class="section">
    <div class="container-custom max-w-4xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">How It Works</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="item in howItWorks" :key="item.title" class="text-center">
          <div class="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" /></svg>
          </div>
          <h3 class="font-heading font-bold text-lg text-surface-900 dark:text-white mb-2">{{ item.title }}</h3>
          <p class="text-sm text-surface-600 dark:text-surface-400">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Points Earning Table -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom max-w-3xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-8">Ways to Earn</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b-2 border-primary-200 dark:border-primary-800">
              <th class="px-4 py-3 text-start font-heading font-bold text-surface-900 dark:text-white">Action</th>
              <th class="px-4 py-3 text-start font-heading font-bold text-surface-900 dark:text-white">Points Earned</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in earningTable"
              :key="row.action"
              :class="[i % 2 === 0 ? 'bg-white dark:bg-surface-800/50' : '', 'border-b border-surface-200 dark:border-surface-700']"
            >
              <td class="px-4 py-4">
                <p class="font-semibold text-surface-900 dark:text-white">{{ row.action }}</p>
                <p class="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{{ row.note }}</p>
              </td>
              <td class="px-4 py-4">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400">{{ row.points }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-surface-400 dark:text-surface-500 mt-4 text-center">100 points = $5 reward. Points never expire while your account is active.</p>
    </div>
  </section>

  <!-- Membership Tiers -->
  <section class="section">
    <div class="container-custom max-w-5xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">Membership Tiers</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="t in tiers"
          :key="t.tier"
          class="relative bg-white dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700"
        >
          <div class="h-2 bg-gradient-to-r" :class="t.color"></div>
          <div class="p-6">
            <h3 class="font-heading font-bold text-xl text-surface-900 dark:text-white mb-1">{{ t.tier }}</h3>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-6">{{ t.points }}</p>
            <ul class="space-y-3">
              <li v-for="benefit in t.benefits" :key="benefit" class="flex items-start gap-2 text-sm">
                <svg class="w-4 h-4 text-primary-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span class="text-surface-600 dark:text-surface-400">{{ benefit }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="gradient-hero py-16">
    <div class="container-custom text-center text-white">
      <h2 class="text-3xl font-heading font-bold mb-4">Start Earning Today</h2>
      <p class="text-white/80 mb-8 max-w-xl mx-auto">Create your free account and get 50 bonus points just for signing up.</p>
      <NuxtLink to="/account" class="inline-block px-8 py-4 rounded-full bg-white text-primary-600 font-heading font-bold text-lg hover:bg-primary-50 transition-colors shadow-lg">Join Bazaar Rewards</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useBazaarSEO({
  title: 'Rewards Program',
  description: 'Earn points, unlock perks, and get rewarded for shopping at Bazaar Studio with our loyalty program.',
});

const howItWorks = [
  { title: 'Sign Up', desc: 'Create your free account to automatically start earning points on every purchase.', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
  { title: 'Earn Points', desc: 'Get points for purchases, reviews, referrals, and more. Points stack up fast.', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
  { title: 'Redeem Rewards', desc: 'Use your points for discounts, free shipping, exclusive products, and VIP experiences.', icon: 'M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' },
];

const earningTable = [
  { action: 'Every $1 spent', points: '1 point', note: 'Automatically applied at checkout' },
  { action: 'Write a product review', points: '50 points', note: 'One review per product' },
  { action: 'Refer a friend', points: '200 points', note: 'When they make their first purchase' },
  { action: 'Birthday bonus', points: '100 points', note: 'Added automatically on your birthday' },
  { action: 'Sign up', points: '50 points', note: 'Welcome bonus on account creation' },
  { action: 'Follow on social media', points: '25 points each', note: 'Instagram, Twitter, Facebook' },
];

const tiers = [
  {
    tier: 'Bronze',
    points: '0 \u2013 499 points',
    color: 'from-amber-600 to-amber-700',
    benefits: ['1 point per $1 spent', 'Birthday bonus (100 pts)', 'Early access to sales', 'Free standard shipping on $99+'],
  },
  {
    tier: 'Silver',
    points: '500 \u2013 999 points',
    color: 'from-surface-400 to-surface-500',
    benefits: ['1.5x points on purchases', 'Birthday bonus (150 pts)', 'Early access to new collections', 'Free standard shipping on $75+', 'Exclusive member-only offers'],
  },
  {
    tier: 'Gold',
    points: '1,000+ points',
    color: 'from-amber-400 to-yellow-500',
    benefits: ['2x points on purchases', 'Birthday bonus (250 pts)', 'First access to drops & collabs', 'Free express shipping on all orders', 'VIP customer service line', 'Annual surprise gift'],
  },
];
</script>
