<template>
  <div>
    <HeroAlt title="Our Story" subtitle="Fashion with purpose, style with soul" badge="About Bazaar" />

    <!-- Brand Story -->
    <section class="section">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white mb-6">Redefining Modern Fashion</h2>
            <p class="text-lg text-surface-600 dark:text-surface-400 mb-4">
              Bazaar Studio was born from a simple belief: everyone deserves access to beautifully crafted fashion that doesn't compromise on quality or ethics. Founded in 2020, we've grown from a small curated collection to a full lifestyle brand trusted by thousands.
            </p>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              Every piece in our collection is designed with intention — from the materials we source to the artisans we partner with. We believe fashion should be an expression of who you are, not just what you wear.
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              Our team of designers, stylists, and curators work tirelessly to bring you collections that bridge the gap between timeless elegance and contemporary trends.
            </p>
          </div>
          <div class="aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src="/images/about/brand-story.jpg"
              alt="Bazaar Studio brand story"
              width="800"
              height="600"
              loading="lazy"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section bg-surface-50 dark:bg-surface-900">
      <div class="container-custom">
        <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">Our Values</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="value in values" :key="value.title" class="text-center p-6">
            <div class="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4 text-2xl">
              {{ value.icon }}
            </div>
            <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-2">{{ value.title }}</h3>
            <p class="text-sm text-surface-600 dark:text-surface-400">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="gradient-hero py-16">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div v-for="stat in stats" :key="stat.label">
            <div class="text-4xl md:text-5xl font-heading font-bold mb-2">{{ stat.number }}</div>
            <div class="text-white/80 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section">
      <div class="container-custom">
        <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">Meet the Team</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TeamCard
            v-for="member in team"
            :key="member.name"
            :name="member.name"
            :role="member.role"
            :bio="member.bio"
            :initials="member.initials"
            :image="member.image"
          />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-surface-50 dark:bg-surface-900">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white mb-4">Ready to Discover Your Style?</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-8 max-w-xl mx-auto">Explore our latest collections and find pieces that tell your story.</p>
        <NuxtLink to="/shop" class="btn-primary">Shop Now</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import team from '~/app/data/team.json';

useBazaarSEO({
  title: 'About Us',
  description: 'Learn about Bazaar Studio — our story, values, and the team behind the brand.',
});

const values = [
  { icon: '\u{1F33F}', title: 'Sustainable', desc: 'Eco-friendly materials and responsible production processes throughout our supply chain.' },
  { icon: '\u{1F91D}', title: 'Ethical', desc: 'Fair wages, safe working conditions, and transparent partnerships with every manufacturer.' },
  { icon: '\u2728', title: 'Quality', desc: 'Premium fabrics and meticulous craftsmanship that ensures every piece lasts for years.' },
  { icon: '\u{1F30D}', title: 'Community', desc: 'Building a global community of style-conscious individuals who care about impact.' },
];

const stats = [
  { number: '10K+', label: 'Happy Customers' },
  { number: '50+', label: 'Countries' },
  { number: '100%', label: 'Sustainable' },
  { number: '500+', label: 'Products' },
];
</script>
