<template>
  <div class="space-y-5">
    <!-- Size picker -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-semibold text-surface-900 dark:text-white font-heading">Size</span>
        <button
          v-if="!isOneSize"
          type="button"
          class="text-xs text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 underline underline-offset-2 cursor-pointer"
          @click="showSizeGuide = true"
        >
          Size Guide
        </button>
      </div>
      <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Select size">
        <button
          v-for="(size, index) in sizes"
          :key="size"
          type="button"
          class="px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all duration-200 cursor-pointer"
          :class="selectedSize === size
            ? 'border-primary-500 bg-primary-500 text-white'
            : 'border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400'"
          role="radio"
          :aria-checked="selectedSize === size ? 'true' : 'false'"
          :aria-label="`Size ${size}`"
          :data-size="size"
          @click="selectSize(size)"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Color picker -->
    <div v-if="colors.length > 0">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-sm font-semibold text-surface-900 dark:text-white font-heading">Color:</span>
        <span class="text-sm text-surface-500 dark:text-surface-400">{{ selectedColorName }}</span>
      </div>
      <div class="flex flex-wrap gap-3" role="radiogroup" aria-label="Select color">
        <button
          v-for="(color, index) in colors"
          :key="color.name"
          type="button"
          class="color-swatch w-9 h-9 rounded-full border-2 transition-all duration-200 cursor-pointer relative"
          :class="selectedColorName === color.name
            ? 'border-primary-500 ring-2 ring-primary-500/30 scale-110'
            : 'border-surface-300 dark:border-surface-600 hover:scale-110'"
          :style="{ backgroundColor: color.value }"
          :data-color-name="color.name"
          :data-color-hex="color.value"
          role="radio"
          :aria-checked="selectedColorName === color.name ? 'true' : 'false'"
          :aria-label="`Color ${color.name}`"
          :title="color.name"
          @click="selectColor(color.name)"
        >
          <svg
            v-if="selectedColorName === color.name"
            class="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-md"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Size Guide Modal -->
  <Teleport to="body">
    <div v-if="showSizeGuide && !isOneSize">
      <div class="fixed inset-0 bg-black/60 z-60" @click="showSizeGuide = false" />
      <div
        class="fixed inset-0 z-60 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Size guide"
      >
        <div class="bg-white dark:bg-surface-900 rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto relative">
          <!-- Header -->
          <div class="sticky top-0 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <h3 class="font-heading text-lg font-bold text-surface-900 dark:text-white">Size Guide</h3>
              <p class="text-xs text-surface-500 dark:text-surface-400 mt-0.5">All measurements in inches</p>
            </div>
            <button
              type="button"
              class="w-9 h-9 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-500 hover:text-surface-900 dark:hover:text-white hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors cursor-pointer"
              aria-label="Close size guide"
              @click="showSizeGuide = false"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6">
            <!-- How to measure -->
            <div class="mb-6 p-4 rounded-xl bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-900">
              <h4 class="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-1.5">How to Measure</h4>
              <p class="text-xs text-primary-600 dark:text-primary-400 leading-relaxed">
                For the best fit, measure a garment you already own that fits well and compare those measurements to the chart below. When between sizes, size up for a relaxed fit or down for a slimmer fit.
              </p>
            </div>

            <!-- Letter sizes -->
            <div v-if="isLetterSize" class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b-2 border-surface-200 dark:border-surface-700">
                    <th class="text-start py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">Size</th>
                    <th class="text-center py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">Chest</th>
                    <th class="text-center py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">Waist</th>
                    <th class="text-center py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">Hips</th>
                  </tr>
                </thead>
                <tbody class="text-surface-600 dark:text-surface-400">
                  <tr v-for="(row, i) in letterSizeData" :key="row.size" :class="['border-b border-surface-100 dark:border-surface-800', i % 2 === 1 ? 'bg-surface-50 dark:bg-surface-800/50' : '']">
                    <td class="py-2.5 px-3 font-semibold text-surface-900 dark:text-white">{{ row.size }}</td>
                    <td class="py-2.5 px-3 text-center">{{ row.chest }}</td>
                    <td class="py-2.5 px-3 text-center">{{ row.waist }}</td>
                    <td class="py-2.5 px-3 text-center">{{ row.hips }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Waist sizes -->
            <div v-if="isWaistSize" class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b-2 border-surface-200 dark:border-surface-700">
                    <th class="text-start py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">Size</th>
                    <th class="text-center py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">Waist</th>
                    <th class="text-center py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">Hips</th>
                    <th class="text-center py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">Inseam</th>
                  </tr>
                </thead>
                <tbody class="text-surface-600 dark:text-surface-400">
                  <tr v-for="(sz, i) in waistSizes" :key="sz" :class="['border-b border-surface-100 dark:border-surface-800', i % 2 === 1 ? 'bg-surface-50 dark:bg-surface-800/50' : '']">
                    <td class="py-2.5 px-3 font-semibold text-surface-900 dark:text-white">{{ sz }}</td>
                    <td class="py-2.5 px-3 text-center">{{ sz }}</td>
                    <td class="py-2.5 px-3 text-center">{{ Number(sz) + 10 }}</td>
                    <td class="py-2.5 px-3 text-center">30</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Shoe sizes -->
            <div v-if="isShoeSize" class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b-2 border-surface-200 dark:border-surface-700">
                    <th class="text-start py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">US</th>
                    <th class="text-center py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">EU</th>
                    <th class="text-center py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">UK</th>
                    <th class="text-center py-3 px-3 font-heading font-semibold text-surface-900 dark:text-white">Foot Length</th>
                  </tr>
                </thead>
                <tbody class="text-surface-600 dark:text-surface-400">
                  <tr v-for="(row, i) in shoeSizeData" :key="row.us" :class="['border-b border-surface-100 dark:border-surface-800', i % 2 === 1 ? 'bg-surface-50 dark:bg-surface-800/50' : '']">
                    <td class="py-2.5 px-3 font-semibold text-surface-900 dark:text-white">{{ row.us }}</td>
                    <td class="py-2.5 px-3 text-center">{{ row.eu }}</td>
                    <td class="py-2.5 px-3 text-center">{{ row.uk }}</td>
                    <td class="py-2.5 px-3 text-center">{{ row.cm }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Fit tip -->
            <div class="mt-6 flex items-start gap-3 text-xs text-surface-500 dark:text-surface-400">
              <svg class="w-4 h-4 mt-0.5 shrink-0 text-surface-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <p>Model is 5'10" / 178cm, wearing size S. Need help? <NuxtLink to="/contact" class="text-primary-500 hover:underline">Contact us</NuxtLink> for personalized sizing advice.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface ColorOption {
  name: string;
  value: string;
}

const props = defineProps<{
  sizes: string[];
  colors: ColorOption[];
}>();

const emit = defineEmits<{
  'update:size': [size: string];
  'update:color': [color: string];
}>();

const selectedSize = ref(props.sizes[0] || '');
const selectedColorName = ref(props.colors[0]?.name || '');
const showSizeGuide = ref(false);

const firstSize = computed(() => props.sizes[0] || '');
const isShoeSize = computed(() => /^\d+$/.test(firstSize.value) && Number(firstSize.value) >= 4 && Number(firstSize.value) <= 15);
const isWaistSize = computed(() => /^\d+$/.test(firstSize.value) && Number(firstSize.value) >= 23 && Number(firstSize.value) <= 40);
const isOneSize = computed(() => firstSize.value === 'One Size');
const isLetterSize = computed(() => !isShoeSize.value && !isWaistSize.value && !isOneSize.value);

const letterSizeData = [
  { size: 'XS', chest: '30-32', waist: '24-26', hips: '33-35' },
  { size: 'S', chest: '33-35', waist: '27-29', hips: '36-38' },
  { size: 'M', chest: '36-38', waist: '30-32', hips: '39-41' },
  { size: 'L', chest: '39-41', waist: '33-35', hips: '42-44' },
  { size: 'XL', chest: '42-44', waist: '36-38', hips: '45-47' },
  { size: 'XXL', chest: '45-47', waist: '39-41', hips: '48-50' },
];

const waistSizes = ['24', '25', '26', '27', '28', '29', '30', '31', '32', '34', '36', '38'];

const shoeSizeData = [
  { us: '6', eu: '39', uk: '5.5', cm: '9.3"' },
  { us: '7', eu: '40', uk: '6.5', cm: '9.6"' },
  { us: '8', eu: '41', uk: '7.5', cm: '9.9"' },
  { us: '9', eu: '42', uk: '8.5', cm: '10.2"' },
  { us: '10', eu: '43', uk: '9.5', cm: '10.6"' },
  { us: '11', eu: '44', uk: '10.5', cm: '10.9"' },
  { us: '12', eu: '45', uk: '11.5', cm: '11.2"' },
];

function selectSize(size: string) {
  selectedSize.value = size;
  emit('update:size', size);
}

function selectColor(name: string) {
  selectedColorName.value = name;
  emit('update:color', name);
}

// Close modal on Escape
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && showSizeGuide.value) {
      showSizeGuide.value = false;
    }
  };
  document.addEventListener('keydown', handler);
  onUnmounted(() => document.removeEventListener('keydown', handler));
});
</script>
