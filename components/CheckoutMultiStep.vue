<template>
  <div>
    <!-- Step Indicator -->
    <div class="flex items-center justify-center gap-4 mb-8">
      <template v-for="(step, index) in steps" :key="step.number">
        <button
          type="button"
          class="flex items-center gap-2"
          :class="step.number < currentStep ? 'cursor-pointer' : ''"
          :disabled="step.number >= currentStep"
          @click="step.number < currentStep && goToStep(step.number)"
        >
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors',
              step.number < currentStep
                ? 'bg-emerald-500 text-white'
                : step.number === currentStep
                  ? 'gradient-cta text-white'
                  : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400',
            ]"
          >
            <svg v-if="step.number < currentStep" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span v-else>{{ step.number }}</span>
          </div>
          <span
            :class="[
              'text-sm font-medium hidden sm:inline',
              step.number <= currentStep
                ? 'text-surface-900 dark:text-white'
                : 'text-surface-400 dark:text-surface-500',
            ]"
          >
            {{ step.label }}
          </span>
        </button>
        <div
          v-if="index < steps.length - 1"
          :class="[
            'w-12 h-0.5 rounded',
            step.number < currentStep
              ? 'bg-emerald-500'
              : 'bg-surface-200 dark:bg-surface-700',
          ]"
        />
      </template>
    </div>

    <!-- Step 1: Shipping -->
    <div v-if="currentStep === 1">
      <h2 class="text-xl font-heading font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
        <span class="w-7 h-7 rounded-full gradient-cta text-white text-sm flex items-center justify-center font-bold">1</span>
        Shipping Information
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="ms-ship-first" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">First Name <span class="text-red-500">*</span></label>
          <input type="text" id="ms-ship-first" v-model="ship.firstName" :class="['input', errors.shipFirstName && 'border-red-500 ring-2 ring-red-500/20']" required />
        </div>
        <div>
          <label for="ms-ship-last" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Last Name <span class="text-red-500">*</span></label>
          <input type="text" id="ms-ship-last" v-model="ship.lastName" :class="['input', errors.shipLastName && 'border-red-500 ring-2 ring-red-500/20']" required />
        </div>
        <div class="sm:col-span-2">
          <label for="ms-ship-email" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Email <span class="text-red-500">*</span></label>
          <input type="email" id="ms-ship-email" v-model="ship.email" :class="['input', errors.shipEmail && 'border-red-500 ring-2 ring-red-500/20']" required />
        </div>
        <div class="sm:col-span-2">
          <label for="ms-ship-phone" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Phone</label>
          <input type="tel" id="ms-ship-phone" v-model="ship.phone" class="input" />
        </div>
        <div class="sm:col-span-2">
          <label for="ms-ship-address" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Address <span class="text-red-500">*</span></label>
          <input type="text" id="ms-ship-address" v-model="ship.address" :class="['input', errors.shipAddress && 'border-red-500 ring-2 ring-red-500/20']" required />
        </div>
        <div class="sm:col-span-2">
          <label for="ms-ship-address2" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Apartment, suite, etc. <span class="text-surface-400">(optional)</span></label>
          <input type="text" id="ms-ship-address2" v-model="ship.address2" class="input" />
        </div>
        <div>
          <label for="ms-ship-city" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">City <span class="text-red-500">*</span></label>
          <input type="text" id="ms-ship-city" v-model="ship.city" :class="['input', errors.shipCity && 'border-red-500 ring-2 ring-red-500/20']" required />
        </div>
        <div>
          <label for="ms-ship-state" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">State / Province <span class="text-red-500">*</span></label>
          <input type="text" id="ms-ship-state" v-model="ship.state" :class="['input', errors.shipState && 'border-red-500 ring-2 ring-red-500/20']" required />
        </div>
        <div>
          <label for="ms-ship-zip" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">ZIP / Postal Code <span class="text-red-500">*</span></label>
          <input type="text" id="ms-ship-zip" v-model="ship.zip" :class="['input', errors.shipZip && 'border-red-500 ring-2 ring-red-500/20']" required />
        </div>
        <div>
          <label for="ms-ship-country" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Country</label>
          <select id="ms-ship-country" v-model="ship.country" class="input">
            <option v-for="c in countries" :key="c.code" :value="c.code">{{ c.name }}</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button type="button" class="btn-primary py-3 px-8" @click="goToStep2">
          Continue to Billing
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </button>
      </div>
    </div>

    <!-- Step 2: Billing -->
    <div v-if="currentStep === 2">
      <h2 class="text-xl font-heading font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
        <span class="w-7 h-7 rounded-full gradient-cta text-white text-sm flex items-center justify-center font-bold">2</span>
        Billing Information
      </h2>
      <label class="flex items-center gap-2.5 cursor-pointer mb-4">
        <input type="checkbox" v-model="billingSame" class="h-4 w-4 rounded border-surface-300 dark:border-surface-600 text-primary-500 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer" />
        <span class="text-sm text-surface-700 dark:text-surface-300">Same as shipping address</span>
      </label>
      <div v-if="!billingSame" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="ms-bill-first" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">First Name</label>
          <input type="text" id="ms-bill-first" v-model="bill.firstName" class="input" />
        </div>
        <div>
          <label for="ms-bill-last" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Last Name</label>
          <input type="text" id="ms-bill-last" v-model="bill.lastName" class="input" />
        </div>
        <div class="sm:col-span-2">
          <label for="ms-bill-address" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Address</label>
          <input type="text" id="ms-bill-address" v-model="bill.address" class="input" />
        </div>
        <div class="sm:col-span-2">
          <label for="ms-bill-address2" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Apartment, suite, etc. <span class="text-surface-400">(optional)</span></label>
          <input type="text" id="ms-bill-address2" v-model="bill.address2" class="input" />
        </div>
        <div>
          <label for="ms-bill-city" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">City</label>
          <input type="text" id="ms-bill-city" v-model="bill.city" class="input" />
        </div>
        <div>
          <label for="ms-bill-state" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">State / Province</label>
          <input type="text" id="ms-bill-state" v-model="bill.state" class="input" />
        </div>
        <div>
          <label for="ms-bill-zip" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">ZIP / Postal Code</label>
          <input type="text" id="ms-bill-zip" v-model="bill.zip" class="input" />
        </div>
        <div>
          <label for="ms-bill-country" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Country</label>
          <select id="ms-bill-country" v-model="bill.country" class="input">
            <option v-for="c in countries" :key="c.code" :value="c.code">{{ c.name }}</option>
          </select>
        </div>
      </div>
      <div class="flex justify-between mt-6">
        <button type="button" class="btn-outline py-3 px-6" @click="goToStep(1)">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Back
        </button>
        <button type="button" class="btn-primary py-3 px-8" @click="goToStep(3)">
          Continue to Review
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </button>
      </div>
    </div>

    <!-- Step 3: Review & Place Order -->
    <div v-if="currentStep === 3">
      <h2 class="text-xl font-heading font-bold text-surface-900 dark:text-white mb-6 flex items-center gap-2">
        <span class="w-7 h-7 rounded-full gradient-cta text-white text-sm flex items-center justify-center font-bold">3</span>
        Review Your Order
      </h2>

      <!-- Shipping Summary -->
      <div class="rounded-xl border border-surface-200 dark:border-surface-700 p-4 mb-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-heading font-semibold text-surface-900 dark:text-white">Shipping Address</h3>
          <button type="button" class="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline cursor-pointer" @click="goToStep(1)">Edit</button>
        </div>
        <div class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed" v-html="shippingAddressHtml" />
      </div>

      <!-- Billing Summary -->
      <div class="rounded-xl border border-surface-200 dark:border-surface-700 p-4 mb-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-heading font-semibold text-surface-900 dark:text-white">Billing Address</h3>
          <button type="button" class="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline cursor-pointer" @click="goToStep(2)">Edit</button>
        </div>
        <div class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed" v-html="billingAddressHtml" />
      </div>

      <!-- Payment -->
      <div class="rounded-xl border border-surface-200 dark:border-surface-700 p-4 mb-4">
        <h3 class="text-sm font-heading font-semibold text-surface-900 dark:text-white mb-3">Payment Method</h3>
        <div class="space-y-4">
          <div>
            <label for="ms-card-name" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Name on Card</label>
            <input type="text" id="ms-card-name" v-model="payment.cardName" class="input" placeholder="John Doe" />
          </div>
          <div>
            <label for="ms-card-number" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Card Number</label>
            <input type="text" id="ms-card-number" v-model="payment.cardNumber" class="input" placeholder="1234 5678 9012 3456" maxlength="19" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="ms-card-expiry" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Expiry Date</label>
              <input type="text" id="ms-card-expiry" v-model="payment.expiry" class="input" placeholder="MM / YY" maxlength="7" />
            </div>
            <div>
              <label for="ms-card-cvv" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">CVV</label>
              <input type="text" id="ms-card-cvv" v-model="payment.cvv" class="input" placeholder="123" maxlength="4" />
            </div>
          </div>
          <p class="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            This is a demo. No real payment will be processed.
          </p>
        </div>
      </div>

      <!-- Order Items -->
      <div class="rounded-xl border border-surface-200 dark:border-surface-700 p-4 mb-4">
        <h3 class="text-sm font-heading font-semibold text-surface-900 dark:text-white mb-3">Order Items</h3>
        <div v-if="cartItems.length === 0" class="text-surface-400 dark:text-surface-500 text-sm">
          No items in cart. <NuxtLink to="/shop" class="text-primary-500 hover:underline">Shop now</NuxtLink>
        </div>
        <div v-else class="space-y-3">
          <div v-for="item in cartItems" :key="`${item.id}-${item.size}-${item.color}`" class="flex gap-3 items-center">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              width="48"
              height="60"
              class="w-12 h-15 rounded-lg flex-shrink-0 object-cover"
            />
            <div
              v-else
              class="w-12 h-15 rounded-lg flex-shrink-0 flex items-center justify-center text-white/70 text-[10px]"
              :style="{ backgroundColor: item.placeholderColor || '#c4a882' }"
            >
              {{ item.title.substring(0, 3) }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-surface-900 dark:text-white truncate">{{ item.title }}</p>
              <p class="text-xs text-surface-500 dark:text-surface-400">
                {{ item.size }}{{ item.size && item.color ? ' / ' : '' }}{{ item.color }} &times; {{ item.quantity }}
              </p>
            </div>
            <span class="text-sm font-semibold text-surface-900 dark:text-white whitespace-nowrap">
              ${{ ((item.salePrice || item.price) * item.quantity).toFixed(2) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Order Totals -->
      <div class="rounded-xl bg-surface-50 dark:bg-surface-800 p-4 mb-6">
        <div class="space-y-2 text-sm">
          <div class="flex justify-between text-surface-600 dark:text-surface-400">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-surface-600 dark:text-surface-400">
            <span>Shipping</span>
            <span>{{ subtotal >= 99 ? 'Free' : '$9.95' }}</span>
          </div>
          <div class="flex justify-between text-surface-600 dark:text-surface-400">
            <span>Tax (estimated)</span>
            <span>${{ tax.toFixed(2) }}</span>
          </div>
          <hr class="border-surface-200 dark:border-surface-700" />
          <div class="flex justify-between text-lg font-heading font-bold text-surface-900 dark:text-white">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-between">
        <button type="button" class="btn-outline py-3 px-6" @click="goToStep(2)">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Back
        </button>
        <button type="button" class="btn-primary py-3 px-8 text-lg" @click="placeOrder">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
          Place Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types';

const cartStore = useCartStore();

const steps = [
  { number: 1, label: 'Shipping' },
  { number: 2, label: 'Billing' },
  { number: 3, label: 'Review' },
];

const currentStep = ref(1);
const billingSame = ref(true);

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CN', name: 'China' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NO', name: 'Norway' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'QA', name: 'Qatar' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'KR', name: 'South Korea' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TR', name: 'Turkey' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'VN', name: 'Vietnam' },
];

const countryMap = Object.fromEntries(countries.map((c) => [c.code, c.name]));

const ship = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
});

