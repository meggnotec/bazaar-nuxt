<template>
  <div>
    <HeroAlt title="Join Our Team" subtitle="Help us shape the future of fashion" badge="Careers" />

    <!-- Culture Section -->
    <section class="section">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white mb-6">Life at Bazaar</h2>
            <p class="text-lg text-surface-600 dark:text-surface-400 mb-4">
              At Bazaar Studio, we believe great products come from great teams. We're a diverse group of creators, strategists, and fashion enthusiasts united by a shared passion for making style accessible to everyone.
            </p>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              We foster a culture of creativity, collaboration, and continuous learning. Whether you're coding our platform, designing the next collection, or helping customers in one of our stores, your work directly shapes how people express themselves through fashion.
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              We value diverse perspectives and encourage every team member to bring their authentic self to work. Innovation thrives when different viewpoints come together.
            </p>
          </div>
          <div class="aspect-[4/3] rounded-2xl overflow-hidden">
            <Placeholder :width="800" :height="600" label="Team Culture" bg-color="#c4b5fd" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Perks -->
    <section class="section bg-surface-50 dark:bg-surface-900">
      <div class="container-custom">
        <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">Why Work With Us</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(perk, i) in careers.perks"
            :key="perk.title"
            class="text-center p-6 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700"
          >
            <div
              class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              :class="perkColors[i]"
            >
              <svg
                class="w-7 h-7"
                :class="perkIconColors[i]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" :d="perkIcons[i]" />
              </svg>
            </div>
            <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-2">{{ perk.title }}</h3>
            <p class="text-sm text-surface-600 dark:text-surface-400">{{ perk.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Open Positions -->
    <section class="section">
      <div class="container-custom max-w-3xl">
        <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">Open Positions</h2>
        <div class="space-y-4">
          <div
            v-for="pos in careers.positions"
            :key="pos.title"
            class="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700 hover:shadow-md transition-shadow"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 class="font-heading font-bold text-lg text-surface-900 dark:text-white">{{ pos.title }}</h3>
                <div class="flex flex-wrap items-center gap-2 mt-2">
                  <span class="px-2 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">{{ pos.department }}</span>
                  <span class="text-xs text-surface-500 dark:text-surface-400">{{ pos.location }}</span>
                  <span class="text-xs text-surface-400">&middot;</span>
                  <span class="text-xs text-surface-500 dark:text-surface-400">{{ pos.type }}</span>
                </div>
                <p class="text-sm text-surface-600 dark:text-surface-400 mt-3">{{ pos.description }}</p>
              </div>
              <div class="shrink-0">
                <NuxtLink to="/contact" class="btn-primary text-sm px-5 py-2.5 whitespace-nowrap">Apply Now</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- General Application CTA -->
    <section class="section bg-surface-50 dark:bg-surface-900">
      <div class="container-custom text-center">
        <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-4">Don't See the Right Fit?</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-8 max-w-xl mx-auto">We're always looking for talented people. Send us your resume and we'll keep you in mind for future openings.</p>
        <NuxtLink to="/contact" class="btn-primary">Send Your Resume</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import careers from '~/app/data/careers.json';

useBazaarSEO({
  title: 'Careers',
  description: 'Join the Bazaar Studio team. Explore open positions in engineering, design, marketing, and retail.',
});

const perkIcons = [
  'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
  'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z',
  'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
];

const perkColors = [
  'bg-primary-100 dark:bg-primary-900/30',
  'bg-red-100 dark:bg-red-900/30',
  'bg-accent-100 dark:bg-accent-900/30',
  'bg-secondary-100 dark:bg-secondary-900/30',
];

const perkIconColors = [
  'text-primary-600 dark:text-primary-400',
  'text-red-600 dark:text-red-400',
  'text-accent-600 dark:text-accent-400',
  'text-secondary-600 dark:text-secondary-400',
];
</script>
