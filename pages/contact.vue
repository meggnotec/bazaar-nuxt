<template>
  <div>
    <HeroAlt title="Get in Touch" subtitle="We'd love to hear from you" />

    <section class="section">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Contact form -->
          <div class="lg:col-span-2">
            <form class="space-y-6" novalidate @submit.prevent="handleSubmit">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="contact-name" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Name</label>
                  <input type="text" id="contact-name" class="input" required />
                </div>
                <div>
                  <label for="contact-email" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Email</label>
                  <input type="email" id="contact-email" class="input" required />
                </div>
              </div>
              <div>
                <label for="contact-subject" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Subject</label>
                <select id="contact-subject" class="input">
                  <option value="">Select a topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="return">Returns &amp; Exchanges</option>
                  <option value="product">Product Question</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label for="contact-message" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Message</label>
                <textarea id="contact-message" rows="6" class="input resize-none" required></textarea>
              </div>
              <button type="submit" class="btn-primary">Send Message</button>
            </form>
          </div>

          <!-- Info cards -->
          <div class="space-y-4">
            <div
              v-for="info in infoCards"
              :key="info.title"
              class="rounded-xl bg-surface-50 dark:bg-surface-800 p-5 flex items-start gap-4"
            >
              <div class="w-10 h-10 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="info.icon" />
                </svg>
              </div>
              <div>
                <h3 class="font-heading font-semibold text-surface-900 dark:text-white text-sm">{{ info.title }}</h3>
                <p class="text-sm text-surface-600 dark:text-surface-400">{{ info.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import siteConfig from '~/app/data/site-config.json';

useBazaarSEO({
  title: 'Contact Us',
  description: 'Get in touch with the Bazaar Studio team.',
});

const infoCards = [
  {
    icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    title: 'Email',
    value: siteConfig.email,
  },
  {
    icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z',
    title: 'Phone',
    value: siteConfig.phone,
  },
  {
    icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
    title: 'Address',
    value: siteConfig.address,
  },
  {
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Hours',
    value: 'Mon\u2013Fri: 9am\u20136pm EST',
  },
];

function handleSubmit() {
  alert('Thank you for your message! This is a demo.');
}
</script>
