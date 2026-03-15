<template>
  <form class="space-y-8" novalidate @submit.prevent="handleSubmit">
    <!-- Shipping -->
    <section>
      <h2 class="text-xl font-heading font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
        <span class="w-7 h-7 rounded-full gradient-cta text-white text-sm flex items-center justify-center font-bold">1</span>
        Shipping Information
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="ship-first-name" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">First Name</label>
          <input type="text" id="ship-first-name" v-model="shipping.firstName" class="input" required />
        </div>
        <div>
          <label for="ship-last-name" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Last Name</label>
          <input type="text" id="ship-last-name" v-model="shipping.lastName" class="input" required />
        </div>
        <div class="sm:col-span-2">
          <label for="ship-email" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Email</label>
          <input type="email" id="ship-email" v-model="shipping.email" class="input" required />
        </div>
        <div class="sm:col-span-2">
          <label for="ship-phone" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Phone</label>
          <input type="tel" id="ship-phone" v-model="shipping.phone" class="input" />
        </div>
        <div class="sm:col-span-2">
          <label for="ship-address" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Address</label>
          <input type="text" id="ship-address" v-model="shipping.address" class="input" required />
        </div>
        <div class="sm:col-span-2">
          <label for="ship-address2" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Apartment, suite, etc. <span class="text-surface-400">(optional)</span></label>
          <input type="text" id="ship-address2" v-model="shipping.address2" class="input" />
        </div>
        <div>
          <label for="ship-city" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">City</label>
          <input type="text" id="ship-city" v-model="shipping.city" class="input" required />
        </div>
        <div>
          <label for="ship-state" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">State / Province</label>
          <input type="text" id="ship-state" v-model="shipping.state" class="input" required />
        </div>
        <div>
          <label for="ship-zip" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">ZIP / Postal Code</label>
          <input type="text" id="ship-zip" v-model="shipping.zip" class="input" required />
        </div>
        <div>
          <label for="ship-country" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Country</label>
          <select id="ship-country" v-model="shipping.country" class="input">
            <option v-for="c in countries" :key="c.code" :value="c.code" :selected="c.code === 'US'">{{ c.name }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Billing -->
    <section>
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
          <label for="bill-first-name" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">First Name</label>
          <input type="text" id="bill-first-name" v-model="billing.firstName" class="input" />
        </div>
        <div>
          <label for="bill-last-name" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Last Name</label>
          <input type="text" id="bill-last-name" v-model="billing.lastName" class="input" />
        </div>
        <div class="sm:col-span-2">
          <label for="bill-address" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Address</label>
          <input type="text" id="bill-address" v-model="billing.address" class="input" />
        </div>
        <div class="sm:col-span-2">
          <label for="bill-address2" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Apartment, suite, etc. <span class="text-surface-400">(optional)</span></label>
          <input type="text" id="bill-address2" v-model="billing.address2" class="input" />
        </div>
        <div>
          <label for="bill-city" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">City</label>
          <input type="text" id="bill-city" v-model="billing.city" class="input" />
        </div>
        <div>
          <label for="bill-state" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">State / Province</label>
          <input type="text" id="bill-state" v-model="billing.state" class="input" />
        </div>
        <div>
          <label for="bill-zip" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">ZIP / Postal Code</label>
          <input type="text" id="bill-zip" v-model="billing.zip" class="input" />
        </div>
        <div>
          <label for="bill-country" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Country</label>
          <select id="bill-country" v-model="billing.country" class="input">
            <option v-for="c in countries" :key="c.code" :value="c.code" :selected="c.code === 'US'">{{ c.name }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Payment -->
    <section>
      <h2 class="text-xl font-heading font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
        <span class="w-7 h-7 rounded-full gradient-cta text-white text-sm flex items-center justify-center font-bold">3</span>
        Payment Method
      </h2>
      <div class="rounded-xl border border-surface-200 dark:border-surface-700 p-4 space-y-4">
        <div>
          <label for="card-name" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Name on Card</label>
          <input type="text" id="card-name" v-model="payment.cardName" class="input" placeholder="John Doe" />
        </div>
        <div>
          <label for="card-number" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Card Number</label>
          <input type="text" id="card-number" v-model="payment.cardNumber" class="input" placeholder="1234 5678 9012 3456" maxlength="19" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="card-expiry" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Expiry Date</label>
            <input type="text" id="card-expiry" v-model="payment.expiry" class="input" placeholder="MM / YY" maxlength="7" />
          </div>
          <div>
            <label for="card-cvv" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">CVV</label>
            <input type="text" id="card-cvv" v-model="payment.cvv" class="input" placeholder="123" maxlength="4" />
          </div>
        </div>
        <p class="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          This is a demo. No real payment will be processed.
        </p>
      </div>
    </section>

    <!-- Place Order -->
    <button type="submit" class="btn-primary w-full text-lg py-4">
      Place Order
    </button>
  </form>
</template>

<script setup lang="ts">
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

const billingSame = ref(true);

const shipping = reactive({
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

const billing = reactive({
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

function handleSubmit() {
  alert('This is a demo checkout. In production, connect Stripe or Snipcart for real payment processing.');
}
</script>