const bill = reactive({
  firstName: '',
  lastName: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
});

const payment = reactive({
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
});

const errors = reactive({
  shipFirstName: false,
  shipLastName: false,
  shipEmail: false,
  shipAddress: false,
  shipCity: false,
  shipState: false,
  shipZip: false,
});

const cartItems = ref<CartItem[]>([]);

onMounted(() => {
  cartStore.hydrate();
  cartItems.value = cartStore.items;
});

// Keep cartItems synced
watch(() => cartStore.items, (items) => {
  cartItems.value = items;
}, { deep: true });

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0)
);
const shippingCost = computed(() => subtotal.value >= 99 ? 0 : 9.95);
const tax = computed(() => subtotal.value * 0.08);
const total = computed(() => subtotal.value + shippingCost.value + tax.value);

function formatAddress(
  first: string, last: string, address: string, address2: string,
  city: string, state: string, zip: string, countryCode: string
): string {
  const name = `${first} ${last}`.trim();
  const line2 = address2 ? `${address2}<br>` : '';
  const country = countryMap[countryCode] || countryCode;
  return `${name}<br>${address}<br>${line2}${city}, ${state} ${zip}<br>${country}`;
}

const shippingAddressHtml = computed(() => {
  const emailLine = ship.email ? `<br>${ship.email}` : '';
  const phoneLine = ship.phone ? `<br>${ship.phone}` : '';
  return formatAddress(
    ship.firstName, ship.lastName, ship.address, ship.address2,
    ship.city, ship.state, ship.zip, ship.country
  ) + emailLine + phoneLine;
});

const billingAddressHtml = computed(() => {
  if (billingSame.value) {
    return '<span class="italic text-surface-400 dark:text-surface-500">Same as shipping address</span>';
  }
  return formatAddress(
    bill.firstName, bill.lastName, bill.address, bill.address2,
    bill.city, bill.state, bill.zip, bill.country
  );
});

function validateShipping(): boolean {
  let valid = true;
  errors.shipFirstName = !ship.firstName.trim();
  errors.shipLastName = !ship.lastName.trim();
  errors.shipEmail = !ship.email.trim() || !ship.email.includes('@');
  errors.shipAddress = !ship.address.trim();
  errors.shipCity = !ship.city.trim();
  errors.shipState = !ship.state.trim();
  errors.shipZip = !ship.zip.trim();

  if (errors.shipFirstName || errors.shipLastName || errors.shipEmail || errors.shipAddress || errors.shipCity || errors.shipState || errors.shipZip) {
    valid = false;
  }
  return valid;
}

function goToStep(step: number) {
  currentStep.value = step;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToStep2() {
  if (validateShipping()) {
    goToStep(2);
  }
}

function placeOrder() {
  alert('This is a demo checkout. In production, connect Stripe or Snipcart for real payment processing.');
}
</script>
