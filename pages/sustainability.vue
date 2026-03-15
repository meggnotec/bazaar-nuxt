<template>
  <HeroAlt title="Our Commitment" subtitle="Building a more sustainable future for fashion, one garment at a time" badge="Sustainability" />

  <!-- Mission Statement -->
  <section class="section">
    <div class="container-custom max-w-3xl text-center">
      <h2 class="text-3xl md:text-4xl font-heading font-bold text-surface-900 dark:text-white mb-6 leading-tight">
        Fashion should look good — and <span class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">do good.</span>
      </h2>
      <p class="text-lg text-surface-600 dark:text-surface-400">
        At Bazaar Studio, sustainability isn't a marketing buzzword — it's woven into every decision we make. From the materials we source to the way we ship, we're committed to reducing our environmental footprint while creating beautiful, lasting fashion.
      </p>
    </div>
  </section>

  <!-- Pillars -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">Our Pillars</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="pillar in pillars"
          :key="pillar.title"
          class="p-6 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700"
        >
          <div class="w-14 h-14 rounded-full flex items-center justify-center mb-4" :class="pillar.color">
            <svg class="w-7 h-7" :class="pillar.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" :d="pillar.icon" /></svg>
          </div>
          <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-2">{{ pillar.title }}</h3>
          <p class="text-sm text-surface-600 dark:text-surface-400">{{ pillar.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Bar -->
  <section class="gradient-hero py-16">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
        <div v-for="stat in stats" :key="stat.label">
          <div class="text-4xl md:text-5xl font-heading font-bold mb-2">{{ stat.number }}</div>
          <div class="text-white/80 text-sm">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Certifications -->
  <section class="section">
    <div class="container-custom max-w-4xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">Our Certifications</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="cert in certifications"
          :key="cert.name"
          class="text-center p-6 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700"
        >
          <div class="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" :style="{ backgroundColor: cert.color + '15' }">
            <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="cert.name">
              <circle cx="30" cy="30" r="28" fill="none" :stroke="cert.color" stroke-width="2" opacity="0.3" />
              <text x="30" y="34" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="700" :fill="cert.color">{{ cert.abbr }}</text>
            </svg>
          </div>
          <p class="text-sm font-semibold text-surface-900 dark:text-white">{{ cert.name }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom text-center">
      <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-4">Shop With Purpose</h2>
      <p class="text-surface-600 dark:text-surface-400 mb-8 max-w-xl mx-auto">Explore our sustainably made collection — fashion that feels as good as it looks.</p>
      <NuxtLink to="/shop" class="btn-primary">Shop Sustainable Fashion</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useBazaarSEO({
  title: 'Sustainability',
  description: "Learn about Bazaar Studio's commitment to sustainable fashion, ethical production, and environmental responsibility.",
});

const pillars = [
  {
    title: 'Sustainable Materials',
    desc: 'We use organic cotton, recycled polyester, Tencel, and responsibly sourced wool across 80% of our collection. Every material is vetted for environmental impact.',
    icon: 'M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.898 19.51l-1.22-4.876',
    color: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    title: 'Ethical Production',
    desc: 'Every factory in our supply chain is audited annually for fair wages, safe working conditions, and no child labor. We pay living wages, not just minimum wages.',
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    color: 'bg-sky-100 dark:bg-sky-900/30',
    iconColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    title: 'Carbon Neutral Shipping',
    desc: 'All shipments are carbon-offset through verified environmental projects. We partner with climate organizations to neutralize our shipping emissions.',
    icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
    color: 'bg-violet-100 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    title: 'Circular Fashion',
    desc: "Our garments are designed to last. When they reach the end of their life, our take-back program ensures they're recycled or repurposed — never landfilled.",
    icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
    color: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
];

const stats = [
  { number: '80%', label: 'Sustainable Materials' },
  { number: '0', label: 'Waste to Landfill by 2027' },
  { number: '100%', label: 'Recyclable Packaging' },
];

const certifications = [
  { name: 'B Corp Certified', abbr: 'B', color: '#1e293b' },
  { name: 'GOTS Certified', abbr: 'GOTS', color: '#16a34a' },
  { name: 'Fair Trade', abbr: 'FT', color: '#2563eb' },
  { name: 'OEKO-TEX', abbr: 'OT', color: '#7c3aed' },
];
</script>
