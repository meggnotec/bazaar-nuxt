<template>
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom">
      <!-- Section header -->
      <div class="text-center mb-12">
        <span class="badge-primary mb-4 inline-block">Testimonials</span>
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-surface-900 dark:text-white mb-4">
          What Our Customers Say
        </h2>
        <p class="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto text-base md:text-lg">
          Real stories from real people. See why thousands trust Bazaar Studio for their wardrobe essentials.
        </p>
      </div>

      <!-- Testimonial grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="(testimonial, index) in displayTestimonials" :key="index" class="card p-6 flex flex-col">
          <!-- Stars -->
          <div class="mb-4">
            <StarRating :rating="testimonial.rating" />
          </div>
          <!-- Quote -->
          <blockquote class="flex-1 mb-6">
            <p class="text-surface-700 dark:text-surface-300 text-sm leading-relaxed">
              "{{ testimonial.quote }}"
            </p>
          </blockquote>
          <!-- Author info -->
          <div class="flex items-center gap-3 pt-4 border-t border-surface-200 dark:border-surface-700">
            <!-- Avatar -->
            <img
              v-if="testimonial.image"
              :src="testimonial.image"
              :alt="testimonial.name"
              width="40"
              height="40"
              loading="lazy"
              class="flex-shrink-0 w-10 h-10 rounded-full object-cover"
            />
            <div
              v-else
              :class="['flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center', avatarColors[index % avatarColors.length]]"
            >
              <span class="text-white font-heading font-semibold text-sm">{{ testimonial.initials }}</span>
            </div>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-surface-900 dark:text-white truncate">{{ testimonial.name }}</p>
              <p class="text-xs text-surface-500 dark:text-surface-400 truncate">{{ testimonial.location }}</p>
            </div>
          </div>
          <!-- Product purchased -->
          <div class="mt-3">
            <span class="text-xs text-surface-400 dark:text-surface-500">
              Purchased: <span class="text-primary-500 dark:text-primary-400 font-medium">{{ testimonial.productPurchased }}</span>
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import testimonials from '~/app/data/testimonials.json';

const displayTestimonials = testimonials.slice(0, 6);

const avatarColors = [
  'from-stone-500 to-stone-700',
  'from-amber-600 to-stone-700',
  'from-stone-600 to-amber-700',
  'from-amber-700 to-stone-800',
  'from-stone-500 to-amber-600',
  'from-stone-700 to-stone-900',
];
</script>
