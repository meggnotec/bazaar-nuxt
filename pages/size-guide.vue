<template>
  <HeroAlt title="Size Guide" subtitle="Find your perfect fit with our detailed sizing charts" badge="Fit Guide" />

  <!-- Tab Buttons -->
  <section class="section pb-0">
    <div class="container-custom">
      <div class="flex justify-center gap-2 mb-8">
        <button
          v-for="(tab, i) in sizeGuide.tabs"
          :key="tab.id"
          class="px-6 py-3 rounded-full font-heading font-semibold text-sm transition-all duration-200"
          :class="activeTab === tab.id
            ? 'bg-primary-600 text-white shadow-md'
            : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
  </section>

  <!-- Size Tables -->
  <section class="section pt-0">
    <div class="container-custom">
      <div v-for="tab in sizeGuide.tabs" :key="tab.id" :class="{ hidden: activeTab !== tab.id }">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-start">
            <thead>
              <tr class="border-b-2 border-primary-200 dark:border-primary-800">
                <th v-for="col in tab.columns" :key="col" class="px-4 py-3 font-heading font-bold text-surface-900 dark:text-white whitespace-nowrap">{{ col }}</th>
              </tr>
            </thead>
            <tbody v-if="tab.id === 'shoes'">
              <tr
                v-for="(row, j) in (tab.measurements as any[])"
                :key="j"
                :class="[j % 2 === 0 ? 'bg-surface-50 dark:bg-surface-800/50' : '', 'border-b border-surface-200 dark:border-surface-700']"
              >
                <td class="px-4 py-3 font-semibold text-surface-900 dark:text-white">{{ row.us_w }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.us_m }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.uk }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.eu }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.cm }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr
                v-for="(row, j) in (tab.measurements as any[])"
                :key="j"
                :class="[j % 2 === 0 ? 'bg-surface-50 dark:bg-surface-800/50' : '', 'border-b border-surface-200 dark:border-surface-700']"
              >
                <td class="px-4 py-3 font-semibold text-surface-900 dark:text-white">{{ row.size }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.us }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.uk }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.eu }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ tab.id === 'men' ? row.chest : row.bust }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ tab.id === 'men' ? row.chestCm : row.bustCm }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.waist }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.waistCm }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.hip }}</td>
                <td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ row.hipCm }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <!-- How to Measure -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">How to Measure</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div class="flex justify-center items-center">
          <svg width="240" height="400" viewBox="0 0 240 400" xmlns="http://www.w3.org/2000/svg" class="text-primary-300 dark:text-primary-700" role="img" aria-label="Body measurement illustration">
            <circle cx="120" cy="40" r="25" fill="none" stroke="currentColor" stroke-width="2" />
            <line x1="120" y1="65" x2="120" y2="220" stroke="currentColor" stroke-width="2" />
            <line x1="120" y1="90" x2="60" y2="160" stroke="currentColor" stroke-width="2" />
            <line x1="120" y1="90" x2="180" y2="160" stroke="currentColor" stroke-width="2" />
            <line x1="120" y1="220" x2="80" y2="370" stroke="currentColor" stroke-width="2" />
            <line x1="120" y1="220" x2="160" y2="370" stroke="currentColor" stroke-width="2" />
            <line x1="70" y1="120" x2="170" y2="120" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="180" y="120" fill="#e11d48" font-size="11" font-family="system-ui">Bust/Chest</text>
            <line x1="85" y1="175" x2="155" y2="175" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="165" y="175" fill="#7c3aed" font-size="11" font-family="system-ui">Waist</text>
            <line x1="75" y1="230" x2="165" y2="230" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="175" y="230" fill="#f59e0b" font-size="11" font-family="system-ui">Hips</text>
          </svg>
        </div>
        <div class="space-y-6">
          <div v-for="item in sizeGuide.howToMeasure" :key="item.area">
            <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-1">{{ item.area }}</h3>
            <p class="text-sm text-surface-600 dark:text-surface-400">{{ item.instruction }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Tips -->
  <section class="section">
    <div class="container-custom max-w-3xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-8">Sizing Tips</h2>
      <ul class="space-y-4">
        <li v-for="tip in sizeGuide.tips" :key="tip" class="flex items-start gap-3">
          <svg class="w-5 h-5 text-primary-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-surface-600 dark:text-surface-400">{{ tip }}</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- CTA -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom text-center">
      <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-4">Still Not Sure About Your Size?</h2>
      <p class="text-surface-600 dark:text-surface-400 mb-8 max-w-xl mx-auto">Our team is happy to help you find the perfect fit. Reach out anytime.</p>
      <NuxtLink to="/contact" class="btn-primary">Contact Us</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import sizeGuide from '~/app/data/size-guide.json';

useBazaarSEO({
  title: 'Size Guide',
  description: "Find your perfect fit with our detailed sizing charts for women's, men's, and shoe sizes.",
});

const activeTab = ref(sizeGuide.tabs[0]?.id ?? 'women');
</script>
